import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import { vueCustomElement, IWebComponentInstance, WebComponentBootstrapper, Localize, Inject } from "@omnia/fx";
import { StyleFlow, VueComponentBase, MediaPickerTransformElement, MediaPickerProviderRegistrations, MediaPickerActionButton, OmniaUxLocalization, LoadingStyle, MediaPickerImageHandler } from '@omnia/fx/ux';
import { IMediaPickerProvider, MediaPickerProviderData, IMediaPickerCustomProviderComponent } from './IMediaPickerProvider';
import { MediaPickerProviderStyles } from './MediaPickerProvider.css';
import { MediaPickerImageProviderResult, ProcessImageOption, Guid, ImageModel } from '@omnia/fx-models';
import { MediaItemSearchResult } from './models/QBankImage';
import { WebImageService } from "@omnia/fx/services";
import { Localization } from '@omnia/tooling-composers';
import { VabImageProviderLocalization } from './loc/localize';

@Component
export default class MediaPickerProvider extends VueComponentBase implements IWebComponentInstance, IMediaPickerCustomProviderComponent {

    @Prop() onClose: () => void;
    @Prop() onSaved: (result: MediaPickerImageProviderResult) => void
    @Prop() transformComponent: MediaPickerTransformElement;
    @Prop() mediaPickerRegistrations?: MediaPickerProviderRegistrations;
    @Inject(WebImageService) private webImageService: WebImageService;
    @Localize("Omnia.Ux") private uxLoc: OmniaUxLocalization;
    @Localize(VabImageProviderLocalization.namespace)  loc: VabImageProviderLocalization.locInterface
    processImageOption: ProcessImageOption = ProcessImageOption.MakeWebSafe;
    imageComponentKey = Guid.newGuid().toString();
    isSearching: boolean = false;
    isTransformingImage: boolean = false;
    maxFileSizeSettings: number = 0;
    currentFileSize: any;
    isSelecting: boolean = false;
    private showResultGrid: boolean = false;
    selectedItem: MediaItemSearchResult;
    selectedImageModel: ImageModel;
    queryText: string = '';
    currentResults: MediaItemSearchResult[] = [];
    allResults: MediaItemSearchResult[] = [];
    private loadImageChunkSize = 20;

    backButton: MediaPickerActionButton =
        {
            text: this.uxLoc.Common.Buttons.Back,
            icon: "arrow_back",
            iconLeft: true,
            leftAligned: true,
            onClick: this.onBackButtonClick,
            show: false
        }
    saveButton: MediaPickerActionButton =
        {
            text: this.uxLoc.Common.Buttons.Ok,
            highLighted: true,
            onClick: this.onSaveButtonClick,
            show: this.isTransformingImage,
        }

    actionButtons: Array<MediaPickerActionButton> =
        [
            this.backButton,
            this.saveButton,
            {
                text: this.uxLoc.Common.Buttons.Close,
                onClick: this.onCloseButtonClick,
                show: true
            }
        ]

    mounted() {
        WebComponentBootstrapper.registerElementInstance(this, this.$el);
        this.maxFileSizeSettings = 2048 * 1024;
        this.mediaPickerRegistrations.registerSearchProviderCallback(this.onSearch);
        this.mediaPickerRegistrations.registerActionButtons(this.actionButtons);
        this.mediaPickerRegistrations.registerInfiniteScrollCallback(this.onSearchMore);
    }

    getImagesChunk(items: Array<MediaItemSearchResult>, startIndex, endIndex) {
        if (items.length < (endIndex - startIndex)) {
            return items;
        }
        if (endIndex > items.length - 1) {
            endIndex = items.length - 1;
        }
        return items.slice(startIndex, endIndex);
    }

    onSearch(searchString: string): Promise<null> {
        return new Promise<null>((resolve, reject) => {
            if (this.isSearching) {
                resolve();
                return;
            }
            if (!searchString) {
                resolve();
                this.showResultGrid = true;
                return;
            }
            if (searchString.trim() === "") {
                resolve();
                this.showResultGrid = true;
                return;
            }
            this.mediaPickerRegistrations.toggleLoadingMessage(true, LoadingStyle.noOverlay);
            this.currentResults = [];
            this.allResults = [];
            this.queryText = searchString;
            this.isSearching = true;

            /* */

            //this.Service.search(this.queryText, 0, 300).then((results) => {
            //    this.allResults = results;
            //    this.currentResults = this.getImagesChunk(results, 0, this.loadImageChunkSize)
            //    this.renderAdditionalFormatting();
            //    this.isSearching = false;
            //    this.mediaPickerRegistrations.toggleLoadingMessage(false);
            //    this.showResultGrid = true;
            //    this.imageComponentKey = Utils.generateGuid();
            //    resolve();
            //}).catch(() => {
            //    this.isSearching = false;
            //    this.mediaPickerRegistrations.toggleLoadingMessage(false);
            //    resolve();
            //})
        });
    }

    onSearchMore(): Promise<null> {
        return new Promise<null>((resolve, reject) => {
            if ((this.currentResults.length) >= this.allResults.length) {
                return;
            }
            this.currentResults = this.getImagesChunk(this.allResults, 0, this.currentResults.length + this.loadImageChunkSize);        
            resolve();
        })
    }
    onSelectImage(item: MediaItemSearchResult) {
        this.mediaPickerRegistrations.toggleLoadingMessage(true, LoadingStyle.overlay);
        this.selectedItem = item;
        this.getImageHandler().then(data => {
            this.selectedImageModel = data;
            if (this.transformComponent) {
                this.isTransformingImage = true;
                this.onToggleTransformButtons(true);
                this.mediaPickerRegistrations.toggleLoadingMessage(false);
            }
            else
                this.onSaveButtonClick();
        });
    }

    onToggleTransformButtons(show: boolean) {
        this.backButton.show = show;
        this.saveButton.show = show;
    }

    getImageHandler() {
        var self = this;
        return new Promise<ImageModel>((resolve, reject) => {
            if (!this.selectedItem) resolve(null);
            else {
                var url = this.selectedItem.contentUrl;
                this.webImageService.download(url).then((base64) => {
                    var dataUrl = 'data:image/' + this.selectedItem.encodingFormat + ';base64,' + base64;
                    var downloadFile = MediaPickerImageHandler.base64toBlob(base64, 'image/' + this.selectedItem.encodingFormat);
                    if (!base64) {
                        this.selectedItem.contentCannotBeReached = true;
                        reject(this.loc.DowloadImageFailed + " " + url);
                    }
                    else if (downloadFile.size > this.maxFileSizeSettings) {
                        this.mediaPickerRegistrations.showMakeImageWebSafeDialog(downloadFile.size).then((result: ProcessImageOption) => {
                            console.log(downloadFile.size);
                            if (result == ProcessImageOption.MakeWebSafe) {
                                let src = URL.createObjectURL(downloadFile);
                                MediaPickerImageHandler.resizeImage(src, downloadFile.size, function (resizeImageData) {
                                    var resizeImage = new Image();
                                    resizeImage.src = resizeImageData;
                                    resizeImage.onload = function () {
                                        MediaPickerImageHandler.resolveImage(resolve, url, resizeImageData, self.selectedItem);
                                    };
                                }, this.maxFileSizeSettings);
                            }
                            else {
                                MediaPickerImageHandler.resolveImage(resolve, url, dataUrl, this.selectedItem);
                            }

                        });
                    }
                    else {
                        MediaPickerImageHandler.resolveImage(resolve, url, dataUrl, this.selectedItem);
                    }
                }).catch(() => {
                    this.selectedItem.contentCannotBeReached = true;
                    reject(this.loc.DowloadImageFailed + ' ' + url);
                });;
            }
        });
    }

    onBackButtonClick() {
        this.selectedImageModel = null;
        this.isTransformingImage = false;
        this.onToggleTransformButtons(false);
    }

    onSaveButtonClick() {
        if (this.onSaved)
            this.onSaved(this.selectedImageModel);
        this.onCloseButtonClick();
    }
    onCloseButtonClick() {
        if (this.onClose)
            this.onClose();
    }
  
    render(h) {
        return (
            <div>
                {
                    this.isTransformingImage ?
                        <div>
                            {this.renderMediaTransformComponent(h)}
                        </div>
                        : null
                }
                {/*To keep state if backbutton is selected*/}
                <div v-show={!this.isTransformingImage && this.showResultGrid}>
                  
                    <omfx-media-imagegrid key={this.imageComponentKey} appendToGrid={true} domProps-images={this.currentResults} domProps-onImageSelected={this.onSelectImage}></omfx-media-imagegrid>                    
                </div>
            </div>
        )
    }
  
    onTransformChange(data) {
        this.selectedImageModel = data;
        this.$forceUpdate();
    }

    renderMediaTransformComponent(h) {
        let tagName = this.transformComponent.elementNameToRender;
        let props = this.transformComponent.elementProps;

        props = props || {};
        props["model"] = this.selectedImageModel;
        props["onModelChange"] = this.onTransformChange;
        return h(tagName, {
            domProps: props
        })
    }

}


WebComponentBootstrapper.registerElement((manifest) => {
    vueCustomElement(manifest.elementName, MediaPickerProvider);
});