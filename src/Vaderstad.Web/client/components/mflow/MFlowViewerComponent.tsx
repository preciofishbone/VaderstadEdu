import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import { vueCustomElement, IWebComponentInstance, WebComponentBootstrapper, Localize, Inject, SubscriptionHandler, Topics } from "@omnia/fx";
import { StyleFlow } from '@omnia/fx/ux';
import { IMFlowViewerComponent, MFlowViewerComponentData } from './IMFlowViewerComponent';
import { MFlowViewerComponentStyles } from './MFlowViewerComponent.css';
import { IMessageBusSubscriptionHandler, Guid, PageEditModeMessage } from '@omnia/fx-models';
import { MFlowStore, MFlowItem } from '../../core';
import { Topics as WorkplaceTopics, NotificationPanelStore } from '@omnia/workplace';
import { ControlStatusInNotificationMsg } from '@omnia/workplace/models';

@Component
export default class MFlowViewerComponent extends Vue implements IWebComponentInstance, IMFlowViewerComponent {
    @Prop() settingsKey: string;
    @Prop() public title: string;
    @Inject(SubscriptionHandler) subscriptionHandler: IMessageBusSubscriptionHandler;
    @Inject(NotificationPanelStore) notificationPanelStore: NotificationPanelStore;
    @Inject(MFlowStore) currentMFlowStore: MFlowStore;

    private isPageEditMode = false;
    private isLoading = true;    
    isVisibleInNotificationPanel: boolean;
    private uniqueIdHistoryId = Guid.newGuid().toString();

    public created() {
        this.subscriptionHandler.add(WorkplaceTopics.NotificationPanel
            .controlStatusInNotificationPanel(this.settingsKey)
            .subscribe(this.handleControlVisibleInNotificationPanel));
    }

    public mounted() {
        WebComponentBootstrapper.registerElementInstance(this, this.$el);
        this.subscriptionHandler.add(Topics.onPageEditModeChanged.subscribe(this.onPageEditModeChange));  
        setTimeout(() => {
            this.currentMFlowStore.actions.loadItems.dispatch().then(() => {
                this.isLoading = false;
                this.publishNotificationCount();
                this.notificationPanelStore.actions.removeHistory.dispatch(this.getObjectIds());
            })
        }, 2000);
    }

    private onPageEditModeChange(message: PageEditModeMessage) {
        if (!message) {
            return;
        }
        this.isPageEditMode = message.editMode;
    }

    handleControlVisibleInNotificationPanel(msg: ControlStatusInNotificationMsg) {
        this.isVisibleInNotificationPanel = msg.active;
        if (this.isVisibleInNotificationPanel) {
            //this.markAsViewed();
        }
    }

    public getObjectIds() {
        let result: string[] = [];
        this.currentMFlowStore.getters.getAllItems().forEach((item) => {
            result.push(item.id.toString());
        });
        return result;
    }

    publishNotificationCount() {
        this.notificationPanelStore.actions.removeHistory
        this.notificationPanelStore.actions.getHistory.dispatch(this.getObjectIds()).then(entries => {            
            WorkplaceTopics.NotificationPanel.newDataNotification.publish({
                id: this.settingsKey,
                notificationCount: this.currentMFlowStore.getters.getAllItems().length,                
            });           
        })
    }

    markAsViewed(item: MFlowItem) {
        this.notificationPanelStore.actions.setHistory.dispatch([item.id.toString()]).then(() => {
            WorkplaceTopics.NotificationPanel.newDataNotification.publish({
                id: this.settingsKey,
                notificationCount: this.currentMFlowStore.getters.getAllItems().length
            });
        });
    }

    onItemClick(item: MFlowItem) {     
        this.currentMFlowStore.mutations.removeItem.commit(item);
        this.publishNotificationCount();
        this.markAsViewed(item);
    }

    renderItem(h, item: MFlowItem) {
        return (
            <v-list-item onClick={() => this.onItemClick(item)}>
                <v-list-item-icon>
                    <v-icon color="grey">{item.icon}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{item.title}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        )
    }

    renderItems(h) {
        return (
            <v-card
                class="mx-auto"
                max-width="300"
                tile>
                <v-list>
                    <v-subheader>Items</v-subheader>
                    <v-list-item-group color="primary">
                        {
                            this.currentMFlowStore.getters.getAllItems().map((item) => {
                                return this.renderItem(h, item);
                            })
                        }
                    </v-list-item-group>
                </v-list>
            </v-card>
        )
    }

    public render(h) {
        return (
            <v-skeleton-loader
                loading={this.isLoading}
                height="100%"
                type="list-item-avatar,list-item-avatar,list-item-avatar"
            >
                <div>
                    {this.renderItems(h)}
                </div>
            </v-skeleton-loader>
        );
    }

}

WebComponentBootstrapper.registerElement((manifest) => {
    vueCustomElement(manifest.elementName, MFlowViewerComponent);
});