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
    constructor(canvas, context, modalManager, controls){
        this.canvas  = canvas;
        this.context = context;
        this.modalManager = modalManager;
        this.controls = controls;
        this.width   = 400;
        this.height  = screen.height;
        this.beforeState = false;       // debug_flagの前回呼び出されたときの状態
    }



    // デバッグ情報を表示する
    draw(text, debug_flag){
        if(debug_flag){
            // もし今回からdebug_flagがたったなら衝突判定チェック用の箱を表示する
            if(!this.beforeState) {
                this.modalManager.draw();
                this.controls.enableRotate = true;
                this.beforeState = true;
            }

            // 画面の横サイズが1000以下の場合はこれ以降表示しない
            if(screen.width < 1000) return;

            // 改行文字で分割して配列に格納する
            var arr = text.split(/\r\n|\n/);

            // デバッグ情報表示部分の大きさを更新
            this.width         = 450;
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
        }else{
            if(this.beforeState) {
                this.modalManager.remove();
                this.controls.enableRotate = false;
                this.beforeState = false;
            }
        }
    }

    // 描画したものを削除する
    clear(){
        this.context.clearRect(0, 0, this.width, this.height);
    }
}
