mockplus.showUI(__html__);

mockplus.ui.onmessage = (msg) => {
  if(msg.type === 'rect') {
    mockplus.createRectangle();
  }
  else if(msg.type === 'triangle') {
    mockplus.createTriangle();
  }
  else if(msg.type === 'ellipse') {
    mockplus.createEllipse();
  }
  else if(msg.type === 'polygon') {
    mockplus.createPolygon();
  }
  else if(msg.type === 'star') {
    mockplus.createStar();
  }
  else if(msg.type === 'line') {
    mockplus.createLine();
  }
  else if(msg.type === 'text') {
    mockplus.createText();
  }
  else if(msg.type === 'slice') {
    mockplus.createSlice();
  }
  else if(msg.type === 'hotspot') {
    mockplus.createHotspot();
  }
  else if(msg.type === 'image') {
    mockplus.createArtboard();
  }
  else if(msg.type === 'artboard') {
    mockplus.createImage();
  }

  mockplus.notify("create success", { timeout: 500, error: false });
}
