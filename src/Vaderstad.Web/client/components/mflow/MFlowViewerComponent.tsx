import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import { vueCustomElement, IWebComponentInstance, WebComponentBootstrapper, Localize, Inject } from "@omnia/fx";
import { StyleFlow } from '@omnia/fx/ux';
import { IMFlowViewerComponent, MFlowViewerComponentData } from './IMFlowViewerComponent';
import { MFlowViewerComponentStyles } from './MFlowViewerComponent.css';

@Component
export default class MFlowViewerComponent extends Vue implements IWebComponentInstance, IMFlowViewerComponent {

    @Prop({ default: false }) required: boolean;
    @Prop({ default: { title: 'Hello from MFlowViewerComponent!' } }) data?: MFlowViewerComponentData
    @Prop() styles?: typeof MFlowViewerComponentStyles;

    private MFlowViewerComponentClasses = StyleFlow.use(MFlowViewerComponentStyles);

    created() {
        if (this.styles) {
            this.MFlowViewerComponentClasses = StyleFlow.use(MFlowViewerComponentStyles, this.styles);
        }
    }

    mounted() {
        WebComponentBootstrapper
            .registerElementInstance(this, this.$el);
    }

    render(h) {
        return (
            <div class={this.MFlowViewerComponentClasses.container}>
                <div>{this.data.title}</div>
                {this.required ? <div>Im required</div> : null}
            </div>
        )
    }
}

WebComponentBootstrapper.registerElement((manifest) => {
    vueCustomElement(manifest.elementName, MFlowViewerComponent);
});