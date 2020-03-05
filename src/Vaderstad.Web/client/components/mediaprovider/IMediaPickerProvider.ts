import { TsxAllowUnknowProperties, MediaPickerProvider, MediaPickerProviderComponent, MediaPickerTransformElement } from '@omnia/fx/ux';
import { MediaPickerProviderStyles } from './MediaPickerProvider.css';
import { MediaPickerImageProviderResult, PredefinedSearch } from '@omnia/fx-models';

export interface MediaPickerProviderData extends MediaPickerProvider {
    title: string;
}


export interface IMediaPickerCustomProviderComponent extends MediaPickerProviderComponent<MediaPickerImageProviderResult> {
    /*@DomProperty*/
    transformComponent?: MediaPickerTransformElement;

    /*@DomProperty*/
    onSaved?: (data: MediaPickerImageProviderResult) => void;

    /*@DomProperty*/
    predefinedSearchs?: Array<PredefinedSearch>;
}


/*@WebComponentInterface("vab-media-picker-extension")*/
export interface IMediaPickerProvider {

    required: boolean;

    /*@DomProperty*/
    data?: MediaPickerProviderData;

    /*@DomProperty*/
    styles?: typeof MediaPickerProviderStyles;
}

declare global {
    namespace JSX {
        interface Element { }
        interface ElementClass { }
        interface ElementAttributesProperty { }
        interface IntrinsicElements {
            /*@WebComponent*/
            "vab-media-picker-extension": TsxAllowUnknowProperties<IMediaPickerCustomProviderComponent>
        }
    }
}