mockplus.showUI(__html__);

// 插件监听 html 中的 message 事件， 满足条件时执行对应的代码
mockplus.ui.onmessage = (msg) => {
  if (msg.type === "info") {
    mockplus.notify("sand box get message success", { timeout: 3000, error: false });
  }
};
