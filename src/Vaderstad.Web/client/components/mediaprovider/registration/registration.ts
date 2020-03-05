import { Topics } from "@omnia/fx";
import { MediaPickerProviderMediaTypes } from '@omnia/fx/ux';


Topics.registerMediaPickerProvider.publish(
    {
        category: "image",
        name: "VAB Images",
        iconClass: "",     
        elementNameToRender: "vab-media-picker-extension",
        mediaType: MediaPickerProviderMediaTypes.image,
        hasTextSearchSupport: true,
        sortOrder: 50
    }
)