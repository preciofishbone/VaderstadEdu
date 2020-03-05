import { Composer, DevelopmentEnvironment } from "@omnia/tooling/composers";
import { Guid } from '@omnia/fx/models';

Composer
    .registerManifest(new Guid("68b27de3-9026-4dea-9708-fbd642642b63"), "Vaderstad.Web")
    .registerService({ description: "Description of Vaderstad.Web" })
    .AsWebApp()
    .withBuildOptions({
        include: ["client"],
        moduleOptions: {
            enableTransformResourcePath: true
        },
        bundleOptions: {
            commonsChunk: {
                name: new Guid("9fb6e804-4735-4309-9706-9f58b56461f7"),
                minChunks: 2
            }
        }
    });
    
   