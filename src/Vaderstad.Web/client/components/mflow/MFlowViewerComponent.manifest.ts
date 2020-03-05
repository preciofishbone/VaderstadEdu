import { Composer } from '@omnia/tooling/composers';
import { Guid } from '@omnia/fx/models';

Composer
    .registerManifest(new Guid("821752dd-d445-4802-a6ed-cdb4e50b5d96"), "MFlowViewerComponent")
    .registerWebComponent({
        elementName: "vab-mflow-viewer",
        entryPoint: "./MFlowViewerComponent.jsx",
        typings: ["./IMFlowViewerComponent.ts"]
    });