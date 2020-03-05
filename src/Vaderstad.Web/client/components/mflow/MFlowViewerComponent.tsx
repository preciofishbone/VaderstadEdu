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
    private items = 45;
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
        this.publishNotificationCount();
        setTimeout(() => {
            this.isLoading = false;
        }, 3000);
    }

    private onPageEditModeChange(message: PageEditModeMessage) {
        if (!message) {
            return;
        }
        this.isPageEditMode = message.editMode;
    }

    handleControlVisibleInNotificationPanel(msg: ControlStatusInNotificationMsg) {
        //this.isVisibleInNotificationPanel = msg.active;
        //if (this.isVisibleInNotificationPanel) {
        //    this.markAsViewed();
        //}
    }

    publishNotificationCount() {
        this.notificationPanelStore.actions.getHistory.dispatch([this.uniqueIdHistoryId]).then(entries => {
            WorkplaceTopics.NotificationPanel.newDataNotification.publish({
                id: this.settingsKey,
                notificationCount: this.items
            });
        })
    }

    markAsViewed() {
        this.notificationPanelStore.actions.setHistory.dispatch([this.uniqueIdHistoryId]).then(() => {
            WorkplaceTopics.NotificationPanel.newDataNotification.publish({
                id: this.settingsKey,
                notificationCount: 0
            });
        });
    }

    onItemClick(sampleItem: MFlowItem) {
        --this.items;
        this.currentMFlowStore.mutations.removeItem.commit(sampleItem);
        this.publishNotificationCount()
    }

    renderItem(h, sampleItem: MFlowItem) {
        return (
            <v-list-item onClick={() => this.onItemClick(sampleItem)}>
                <v-list-item-icon>
                    <v-icon color="grey">{sampleItem.icon}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{sampleItem.title}</v-list-item-title>
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