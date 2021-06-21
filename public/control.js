
//********************************************************//
// InputManagerクラス                                     //
// →PCからのキー操作やスマホ・タブレットからの操作を     //
//   管理する                                             //
//********************************************************//
class InputManager{
    constructor(myInfo, socket){
        this.myInfo = myInfo;
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

        // PC
        document.addEventListener('keyup', (event) => {
            if(this.key[event.key]) this.myInfo.command('reset');
            event.preventDefault();
        }, {passive:false});

        document.addEventListener('keydown', (event) => {
            if(this.key[event.key]) this.myInfo.command(this.key[event.key]);
            event.preventDefault();
        }, {passive:false});

                
        document.addEventListener('touchstart', (event)=>{
            this.myInfo.recordStartPoint(event.touches[0].clientX, event.touches[0].clientY);
            event.preventDefault();
        }, {passive:false});

        document.addEventListener('touchmove', (event)=>{
            this.myInfo.touchMove(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
            event.preventDefault();
        }, {passive:false});

        document.addEventListener('touchend', (event)=>{
            this.myInfo.command("reset");
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