import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import { vueCustomElement, IWebComponentInstance, WebComponentBootstrapper, Localize, Inject } from "@omnia/fx";
import { StyleFlow } from '@omnia/fx/ux';
import { IFooterComponent, FooterComponentData } from './IFooterComponent';
import { FooterComponentStyles } from './FooterComponent.css';
import { FooterService, MediaService } from '../../core';

@Component
export default class FooterComponent extends Vue implements IWebComponentInstance, IFooterComponent {

    @Prop({ default: false }) required: boolean;
    @Prop({ default: { title: 'Hello from FooterComponent!' } }) data?: FooterComponentData

    @Inject(FooterService) footerService: FooterService
    @Inject(MediaService) mediaService: MediaService
   
    created() {
       
    }

    mounted() {
        WebComponentBootstrapper
            .registerElementInstance(this, this.$el);
    }

    async onYoutubeButtonClick() {
        let res = await this.mediaService.search("fa");
        console.dir(res[0])
    }

    render(h) {
        return (
            <v-row no-gutter class="ma-0">
                <v-col cols="12" class={FooterComponentStyles.theLine}>
                    
                </v-col>
                <v-col cols="12">
                    <v-row class={FooterComponentStyles.buttonContainer}>
                        <v-col cols="6">
                            <v-btn class="mx-2"
                                fab
                                onClick={this.onYoutubeButtonClick}
                                dark
                                small
                                elevation="0"
                                color="grey">
                                <v-icon dark small>fab fa-youtube</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="6">

                        </v-col>
                    </v-row>
                </v-col>              
            </v-row>
        )
    }
}

WebComponentBootstrapper.registerElement((manifest) => {
    vueCustomElement(manifest.elementName, FooterComponent);
});