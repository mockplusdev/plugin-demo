// 配置窗口UI 及 大小
mockplus.showUI(__html__, {
  width: 300,
  height: 500
});

// 插件监听 html 中的 message 事件， 满足条件时执行对应的代码
mockplus.ui.onmessage = (msg) => {
  if (msg?.type === "rename") {
    const selectedLayers = mockplus.currentPage.selection;
    for (let i = 0; i < selectedLayers.length; i++) {
      selectedLayers[i].name = `${msg.newName}${i + 1}`
    }
  }
  else if(msg?.type === 'move') {
    const selectedLayers = mockplus.currentPage.selection;
    const newX = msg.newPosition.x ? parseInt(msg.newPosition.x) : undefined;
    const newY = msg.newPosition.y ? parseInt(msg.newPosition.y) : undefined;
    for (let i = 0; i < selectedLayers.length; i++) {
      newX && (selectedLayers[i].x = newX);
      newY && (selectedLayers[i].y = newY);
    }
  }
  else if(msg?.type === 'resize') {
    const selectedLayers = mockplus.currentPage.selection;
    const newW = msg?.newSize.width ? parseInt(msg.newSize.width) : undefined;
    const newH = msg?.newSize.height ? parseInt(msg.newSize.height) : undefined;
    for (let i = 0; i < selectedLayers.length; i++) {
      const layer = selectedLayers[i];
      layer.resize(newW ?? layer.width, newH ?? layer.height);
    }
  }
  else if(msg?.type === 'scaleNum') {
    const selectedLayers = mockplus.currentPage.selection;
    const scale = msg?.newScale ? parseInt(msg.newScale) : undefined;
    if(!scale) {
      return;
    }

    for (let i = 0; i < selectedLayers.length; i++) {
      const layer = selectedLayers[i];
      layer.scale(scale);
    }
  }
};

// 监听主程序组件选中状态
mockplus.on('selectionChange', () => {
  mockplus.ui.postMessage({ type: 'select', num: mockplus.currentPage.selection.length });
});