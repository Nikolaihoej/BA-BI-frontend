<template>
    <div class="grid-stack" ref="gridstack">
      <div v-for="(item, index) in gridItems" :key="index" class="grid-stack-item" :gs-x="item.x" :gs-y="item.y" :gs-w="item.width" :gs-h="item.height">
        <div class="grid-stack-item-content">
          <div class="remove-widget-btn" @click="removeWidget(item.id)">X</div>
          <component v-if="item.component" :is="item.component" v-bind="item.props" />
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { ref, onMounted, nextTick, defineExpose } from "vue";
  import { GridStack } from "gridstack";
  import "gridstack/dist/gridstack.css";
  import barChartComponent from "./chartContainer/barChartComponent.vue";
  import lineChartComponent from "./chartContainer/lineChartComponent.vue";
  import pieChartComponent from "./chartContainer/pieChartComponent.vue";

  const componentMap = {
    barChartComponent: { component: barChartComponent, width: 4, height: 2 },
    lineChartComponent: { component: lineChartComponent, width: 4, height: 2 },
    pieChartComponent: { component: pieChartComponent, width: 2, height: 2 },
  };

  const gridItems = ref([]);
  let grid = null;
  let widgetCounter = 1;

  onMounted(() => {
    grid = GridStack.init({});
  });
  

  const addComponent = (componentName, props) => {
  const componentData = componentMap[componentName];
  if (!componentData) {
    return;
  }

  const newGridItem = {
    id: widgetCounter.toString(),
    x: 0,
    y: 0,
    width: componentData.width,
    height: componentData.height,
    component: componentData.component,
    props: {
      ...props,
    }
  };
  

  widgetCounter++;

  // Add the new item to gridItems
  gridItems.value.push(newGridItem);

  // update the layout
  nextTick(() => {
    const gridItemElements = document.querySelectorAll('.grid-stack-item');
    const newItemElement = gridItemElements[gridItemElements.length - 1];
    if (newItemElement) {
      newItemElement.setAttribute('gs-id', newGridItem.id);
      grid?.makeWidget(newItemElement);
    }
  });
};

// remove a widget
const removeWidget = (id) => {
  const widget = document.querySelector(`[gs-id="${id}"]`);
  if (widget) {
    grid?.removeWidget(widget);
  }
};
  
// Expose the addComponent method
defineExpose({ addComponent, removeWidget });
</script>

<style>
.remove-widget-btn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    top: 5px;
    right: 5px;
    background-color: red;
    color: white;
    border: none;
    opacity: 25%;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    z-index: 2;
}

.remove-widget-btn:hover {
    opacity: 100%;
    transition: ease-in 0.2s;
}
</style>