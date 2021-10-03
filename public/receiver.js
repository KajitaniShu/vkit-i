
//********************************************************//
// Receiverクラス                                         //
// → socketとの送受信、受信時の反応を扱う                //
//********************************************************//
class Receiver{
    constructor(socket, scene, camera){
        this.socket = socket;
        this.scene = scene;
        this.camera = camera;
        this.playerModels = {};
        this.players = {};
        this.isActive = {};
        this.count = 0;
        this.clock = new THREE.Clock();
        this.numPlayers = 0;
    }

    Start(){
        
        this.socket.on('update', (players) => {
            this.numPlayers = Object.values(players).length;                    // 現在のプレイヤー数を取得
            // プレイヤーアニメーション用にカウントアップ
            this.count = (this.count+this.clock.getDelta());
            // サーバーを抜けたプレイヤーのモデルをシーンから除外
            Object.keys(this.playerModels).forEach((key) => {
                if(!this.playerModels[key].isActive) {
                    this.scene.remove(this.playerModels[key].sprite);
                    delete this.playerModels[key];
                }else{
                    this.playerModels[key].isActive = false;
                }
            });
            // 自分以外のプレイヤーを描画
            Object.values(players).forEach((player) => {
                if(player.id != this.socket.id){    // 自分自身はここでは描画しない
                    // 未登録の参加者がいたら新規作成
                    if( this.playerModels[player.id] == null){
                        this.playerModels[player.id] = new PlayerModel(player.socketID, this.scene, player.type, player.x, player.y, player.angle);
                    }
                    // プレイヤーのモデルの位置と角度を変更
                    this.playerModels[player.id].updatePosition(player.x, player.y);
                    this.playerModels[player.id].changeAngle(player.angle);
                    // プレイヤーのアニメーションを更新
                    if(this.count >= 0.15) this.playerModels[player.id].nextStep();
                    // 表示したプレイヤーのアクティブフラグをtrueにする
                    this.playerModels[player.id].isActive = true;
                }
            });
            // アニメーションがループするようにカウント変数を初期化
            if(this.count >= 0.15) this.count = 0;
        });
    }
}