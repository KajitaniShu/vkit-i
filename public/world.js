
//********************************************************//
// Worldクラス                                            // 
// → 各インスタンスを保持し管理する                      //
//********************************************************//
class World{
    constructor(socket, canvas){
        this.socket         = socket;
        this.canvas         = canvas;
        this.renderer       = createRenderer(this.canvas);
        this.scene          = createScene("#fcfcff");
        this.camera         = createCamera();
        this.receiver       = new Receiver(this.socket, this.scene, this.camera);
        this.type           = Math.floor( Math.random() * 10 ) + 1 ;
        this.signboard      = new Signboard(this.scene, -60, 210, 3);
        this.modalManager   = new ModalManager(this.canvas);
        this.myInfo         = new MyInfo(this.socket, this.scene, this.type, this.camera, this.modalManager);
        this.input          = new InputManager(this.myInfo, this.socket);
        const {ambientLight, mainLight} = createLight('white', '#e8ffff', 10, 80, 10);
        this.scene.add(ambientLight, mainLight);
        this.context  = canvas.getContext('2d');
        this.count    = 0;
        this.clock    = new THREE.Clock();
        resize(this.camera, this.renderer);
        window.addEventListener('resize', () => {
            resize(this.camera, this.renderer);
        });
        $(window).on('beforeunload', (event) => {
            this.socket.disconnect();
        });
    }
    
    async init(){
        const loader = new Loader();
        // 九工大マップモデルをロード
        const map = await loader.load('../public/models/kyutech_map.glb');
        map.scale.set(2, 2, 2);
        this.scene.add(map);
        this.signboard.set();
    }

    Start(){
        this.receiver.Start();
        this.myInfo.Start();
        socket.emit('start', this.myInfo.type, this.myInfo.x, this.myInfo.y);
    }
    

    Animate(){
        this.count = (this.count+this.clock.getDelta());
        this.myInfo.move();
        this.signboard.animate();
        if(this.count >= 0.15){
            this.myInfo.nextStep();
            this.count = 0;
        } 
        this.renderer.render( this.scene, this.camera );
    }
    
}