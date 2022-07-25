mockplus.showUI(__html__, {
  height: 400
});

// 插件监听 html 中的 message 事件， 满足条件时执行对应的代码
mockplus.ui.onmessage = (msg) => {
  if(msg?.type === 'color') {
    const selectLayers = mockplus.currentPage.selection;
    const resourceId = msg.resourceId;
    const color = mockplus.findResourceById(resourceId);
    const useTo = msg.useTo;
    if(useTo === 'fill') {
      defaultFillItem.color = color;
      selectLayers[0].fills = [defaultFillItem];
    }
    else if(useTo === 'border') {
      defaultBorderItem.color = color;
      selectLayers[0].borders = [defaultBorderItem];
    }
    else if(useTo === 'shadow') {
      defaultShadowItem.color = color;
      selectLayers[0].shadows = [defaultShadowItem];
    }
    else if(useTo === 'background' && selectLayers[0].type === 'artboard') {
      selectLayers[0].background = {
        ...selectLayers[0].background,
        color
      };
    }
    else if(useTo === 'text' && selectLayers[0].type === 'text') {
      selectLayers[0].textColor = color;
    }
  }else {
    const selectLayers = mockplus.currentPage.selection;
    selectLayers[0].sharedStyleId = msg.resourceId;
  }
};

// 监听主程序组件选中状态
mockplus.on('selectionChange', () => {
  const selectLayers = mockplus.currentPage.selection;
  const isSelect = !!selectLayers.length;
  const isText = isSelect && selectLayers[0].type === 'text';
  mockplus.ui.postMessage({ type: 'select', isSelect, isText });
});

(function() {
  init();

  const list = {
    colors: mockplus.root.colors,
    textStyles: mockplus.root.textStyles,
    layerStyles: mockplus.root.layerStyles
  };

  mockplus.ui.postMessage({ type: 'resourceList', list });
})();

function init() {
  const red = mockplus.createColorStyle({ r: 255, g: 0, b: 0, a: 1});
  red.name = 'red color';

  const green = mockplus.createColorStyle({ r: 0, g: 255, b: 0, a: 1});
  green.name = 'green color';

  const blue = mockplus.createColorStyle({ r: 0, g: 0, b: 255, a: 1});
  blue.name = 'blue color';
}

const defaultGradient = {
  gradientType: 1,
  from: { x: 0, y: 0 },
  to: { x: 1, y: 1 },
  aspectRatio: 0.5,
  stops: [{
    position: 0,
    color: { r: 255, g: 0, b: 0, a: 1 },
  }, {
    position: 0.5,
    color: { r: 0, g: 255, b: 0, a: 1 },
  }, {
    position: 1,
    color: { r: 0, g: 0, b: 255, a: 1 },
  }]
};

const defaultContextSettings = {
  opacity: 0.7,
  blendMode: 3,
}

const defaultFillItem = {
  fillType: 0,
  color: {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
  },
  gradient: defaultGradient,
  pattern: {
    patternType: 2,
    tileScale: 1,
    image: '',
  },
  context: defaultContextSettings,
  enabled: true,
}

const defaultBorderItem = {
  fillType: 0,
  color: { r: 0, g: 255, b: 0, a: 1 },
  gradient: defaultGradient,
  thickness: 2,
  position: 1,
  context: defaultContextSettings,
  enabled: true,
}

const defaultShadowItem = {
  color: { r: 0, g: 0, b: 255, a: 1 },
  blur: 3,
  x: 4,
  y: 4,
  spread: 5,
  context: defaultContextSettings,
  enabled: true,
}