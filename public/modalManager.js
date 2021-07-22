
//********************************************************//
// ModalManagerクラス                                     //
// → モーダルウィンドウの制御を行う                      //
//********************************************************//
class ModalManager{
    constructor(canvas){
        this.canvas = canvas;
        this.position = {
            // 各施設のマップ上での位置
            '研究管理棟'                    :{leftX:  -70,  rightX :   -3, frontY:  168,  backY:  102},
            '図書館'                        :{leftX:   90,  rightX :  150, frontY:  191,  backY:  153},
            '講義棟'                        :{leftX:  112,  rightX :  175, frontY:   65,  backY:  -10},
            '研究棟'                        :{leftX:  -86,  rightX :   60, frontY:   -8,  backY:  -67},
            '総合研究棟'                    :{leftX: -142,  rightX : -110, frontY:   12,  backY:  -23},
            '課外活動共用施設'              :{leftX:  178,  rightX :  235, frontY: -185,  backY: -217},
            '体育館'                        :{leftX:  184,  rightX :  231, frontY: -332,  backY: -380},
            /*'マイクロ化総合技術センター'    :{leftX:  -13,  rightX :   46, frontY: -114,  backY: -140},*/
            'キャリア支援室'                :{leftX:  -25,  rightX :   -2, frontY:   65,  backY:   13},
            '情報基盤センター'              :{leftX:  -73,  rightX :  -14, frontY:   84,  backY:   53},
            /*'インキュベーション施設'        :{leftX: -143,  rightX :  -90, frontY:   84,  backY:   66},*/
            /*'ラーニングアゴラ棟'            :{leftX:  188,  rightX :  230, frontY:  -68,  backY: -112},*/
            '福利棟'                        :{leftX:  109,  rightX :  143, frontY:  -72,  backY: -110},
        }
        this.urls = {
            // 各施設のマップ上での位置(youtubeならtrue, それ以外のサイトならfalseを設定)
            '研究管理棟'                    :{url: "https://www.kyutech.ac.jp/admission",               youtube: false},
            '図書館'                        :{url: "https://www.kyutech.ac.jp/facilities/library.html", youtube: false},

            '講義棟_1'                      :{url: "https://www.youtube.com/embed/3PQzBzcyYqM",         youtube: true},
            '講義棟_2'                      :{url: "https://www.youtube.com/embed/sIokStG7CA8",         youtube: true},
            '講義棟_3'                      :{url: "https://www.youtube.com/embed/98592HZdRPc",         youtube: true},
            '講義棟_4'                      :{url: "https://www.youtube.com/embed/Yxb7YdWIvCo",         youtube: true},
            '講義棟_5'                      :{url: "https://www.youtube.com/embed/SZcagal0RPs",         youtube: true},

            '研究棟_1'                      :{url: "https://www.youtube.com/embed/bixh6GojnT8",         youtube: true},
            '研究棟_2'                      :{url: "https://www.youtube.com/embed/uAtrLr98RJI",         youtube: true},
            '研究棟_3'                      :{url: "https://www.youtube.com/embed/ByNMitz0fQo",         youtube: true},
            '研究棟_4'                      :{url: "https://www.youtube.com/embed/sMNShvr9sSo",         youtube: true},
            '研究棟_5'                      :{url: "https://www.youtube.com/embed/b6cozAFiM-o",         youtube: true},
            '研究棟_6'                      :{url: "https://www.youtube.com/embed/ToyqjXR5_d8",         youtube: true},
            '研究棟_7'                      :{url: "https://www.youtube.com/embed/qid68Nar04s",         youtube: true},
            '研究棟_8'                      :{url: "https://www.youtube.com/embed/RJgAyeOhU3Y",         youtube: true},
            '研究棟_9'                      :{url: "https://www.youtube.com/embed/IDX1IMFtB8Y",         youtube: true},
            '研究棟_10'                     :{url: "https://www.youtube.com/embed/WcgpjixtAoI",         youtube: true},
            '研究棟_11'                     :{url: "https://www.youtube.com/embed/9VkvBO1CXw0",         youtube: true},
            '研究棟_12'                     :{url: "https://www.youtube.com/embed/9Tc0wp0xQ5U",         youtube: true},
            '研究棟_13'                     :{url: "https://www.youtube.com/embed/XAVYoqAZwZ4",         youtube: true},

            '課外活動共用施設'              :{url: "https://www.youtube.com/embed/24LK-e5I_Ec",         youtube: true},

            /*'マイクロ化総合技術センター'    :{url: "https://www.cms.kyutech.ac.jp/",                    youtube: false},*/
            'キャリア支援室'                :{url: "https://www.kyutech.ac.jp/career/",                 youtube: false},
            '情報基盤センター'              :{url: "https://www.isc.kyutech.ac.jp/",                    youtube: false},
            /*'インキュベーション施設'        :{url: "http://www.ccr.kyutech.ac.jp/f_venture/incubation.html", youtube: false},*/
            /*'ラーニングアゴラ棟'            :{url: "https://www.gce.kyutech.ac.jp/campus/agora/",       youtube: false},*/
            '福利棟'                        :{url: "https://kyushu.seikyou.ne.jp/kyutech/",             youtube: false}
        }

        this.opend = false;
        $('#cboxClose').click(function () {
            parent.$.colorbox.close();
        });
    }
    

    where(x, y){
        var ret = null;
        Object.keys(this.position).forEach((key) => {
            const pos = this.position[key];
            if((pos.leftX < x && x < pos.rightX) && (pos.backY < y && y < pos.frontY)) ret = key;
        });
        if(this.opend && ret == null) this.opend = false;
        return ret;
        
    }
    open(pos){
        if(pos != null){
            if(!this.opend){
                // 特殊なタイプの処理
            if(pos == "講義棟"){
                var num = Math.floor( Math.random() * 5 ) + 1;
                pos += "_" + num;
            }else if(pos == "研究棟" || pos == "総合研究棟"){
                pos = "研究棟";
                var num = Math.floor( Math.random() * 13 ) + 1;
                pos += "_" + num;
            }else if(pos == "課外活動共用施設" || pos == "体育館"){
                pos = "課外活動共用施設";
            }

            // ウィンドウのサイズ
            var width = this.canvas.clientWidth;
            var height = this.canvas.clientHeight;
            if(width > 800) width *= 0.8;
            if(this.urls[pos].youtube == false) height *= 0.8;
            else                                height = width * 9 / 16;
            
            // urlとaタグの種類
            var url  = this.urls[pos].url;
            var type = "";
            if(!this.urls[pos].youtube) type = ".webpage";
            else                        type =  ".youtube";

            $(function() {
                $(type).colorbox({
                    open: true,
                    iframe:true,
                    innerWidth: width,
                    innerHeight: height,
                    maxWidth:"80%",
                    maxheight:"80%",
                    opacity: 1,
                    href: url
                });
            });

            this.opend = true;
            }
        }else{
            this.close();
            this.reset();
        }
        
        
        
    }
    
    reset(){
        this.opend = false;
    }

    

    close(){
        parent.$.colorbox.close();
    }
}