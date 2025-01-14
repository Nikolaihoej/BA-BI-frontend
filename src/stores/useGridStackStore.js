//Gridstack store 
import { defineStore } from 'pinia';

export const useGridStackStore = defineStore('gridStack', {
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
    serializeGridItems() {
      if (this.gridStackItemsComponent) {
        const serializedItems = this.gridStackItemsComponent.serializeGridItems();
        this.serializedGridItems = serializedItems;
        console.log('Serialized Grid Items:', serializedItems);
      }
    }
  },
});