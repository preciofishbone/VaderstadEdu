import { Composer } from '@omnia/tooling/composers';
import { Guid } from '@omnia/fx/models';

Composer
    .registerManifest(new Guid("06d80abf-c459-42c0-beb8-7a80a6efdabe"), "MediaPickerProvider")
    .registerWebComponent({
        elementName: "vab-media-picker-extension",
        entryPoint: "./MediaPickerProvider.jsx",
        typings: ["./IMediaPickerProvider.ts"]
    });