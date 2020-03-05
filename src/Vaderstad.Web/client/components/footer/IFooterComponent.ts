import { TsxAllowUnknowProperties } from '@omnia/fx/ux';
import { FooterComponentStyles } from './FooterComponent.css';

export interface FooterComponentData {
    title: string;
}

/*@WebComponentInterface("vab-footer")*/
export interface IFooterComponent {

    required: boolean;

    /*@DomProperty*/
    data?: FooterComponentData;

    /*@DomProperty*/
    styles?: typeof FooterComponentStyles;
}

declare global {
    namespace JSX {
        interface Element { }
        interface ElementClass { }
        interface ElementAttributesProperty { }
        interface IntrinsicElements {
            /*@WebComponent*/
            "vab-footer": TsxAllowUnknowProperties<IFooterComponent>
        }
    }
}