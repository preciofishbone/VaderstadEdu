import { TsxAllowUnknowProperties } from '@omnia/fx/ux';
import { MFlowViewerComponentStyles } from './MFlowViewerComponent.css';

export interface MFlowViewerComponentData {
    title: string;
}

/*@WebComponentInterface("vab-mflow-viewer")*/
export interface IMFlowViewerComponent {

    required: boolean;

    /*@DomProperty*/
    data?: MFlowViewerComponentData;

    /*@DomProperty*/
    styles?: typeof MFlowViewerComponentStyles;
}

declare global {
    namespace JSX {
        interface Element { }
        interface ElementClass { }
        interface ElementAttributesProperty { }
        interface IntrinsicElements {
            /*@WebComponent*/
            "vab-mflow-viewer": TsxAllowUnknowProperties<IMFlowViewerComponent>
        }
    }
}