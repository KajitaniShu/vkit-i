
//********************************************************//
// InputManagerクラス                                     //
// →PCからのキー操作やスマホ・タブレットからの操作を     //
//   管理する                                             //
//********************************************************//
class InputManager{
    constructor(player, socket){
        this.player = player;
        this.socket = socket;
        this.key = {
            'w':'forward',
            's': 'back',
            'a': 'left',
            'd': 'right',
    
            'ArrowUp'   : 'forward',
            'ArrowDown' : 'back',
            'ArrowLeft' : 'left',
            'ArrowRight': 'right',

            'touchUp'    : 'forward',
            'touchDown'  : 'back',
            'touchLeft'  : 'left',
            'touchRight' : 'right',
        };
        this.mouseFlag = false;

        ////////// キー操作 //////////
        // キーを押した時
        document.addEventListener('keyup', (event) => {
            if(this.key[event.key]) this.player.command('reset');
            event.preventDefault();
        }, {passive:false});

        // キーから手を離したとき
        document.addEventListener('keydown', (event) => {
            if(this.key[event.key]) this.player.command(this.key[event.key]);
            event.preventDefault();
        }, {passive:false});

        ////////// タッチ入力 //////////
        // 画面をタッチしたとき
        document.addEventListener('touchstart', (event)=>{
            this.player.recordStartPoint(event.touches[0].clientX, event.touches[0].clientY);
            event.preventDefault();
        }, {passive:false});

        // タッチした手を動かしたとき
        document.addEventListener('touchmove', (event)=>{
            this.player.touchMove(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
            event.preventDefault();
        }, {passive:false});

        // 画面から手を離したとき
        document.addEventListener('touchend', (event)=>{
            this.player.command("reset");
            event.preventDefault();
        }, {passive:false});

        ////////// マウス操作 //////////
        // マウスをクリックしたとき
        document.addEventListener('mousedown', (event)=>{
            this.player.recordStartPoint(event.clientX, event.clientY);
            this.mouseFlag = true;
            event.preventDefault();
        }, {passive:false});

        // マウスをドラッグしたとき
        document.addEventListener('mousemove', (event)=>{
            if(this.mouseFlag) this.player.touchMove(event.clientX, event.clientY);
            event.preventDefault();
        }, {passive:false});

        // マウスのボタンを離したとき
        document.addEventListener('mouseup', (event)=>{
            this.player.command("reset");
            this.mouseFlag = false;
            event.preventDefault();
        }, {passive:false});

        
        // ブラウザバックでおかしくなるのを防ぐ
        window.onbeforeunload = function() {
            this.socket.emit('disconnect');
        };
        window.onunload = function() {
            this.socket.emit('disconnect');
        };
        window.popstate = function() {
            this.socket.emit('disconnect');
        };
    }
}