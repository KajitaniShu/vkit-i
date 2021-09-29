
//********************************************************//
// Worldクラス                                            // 
// → 各インスタンスを保持し管理する                      //
//********************************************************//
class World{
    constructor(socket, canvas1, canvas2){
        this.socket         = socket;
        this.canvas         = canvas1;
        this.d_canvas       = canvas2;
        this.d_context      = canvas2.getContext('2d');
        this.renderer       = createRenderer(this.canvas);
        this.scene          = createScene("#fbfbfb");
        this.camera         = createCamera();
        this.receiver       = new Receiver(this.socket, this.scene, this.camera);
        this.type           = Math.floor( Math.random() * 10 ) + 1 ;
        this.signboard      = new Signboard(this.scene, -60, 210, 3);
        this.modalManager   = new ModalManager(this.canvas);
        this.player         = new Player(this.socket, this.scene, this.type, this.camera, this.modalManager);
        this.input          = new InputManager(this.player, this.socket, this.canvas);
        
        const {ambientLight, mainLight} = createLight('white', '#e8ffff', 10, 80, 10);
        this.scene.add(ambientLight, mainLight);
        this.context        = canvas.getContext('2d');
        this.count          = 0;

        // 画面サイズが変わったときアスペクト比を変更する
        resize(this.camera, this.renderer);
        window.addEventListener('resize', () => {
            resize(this.camera, this.renderer);
        });
        $(window).on('beforeunload', (event) => {
            this.socket.disconnect();
        });
    }
    
    // 初期化処理
    async init(){
        const loader = new Loader();
        // 九工大マップモデルをロード
        const map = await loader.load('../public/models/kyutech_map.glb');
        map.scale.set(2, 2, 2);
        this.scene.add(map);
        this.signboard.set();
        const texBox = createTexbox('あいうえお');
        texBox.position.set(10, 30, 150);
        this.scene.add(texBox);
    }

    // サーバーとの通信を開始する
    Start(){
        this.receiver.Start();
        this.player.Start();
        socket.emit('start', this.player.type, this.player.x, this.player.y);
    }

    // アニメーションの更新
    Animate(){
        //debug(this.context, "x: 12, y: 34, z: -34\nあいうえおかきくけこ\noeewifjwoienfaopwfa%\esf\nえｓふぇｓｆ");
        this.player.move();
        this.signboard.animate();
        this.renderer.render( this.scene, this.camera );
    }
    
}