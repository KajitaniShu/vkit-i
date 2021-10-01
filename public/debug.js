//********************************************************//
// debug()関数                                            //
// → 画面にdebug情報を表示する                           //
//********************************************************//


//********************************************************//
// InputManagerクラス                                     //
// →PCからのキー操作やスマホ・タブレットからの操作を     //
//   管理する                                             //
//********************************************************//
class DebugManager{
    constructor(canvas, context){
        this.canvas  = canvas;
        this.context = context;
        this.width   = 400;
        this.height  = screen.height;
    }

    // 渡されたデバッグ情報を表示する
    draw(text){
        // 画面の横サイズが1000以下の場合はこれ以降表示しない
        if(screen.width < 1000) return;

        // 改行文字で分割して配列に格納する
        var arr = text.split(/\r\n|\n/);

        // デバッグ情報表示部分の大きさを更新
        this.width         = 400;
        this.height        = document.documentElement.clientHeight;
        this.canvas.width  = this.width;
        this.canvas.height = this.height;

        // 黒背景を描画
        this.context.fillStyle = "rgba(0, 0, 0, 0.8)";
        this.context.fillRect(0, 0, this.width, this.height);

        // デバッグ情報を描画
        this.context.font     = `20px 'monospace'`;
        this.context.fillStyle = "rgba(255, 255, 255, 0.8)";
        for(var i = 0; i < arr.length; i++) this.context.fillText(arr[i], 50, 50+i*30);
    }

    // 描画したものを削除する
    clear(){
        this.context.clearRect(0, 0, this.width, this.height);
    }
}
