mockplus.showUI(__html__);

setTimeout(() => {
  mockplus.ui.postMessage({ type: 'info', message: 'hello, ui html'})
}, 3000);
