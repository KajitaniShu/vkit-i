
//********************************************************//
// createRenderer()関数                                   //
// → rendererを作成する                                  //
//********************************************************//
function createRenderer(canvas){
    const renderer = new THREE.WebGLRenderer({ canvas:canvas, antialias: true, alpha: true  });
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    return renderer;
}