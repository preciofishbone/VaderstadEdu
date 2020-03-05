import { VabImageProviderLocalization } from "./localize";
import { Composer } from '@omnia/tooling-composers';
import { LocaleNames } from '@omnia/fx-models';

Composer.registerManifest("bd80005a-2dc3-4dfd-8d70-d14fd5151bed")
    .registerLocalization({localeName:LocaleNames.SvSe})
    .namespace(VabImageProviderLocalization.namespace)
    .add<VabImageProviderLocalization.locInterface>({  
        DowloadImageFailed: "Download image failed",
        labels: {
            title : "Sample Component"
        }
        
    });