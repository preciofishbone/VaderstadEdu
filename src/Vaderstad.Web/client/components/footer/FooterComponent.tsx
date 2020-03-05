import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import { vueCustomElement, IWebComponentInstance, WebComponentBootstrapper, Localize, Inject } from "@omnia/fx";
import { StyleFlow } from '@omnia/fx/ux';
import { IFooterComponent, FooterComponentData } from './IFooterComponent';
import { FooterComponentStyles } from './FooterComponent.css';

@Component
export default class FooterComponent extends Vue implements IWebComponentInstance, IFooterComponent {

    @Prop({ default: false }) required: boolean;
    @Prop({ default: { title: 'Hello from FooterComponent!' } }) data?: FooterComponentData
    @Prop() styles?: typeof FooterComponentStyles;

    private FooterComponentClasses = StyleFlow.use(FooterComponentStyles);

    created() {
        if (this.styles) {
            this.FooterComponentClasses = StyleFlow.use(FooterComponentStyles, this.styles);
        }
    }

    mounted() {
        WebComponentBootstrapper
            .registerElementInstance(this, this.$el);
    }

    render(h) {
        return (
            <div class={this.FooterComponentClasses.container}>
                <div>{this.data.title}</div>
                {this.required ? <div>Im required</div> : null}
            </div>
        )
    }
}

WebComponentBootstrapper.registerElement((manifest) => {
    vueCustomElement(manifest.elementName, FooterComponent);
});