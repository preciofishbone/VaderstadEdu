import { VabImageProviderLocalization } from "./localize";
import { Composer } from '@omnia/tooling-composers';

Composer.registerManifest("cf7b3360-79c6-42de-a7d4-6c0fd6a1c777")
    .registerLocalization()
    .namespace(VabImageProviderLocalization.namespace)
    .add<VabImageProviderLocalization.locInterface>({  
        DowloadImageFailed: "Download image failed",
        labels: {
            title : "Sample Component"
        }
        
    });