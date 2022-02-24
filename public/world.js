
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
        this.controls       = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.plcontrols     = new THREE.PointerLockControls( this.camera, this.renderer.domElement );       
        this.receiver       = new Receiver(this.socket, this.scene, this.camera);
        this.type           = Math.floor( Math.random() * 10 ) + 1 ;
        this.signboard      = new Signboard(this.scene);
        this.modalManager   = new ModalManager(this.canvas, this.scene);
        this.player         = new Player(this.socket, this.scene, this.type, this.camera, this.controls, this.modalManager);
        this.input          = new InputManager(this.player, this.socket, this.canvas, this.controls);
        this.debug          = new DebugManager(this.d_canvas, this.d_context, this.modalManager, this.controls);
        this.active         = false;

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
        this.map_nature             = await loader.load('../public/models/map_nature.glb');
        this.map_500                = await loader.load('../public/models/map_500.glb');
        this.map_activity           = await loader.load('../public/models/map_activity.glb');
        this.map_administration     = await loader.load('../public/models/map_administration.glb');
        this.map_agora              = await loader.load('../public/models/map_agora.glb');
        this.map_aisle              = await loader.load('../public/models/map_aisle.glb');
        this.map_cafeteria          = await loader.load('../public/models/map_cafeteria.glb');
        this.map_dormitory          = await loader.load('../public/models/map_dormitory.glb');
        this.map_education          = await loader.load('../public/models/map_education.glb');
        this.map_gym                = await loader.load('../public/models/map_gym.glb');
        this.map_incubation         = await loader.load('../public/models/map_incubation.glb');
        this.map_isc                = await loader.load('../public/models/map_isc.glb');
        this.map_lecture_large      = await loader.load('../public/models/map_lecture_large.glb');
        this.map_career             = await loader.load('../public/models/map_career.glb');
        this.map_lecture            = await loader.load('../public/models/map_lecture.glb');
        this.map_lecture2           = await loader.load('../public/models/map_lecture2.glb');
        this.map_library            = await loader.load('../public/models/map_library.glb');
        this.map_machine_workshop   = await loader.load('../public/models/map_machine_workshop.glb');
        this.map_microelectronic    = await loader.load('../public/models/map_microelectronic.glb');
        this.map_MILAiS             = await loader.load('../public/models/map_MILAiS.glb');
        this.map_research           = await loader.load('../public/models/map_research.glb');
        this.map_research_satellite = await loader.load('../public/models/map_research_satellite.glb');
        this.map_swimming_pool      = await loader.load('../public/models/map_swimming_pool.glb');
        this.map_workshop           = await loader.load('../public/models/map_workshop.glb');
        
        this.scene.add(this.map_nature, this.map_500, this.map_activity, this.map_administration, this.map_agora, this.map_aisle,
            this.map_cafeteria, this.map_dormitory, this.map_education, this.map_gym, this.map_incubation, this.map_isc, this.map_lecture_large,
            this.map_career, this.map_lecture, this.map_lecture2, this.map_library, this.map_machine_workshop, this.map_microelectronic,
            this.map_MILAiS, this.map_research, this.map_research_satellite, this.map_swimming_pool, this.map_workshop
        );
        
        this.signboard.set(-30, 0, 105, 2);


        //const textBox = createTextbox('groups', '講義棟');
        //this.scene.add(textBox);

        const plane = new THREE.GridHelper(20000, 4000, "#D1D1D1", "#D1D1D1");
        plane.position.y = -1;
        this.scene.add(plane);
        // fog
        this.scene.fog = new THREE.Fog(0xffffff, 100,1000);
        
        this.camera.position.set(250, 130, 200);
        this.camera.lookAt(39, 0, -30);
        this.controls.target.set(30, -35, -30);
        this.controls.enableRotate = false;
        this.controls.enableZoom   = false;
        this.controls.autoRotate = true;
        this.controls.enablePan = false;

        this.active = true;
    }

    // サーバーとの通信を開始する
    Start(){
        this.controls.minDistance = 10;
        this.controls.maxDistance = 200;
        this.controls.autoRotate = false;
        this.controls.enableZoom   = true;
        this.receiver.Start();
        this.player.Start();
        socket.emit('start', this.player.type, this.player.x, this.player.y);
    }

    // アニメーションの更新
    Animate(){
        this.player.move();
        this.signboard.animate();
        this.renderer.render( this.scene, this.camera );
        this.debug.clear();
        this.debug.draw("player x: " + this.player.x.toFixed(2) + " y: " + this.player.y.toFixed(2) + " z: " + this.player.z.toFixed(2) + "\n"
            + "player angle:" + this.player.angle.toFixed(2) + "\n"
            + "online players: " + this.receiver.numPlayers,
            this.input.debugFlag
        );
        this.controls.update();
    }
    
}