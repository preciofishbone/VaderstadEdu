import { Composer } from '@omnia/tooling/composers';
import { Guid } from '@omnia/fx/models';

Composer
    .registerManifest("5933aeaf-500c-453c-91e7-434e067de5c9", "vab.core")
    .registerResources({
        resourcePaths: [
            "./index.js",
            "./services/**/*.js",
            "./models/**/*.js",

        ]
    })