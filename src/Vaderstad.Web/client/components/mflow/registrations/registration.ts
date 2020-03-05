import { Topics as WorkplaceTopics } from "@omnia/workplace";

WorkplaceTopics.NotificationPanel.registerNotificationPanelControl.publish({
    title: "MFlow Component",
    elementToRender: "vab-mflow-viewer",
    //settingsElementToRender: "sample-block-view-settings"
});
