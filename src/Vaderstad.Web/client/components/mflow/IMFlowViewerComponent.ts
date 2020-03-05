import { TsxAllowUnknowProperties } from '@omnia/fx/ux';
import { MFlowViewerComponentStyles } from './MFlowViewerComponent.css';

export interface MFlowViewerComponentData {
   
}

/*@WebComponentInterface("vab-mflow-viewer")*/
export interface IMFlowViewerComponent {


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