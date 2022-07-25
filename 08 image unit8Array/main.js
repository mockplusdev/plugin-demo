mockplus.showUI(__html__);

// 插件监听 html 中的 message 事件， 满足条件时执行对应的代码
mockplus.ui.onmessage = (msg) => {
  if (msg.type === "info") {
    const layer = mockplus.createRectangle();
    layer.exportSourceAsync({
      fileFormat: 'png',
      size: '1x',
    }).then(data => {
      mockplus.createImageData(data, 'png').then((imageData) => {
        const imageLayer = mockplus.createImage();
        imageLayer.image = imageData.hash;
      });
    });
  }
};