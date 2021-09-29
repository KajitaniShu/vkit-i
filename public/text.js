//********************************************************//
// textTexture()関数                                      //
// → 渡されたテキストをテクスチャにする                  //
//********************************************************//
function createTexbox(text){
    // テクスチャ用canvasを作成
    const texCanvas = document.createElement('canvas');
    const context   = texCanvas.getContext('2d');
    texCanvas.width = text.length * 120+200;
    texCanvas.height = 300;
    // canvasの大きさを設定
    context.font     = `bold 120px 'monospace'`;

    // 中央にテキストを描画
    context.textAlign    = 'left';
    context.textBaseline = 'hanging';
    context.lineWidth = 20;
    context.lineCap = "square"; 
    context.fillStyle = "rgba(150, 150, 150, 1.0)";
    context.fillRect(0, 0, texCanvas.width, texCanvas.height);
    context.fillStyle = "rgba(0, 0, 0, 1.0)";
    context.fillRect(20, 20, texCanvas.width-40, texCanvas.height-40);
    context.fillStyle = "rgba(150, 150, 150, 1.0)";
    context.fillText(text, 100, 95);
    const texture = new THREE.CanvasTexture(texCanvas);
    texture.minFilter = THREE.LinearFilter;
    texture.maxFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;


    // テクスチャを作成
    const textBox     = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(texCanvas.width*0.025, texCanvas.height*0.025, 1),
        new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            color:"white"
    }));
    return textBox;
}
