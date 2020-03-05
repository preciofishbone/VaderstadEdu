import { Composer } from "@omnia/tooling-composers";
import { WcmResourceManifests } from '@omnia/wcm/models';
import { WebComponentManifests as WorkplaceWebComponentManifests, ServiceDefinition as WorkplaceServiceDefinition } from "@omnia/workplace/models";

Composer
    .registerManifest("0d6f7923-f8f7-4b6a-9850-1123725ee384", "vab.notificationpanel.registration")
    .registerResources({
        resourcePaths: ['./registration.js']
    })
    .withLoadRules().loadIfManifestLoaded({
        omniaServiceId: WorkplaceServiceDefinition.Id.toString(),
        resourceId: WorkplaceWebComponentManifests.NotificationPanelSettings.toString()
    })