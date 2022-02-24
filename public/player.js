
//********************************************************//
// Playerクラス                                           //
// → 自分自身の位置・角度等を保持し、サーバーへ送信する  //
// → プレイヤーの位置を起点にカメラの位置を更新する      //
//********************************************************//
class Player{
    constructor(socketID, scene, type, camera, controls, modalManager){
        this.id             = socketID;
        this.scene          = scene;
        this.type           = type;
        this.camera         = camera
        this.controls       = controls;
        this.modalManager   = modalManager;
        this.clock          = new THREE.Clock();
        const texture       = new THREE.TextureLoader().load('./public/img/player' + this.type + '.png');
        texture.minFilter = THREE.LinearFilter;
        texture.maxFilter = THREE.LinearFilter;
        this.playerImage    = new THREE.MeshBasicMaterial({
            map: texture,
            transparent:true
        });
        this.playerImage.map.repeat.x = 0.33;
        this.playerImage.map.repeat.y = 0.25;
        this.geometry       = new THREE.PlaneGeometry(2, 2, 2);
        this.sprite         = new THREE.Mesh(this.geometry, this.playerImage);
        this.step           = 1;
        this.count          = 0.0;
        this.offset         = 0.35;
        this.x              = 10 + Math.floor( Math.random() * 30 ) + 1 ;
        this.y              = 1
        this.z              = 120 + Math.floor( Math.random() * 30 ) + 1 ;
        this.pos            = null;
        this.beforeX        = this.x;
        this.beforeZ        = this.z;
        this.moveForward    = false;
        this.moveBack       = false;
        this.moveRight      = false;
        this.moveLeft       = false;
        this.startX         = null;
        this.startZ         = null;
        this.angle          = 270;
        this.imageType      = this.imageType = 0.75 - (this.angle / 90 ) * 0.25;
        this.playerImage.map.offset.set(this.offset, this.imageType);
        this.sprite.position.set(this.x, this.y, this.z);
        this.active         = false;
    }

    Start(){
        this.active = true;
        this.scene.add(this.sprite);
        this.camera.position.set(this.x, this.y+40, this.z+60);
        this.controls.target.set(this.x, this.y+2, this.z);
    }

    // キャラクターの角度を変える
    changeAngle(angle){
        if(!this.active) return;
        if(angle != this.angle){
            this.angle = angle;
            this.imageType = 0.75 - (this.angle / 90 ) * 0.25;
            this.playerImage.map.offset.set(this.offset, this.imageType);
        }   
    }

    // キャラクターが動いているかチェック
    isMove(){
        if(!this.active) return;
        if(this.moveForward || this.moveBack || this.moveLeft || this.moveRight) return true;
        else return false;
    } 

    // 位置を更新
    updatePosition(x, z){
        if(!this.active) return;
        this.modalManager.open(this.modalManager.where(x, z));
        this.beforeX = this.x;
        this.beforeZ = this.z;
        
        this.x = x;
        this.z = z;

        this.sprite.position.set(this.x, this.y, this.z);
        socket.emit('move', this.x, this.z, this.angle);
    }

    // 足踏みモーションを進める
    nextStep(){
        if(!this.active) return;
        if(this.isMove()) {
            this.step = ( this.step + 1 ) % 4;
            switch(this.step){
                case 1:
                    this.offset = 0.02;
                    break;
                case 2:
                    this.offset = 0.35;
                    break;
                case 3:
                    this.offset = 0.69;
                    break;
                case 0:
                    this.offset = 0.35;
                    break;
            }
            this.playerImage.map.offset.set(this.offset, this.imageType);
        }
    }

    // 移動フラグによって位置を更新する
    move(){
        if(!this.active) return;
        // キャラクター移動
        if      (this.moveForward){ // 前移動
            this.forward(0.6);
            this.changeAngle(270);
        }else if(this.moveBack){    // 後ろ移動
            this.forward(-0.6);
            this.changeAngle(0);
        }else if(this.moveRight){   // 右移動
            this.right(0.6);
            this.changeAngle(180);
        }else if(this.moveLeft){    // 左移動
            this.right(-0.6);
            this.changeAngle(90);
        }

        // 足踏みアニメーション
        this.count += this.clock.getDelta();    // カウントアップ
        if(this.count >= 0.15){                 // 0.15毎に足踏み
            this.nextStep();
            this.count = 0;
        } 
    }

    // 入力を受け取り，フラグを更新する
    command(command){
        if(!this.active) return;
        switch(command){
            case "forward":
                this.moveForward = true;
                break;
            case "back":
                this.moveBack    = true;
                break;
            case "left":
                this.moveLeft    = true;
                break;
            case "right":
                this.moveRight   = true;
                break;
            case "reset":
                this.moveForward = false;
                this.moveBack    = false;
                this.moveLeft    = false;
                this.moveRight   = false;
                break;
        }
    }

    // 前後移動
    forward(distance){
        if(!this.active) return;
        let newZ = this.z - distance;
        let newCameraZ = this.camera.position.z - distance;
        this.updatePosition(this.x, newZ);
        this.setCamera(this.x, newCameraZ);
    }

    // 左右移動
    right(distance){
        if(!this.active) return;
        let newX = this.x + distance;
        let newCameraX = this.camera.position.x + distance;
        this.updatePosition(newX, this.z);
        this.setCamera(newCameraX, this.camera.position.z);
    }

    // カメラの位置を更新する
    setCamera(x, z){
        this.camera.position.x = x;
        this.camera.position.z = z;
        this.controls.target.set(this.x, this.y+2, this.z);
    }

    // タッチドラッグとマウスドラッグの開始地点の座標を記録
    recordStartPoint(x, z){
        if(!this.active) return;
        this.startX = x;
        this.startZ = z;
    }

    // ドラッグ開始地点との差分から移動方向を判断する
    touchMove(x, z){
        if(!this.active) return;
        var diffX = this.startX - x;
        var diffZ = this.startZ - z;

        if(Math.abs(diffX) > 0 || Math.abs(diffZ) > 0){
            // x, y座標方向の移動のどちらを採用するか
            if(Math.abs(diffX) > Math.abs(diffZ)){
                if(diffX > 0) {
                    this.command("left");
                }else{ 
                    this.command("right");
                }
            }
            else{
                if(diffZ > 0) { 
                    this.command("forward");
                }else{
                    this.command("back");
                }
            }
        }
    }
};