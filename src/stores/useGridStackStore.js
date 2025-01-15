//Gridstack store
import { defineStore } from "pinia";

export const useGridStackStore = defineStore("gridStack", {
	state: () => ({
		gridStackItemsComponent: null,
		serializedGridItems: [],
	}),
	actions: {
		setGridStackItemsComponent(component) {
			this.gridStackItemsComponent = component;
		},
		addComponent(componentName, props) {
			if (this.gridStackItemsComponent) {
				this.gridStackItemsComponent.addComponent(componentName, props);
			}
		},
	},
});
