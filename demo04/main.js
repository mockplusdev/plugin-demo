mockplus.showUI(__html__);

// 插件监听 html 中的 message 事件， 满足条件时执行对应的代码
mockplus.ui.onmessage = (msg) => {
  if (msg.type === "addPage") {
    mockplus.createPage();
  }
  else if (msg.type === "delPage") {
    const currentPage = mockplus.currentPage;
    currentPage.remove();
  }
  else if (msg.type === "renamePage") {
    const currentPage = mockplus.currentPage;
    currentPage.name = 'new Page Name';
  }
  else if (msg.type === "sortUpPage") {
    const currentPage = mockplus.currentPage;
    currentPage.frontForward();
  }
  else if (msg.type === "sortDownPage") {
    const currentPage = mockplus.currentPage;
    currentPage.backForward();
  }
  else {
    mockplus.notify("not support operation", { timeout: 500, error: false });
  }
};
