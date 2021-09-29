//********************************************************//
// debug()関数                                            //
// → 画面にdebug情報を表示する                           //
//********************************************************//
function debug(context, text){
    context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    context.fillStyle = "rgba(0, 0, 0, 0.8)";
    context.fillRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    context.font     = `10px 'monospace'`;
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    // 改行文字で分割して配列に格納する
    var arr = text.split(/\r\n|\n/);
    var max_length = 0;                 // canvasのサイズを決めるために最大文字数を調べる
    for(var i = 0; i < arr.length; i++){
        context.fillText(arr[i], 50, i*15);
        Math.max(arr[i].length, max_length);
    }
}

function clear_debug(context){
    context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
}
