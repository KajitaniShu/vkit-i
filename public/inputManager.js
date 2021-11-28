
//********************************************************//
// InputManagerクラス                                     //
// →PCからのキー操作やスマホ・タブレットからの操作を     //
//   管理する                                             //
//********************************************************//
class InputManager{
    constructor(player, socket, canvas, controls){
        this.player = player;
        this.socket = socket;
        this.canvas = canvas;
        this.controls = controls;
        this.key = {
            'w':'forward',
            's': 'back',
            'a': 'left',
            'd': 'right',
            'ctrl+1': 'debug',
    
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
        this.debugFlag = false;
        

        ////////// キー操作 //////////
        // キーを押した時
        document.addEventListener('keyup', (event) => {
            if ($('#main').css('display') == 'block') {
                if(this.key[event.key]) this.player.command('reset');
            }
            event.preventDefault();
        }, {passive:false});

        // キーから手を離したとき
        document.addEventListener('keydown', (event) => {
            if ($('#main').css('display') == 'block') {
                // 操作キーが押された場合
                if(this.key[event.key] && !(event.ctrlKey || event.metaKey)) this.player.command(this.key[event.key]);
                // Ctrlも一緒に押していた場合
                else if (event.key == '1'  && (event.ctrlKey || event.metaKey)) this.debugFlag = !this.debugFlag;
            }
            event.preventDefault();
        }, {passive:false});

        ////////// タッチ入力 //////////
        // 画面をタッチしたとき
        this.canvas.addEventListener('touchstart', (event)=>{
            this.player.recordStartPoint(event.touches[0].clientX, event.touches[0].clientY);
            event.preventDefault();
        }, {passive:false});

        // タッチした手を動かしたとき
        this.canvas.addEventListener('touchmove', (event)=>{
            this.player.touchMove(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
            event.preventDefault();
        }, {passive:false});

        // 画面から手を離したとき
        this.canvas.addEventListener('touchend', (event)=>{
            this.player.command("reset");
            event.preventDefault();
        }, {passive:false});

        ////////// マウス操作 //////////
        // マウスをクリックしたとき
        
        this.canvas.addEventListener('mousedown', (event)=>{
            if(this.controls.enableRotate) return;
            this.player.recordStartPoint(event.clientX, event.clientY);
            this.mouseFlag = true;
            event.preventDefault();
        }, {passive:false});

        // マウスをドラッグしたとき
        this.canvas.addEventListener('mousemove', (event)=>{
            if(this.controls.enableRotate) return;
            if(this.mouseFlag) this.player.touchMove(event.clientX, event.clientY);
            event.preventDefault();
        }, {passive:false});

        // マウスのボタンを離したとき
        this.canvas.addEventListener('mouseup', (event)=>{
            if(this.controls.enableRotate) return;
            this.player.command("reset");
            this.mouseFlag = false;
            event.preventDefault();
        }, {passive:false});
        


        ////////// ボタン処理 //////////
        // ?ボタンクリック
        $('#desc-btn').on('click', function() {
            $('#main').hide();
            $('body').css('background-color','#f8f9fa');
            $('#description').show();
        });

        // 戻るボタンクリック
        $('#back-btn').on('click', function() {
            $('#description').hide();
            $('body').css('background-color','white');
            $('#main').show();
        });
        
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