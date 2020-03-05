import { Composer } from "@omnia/tooling-composers";
import { OmniaService, OmniaWebComponentManifests } from '@omnia/fx-models';

Composer.registerManifest("aa5dea70-4521-43d0-ae08-ce15e13e262e", "vab.mediapicker")
    .registerResources({
        resourcePaths: ["./registration.js"]
    })
    .withLoadRules()
    .loadIfManifestLoaded({
        omniaServiceId: OmniaService.Id.toString(),
        resourceId: OmniaWebComponentManifests.FxUxMediapicker.toString()
    })