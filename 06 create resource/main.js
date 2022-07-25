mockplus.showUI(__html__, {
  width: 300,
  height: 500
});

// 插件监听 html 中的 message 事件， 满足条件时执行对应的代码
mockplus.ui.onmessage = (msg) => {
  if (msg.type === "addColor") {
    mockplus.createColorStyle({ r: 255, g: 0, b: 0, a: 1});
  }
  else if(msg.type === 'addTextStyle') {
    mockplus.createTextStyle(mockplus.createText());
  }
  else if(msg.type === 'addLayerStyle') {
    mockplus.createLayerStyle(mockplus.createRectangle());
  }
  else if(msg.type === 'addSymbolMaster') {
    mockplus.createSymbolMaster([
      mockplus.createRectangle(),
      mockplus.createText(),
    ]);
  }
};
