
//********************************************************//
// Signboardクラス                                        //
// → 看板を管理し、画像を切り替える                      //
//********************************************************//
class Signboard{
    constructor(scene, x, z, size){
        this.scene          = scene;
        this.size           = size;
        this.x              = x;
        this.y              = 0;
        this.z              = z;
        this.imageType      = 0;
        this.loader         = new Loader();
        this.texLoader      = new THREE.TextureLoader();
        this.tex2 = this.texLoader.load('./public/img/signboard_1.png');
        this.count = 0;
    }

    async set(){
        // 看板モデルをロード
        this.signboard = await this.loader.load('../public/models/signboard.glb');
        this.signboard.scale.set(3, 3, 3);
        this.signboard.position.set(this.x, this.y, this.z);
        this.img =  new THREE.MeshPhongMaterial({
            map: this.texLoader.load('./public/img/signboard_' + this.imageType + '.png'),
            transparent: true
        });
        const imgGeo       = new THREE.PlaneGeometry(30,19, 1);
        const imgBoard     = new THREE.Mesh(imgGeo, this.img);
        imgBoard.name = "img";
        imgBoard.material.needsUpdate = true;
        imgBoard.position.set(this.x, 16, this.z+1.5);
        this.scene.add(this.signboard, imgBoard);
    }

    async next(){
        this.imageType = (this.imageType+1) % this.size;
        const board = this.scene.getObjectByName("img");
        const img = await this.texLoader.load('./public/img/signboard_' + this.imageType + '.png');
        board.material.map = img;
        board.material.needsUpdate = true;
    }

    async animate(){
        this.count += 1;
        if(this.count > 100){
            await this.next();
            this.count = 0;
        }
    }
};