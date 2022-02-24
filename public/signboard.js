
//********************************************************//
// Signboardクラス                                        //
// → 看板を管理し、画像を切り替える                      //
//********************************************************//
class Signboard{
    constructor(scene){
        this.scene          = scene;
        this.imageType      = 0;
        this.loader         = new Loader();
        this.texLoader      = new THREE.TextureLoader();
        this.tex2           = this.texLoader.load('./public/img/signboard_1.png');
        this.signboard      = new THREE.Group();
        this.size           = 3;
        this.count = 0;
    }

    async set(x, y, z, scale){
        // 看板モデルをロード
        const signboard = await this.loader.load('../public/models/signboard.glb');
        this.signboard.add(signboard);

        // テクスチャ読み込み
        const texture = this.texLoader.load('./public/img/signboard_' + this.imageType + '.png');
        texture.minFilter = THREE.LinearFilter;
        texture.maxFilter = THREE.LinearFilter;

        const img =  new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true
        });
        const imgGeo       = new THREE.PlaneGeometry(10,6.5, 1);
        const imgBoard     = new THREE.Mesh(imgGeo, img);
        imgBoard.name = "img";
        imgBoard.material.needsUpdate = true;
        imgBoard.position.set(0.05, 5.5, 0.15);
        this.signboard.add(imgBoard);
        this.signboard.scale.set(scale, scale, scale);
        this.signboard.position.set(x, y, z);
        this.scene.add(this.signboard);
    }

    async next(){
        this.imageType = (this.imageType+1) % this.size;
        const board = this.scene.getObjectByName("img");
        const texture = await this.texLoader.load('./public/img/signboard_' + this.imageType + '.png');
        texture.minFilter = THREE.LinearFilter;
        texture.maxFilter = THREE.LinearFilter;
        board.material.map = texture;
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