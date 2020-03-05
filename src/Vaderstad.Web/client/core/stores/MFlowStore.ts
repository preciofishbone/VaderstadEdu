import { Store } from '@omnia/fx/store';
import { Injectable, Inject } from '@omnia/fx';
import { InstanceLifetimes, Guid } from '@omnia/fx-models';
import { MFlowItem } from '../models';

@Injectable({
    onStartup: (storeType) => { Store.register(storeType, InstanceLifetimes.Scoped) }
})
export class MFlowStore extends Store
{
    /**
    * State
    */
    private items = this.state<Array<MFlowItem>>([]);  
    private loadedItems = false;

    constructor() {
        super({ id: "f557ed82-0a18-45e2-8b8d-2686e3b0d4ac" });
    }

    onActivated() {
    }

    onDisposing() {

    }

    /** Implementation of Getters */
    getters = {
        getAllItems: () => {
            return this.items.state;
        }
    };

    /** Implementation of Mutations */
    public mutations = {
        removeItem: this.mutation((item: MFlowItem) => {
            let index = this.items.state.findIndex((stateItem) => stateItem.id === item.id);
            this.items.state.splice(index, 1);
        })
    }

    //    /** Implementation of Actions */
    actions = {
        loadItems: this.action(() => {
            return new Promise((resolve, reject) => {
                if (!this.loadedItems) {
                    this.loadedItems = true;
                    this.createSampleItems();
                }
                resolve();
            })
        }),
    }

    createSampleItems() {
        this.items.mutate((items) => {
            items.state.push({
                id: Guid.newGuid(),
                icon: "mdi-clock",
                title: "Item 1"
            });
            items.state.push({
                id: Guid.newGuid(),
                icon: "mdi-account",
                title: "Item 2"
            });
            items.state.push({
                id: Guid.newGuid(),
                icon: "mdi-flag",
                title: "Item 3"
            });
        })
    }

}

