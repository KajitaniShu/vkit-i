//********************************************************//
// textTexture()関数                                      //
// → 渡されたテキストをテクスチャにする                  //
//********************************************************//
function createTextbox(icon, text){
    // テクスチャ用canvasを作成
    const texCanvas = document.createElement('canvas');
    const context   = texCanvas.getContext('2d');
    
    const text_length = context.measureText(text).width;
    const x = 120;  //左上の頂点x座標
    const y = 120;  //左上の頂点y座標
    const w = text_length*9.8+250;  //横の長さ
    const h = 0;  //縦の長さ

    texCanvas.width = text_length*9.8+570;
    texCanvas.height = text_length*9.8+570;

    const line_color = "white";
    const fill_color = "#4285F4";  //塗りつぶし色

    context.lineWidth = 20;
    context.strokeStyle = line_color;
    context.fillStyle = fill_color;
    

    context.arc(x, y+h, 100, Math.PI*1/2,Math.PI*2/2);
    context.arc(x, y, 100, Math.PI*2/2,Math.PI*3/2);
    context.arc(x+w, y, 100, Math.PI*3/2,Math.PI*4/2);
    context.arc(x+w, y+h, 100, Math.PI*4/2,Math.PI*5/2);
    context.closePath();
    context.stroke();
    context.fill();
    context.textBaseline = 'hanging';
    context.fillStyle = "white"; 
    context.font='140px Material Icons';
    context.fillText(icon, 100, 78);
    context.font='500 100px Noto Sans JP, serif';
    context.fillText(text, 290, 62);

    const texture = new THREE.CanvasTexture(texCanvas);

    const material = new THREE.MeshPhongMaterial({
        map:texture,
        transparent: true
    });
    const geometry  =  new THREE.PlaneGeometry(50, 50, 1);
    const textBox = new THREE.Mesh(geometry, material);
    return textBox;
}
