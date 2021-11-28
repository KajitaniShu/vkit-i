
//********************************************************//
// Playerクラス                                           //
// → ランダムに選んだプレイヤーのスプライトを作成        //
// → プレイヤーがログイン中かどうかを判断し、            //
//    いなければ削除                                      //
//********************************************************//
class PlayerModel{
    constructor(socketID, scene, type, x, y, angle){
        this.id = socketID;
        this.scene = scene;
        this.type = type;
        const texture       = new THREE.TextureLoader().load('./public/img/player' + this.type + '.png');
        texture.minFilter = THREE.NearestFilter;
        texture.maxFilter = THREE.NearestFilter;
        this.playerImage =  new THREE.MeshBasicMaterial({
            map: texture,
            transparent:true
        });
        this.playerImage.map.offset.set(0.05, 0.25);
        this.playerImage.map.repeat.x = 0.33;
        this.playerImage.map.repeat.y = 0.25; 
        this.geometry = new THREE.PlaneGeometry(2, 2, 2);
        this.sprite = new THREE.Mesh(this.geometry, this.playerImage);
        this.step = 1;
        this.offset = 0.35;
        this.x = x;
        this.y = y;
        this.beforeX = x;
        this.beforeY = y;
        this.isActive = true;
        this.angle = angle;
        this.imageType = 0.75 - (this.angle / 90) * 0.25;;
        this.sprite.position.set(this.x, 5, this.y);
        this.scene.add(this.sprite);
    }

    // キャラクター(自分以外)の角度を変える
    changeAngle(angle){
        if(this.angle != angle){
            this.angle = angle;
            this.imageType = 0.75 - (this.angle / 90) * 0.25;
            this.playerImage.map.offset.set(this.offset, this.imageType);
        }
    }

    // キャラクター(自分以外)が動いているかチェック
    isMove(){
        if(this.x != this.oldX || this.y != this.oldY) return true;
        else return false;
    }

    //位置を更新
    updatePosition(x, y){
        const isMove = this.x != x || this.y != y;
        
        this.beforeX = this.x;
        this.beforeY = this.y;
        
        this.x = x;
        this.y = y;
        
        if(isMove) {
            this.sprite.position.set(x, 5, y);
        }
    }

    // 足踏みモーションを進める
    nextStep(){
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
}