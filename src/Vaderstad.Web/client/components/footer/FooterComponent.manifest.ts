import { Composer } from '@omnia/tooling/composers';
import { Guid } from '@omnia/fx/models';

Composer
    .registerManifest(new Guid("60f15a27-c506-4bb1-ac85-20492cb0c8d0"), "FooterComponent")
    .registerWebComponent({
        elementName: "vab-footer",
        entryPoint: "./FooterComponent.jsx",
        typings: ["./IFooterComponent.ts"]
    });