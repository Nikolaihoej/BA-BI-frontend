// stores/useGridStackStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGridStackStore = defineStore('gridStack', () => {
  const gridStackItemsComponent = ref(null);

  const setGridStackItemsComponent = (component) => {
    gridStackItemsComponent.value = component;
  };

  const addComponent = (componentName, props) => {
    if (gridStackItemsComponent.value) {
      gridStackItemsComponent.value.addComponent(componentName, props);
    }
  };

  return {
    gridStackItemsComponent,
    setGridStackItemsComponent,
    addComponent,
  };
});