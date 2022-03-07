export const bldgNames = [
    // 各施設のマップ上での位置
    {name: '研究管理棟'},
    {name: '図書館'},
    {name: '講義棟'},
    {name: '研究棟'},
    {name: '総合研究棟'},
    {name: 'マイクロ化総合技術センター'},
    {name: '課外活動共用施設'},
    {name: '体育館'},
    {name: 'キャリア支援室'},
    {name: '共通教育研究棟'},
    {name: '情報基盤センター'},
    {name: 'インキュベーション施設'},
    {name: 'ラーニングアゴラ棟'},
    {name: '福利棟'},
    {name: '実習棟'},
    {name: 'MILAiS'},
    {name: 'スチューデント・レジデンス'}
]

export const model_list = [
    "./models/map_activity.glb",
    "./models/map_administration.glb",
    "./models/map_agora.glb",
    "./models/map_cafeteria.glb",
    "./models/map_career.glb",
    "./models/map_dormitory.glb",
    "./models/map_education.glb",
    "./models/map_500.glb",
    "./models/map_microelectronic.glb",
    "./models/map_gym.glb",
    "./models/map_nature.glb",
    "./models/map_incubation.glb",
    "./models/map_isc.glb",
    "./models/map_lecture.glb",
    "./models/map_lecture_large.glb",
    "./models/map_lecture2.glb",
    "./models/map_library.glb",
    "./models/map_machine_workshop.glb",
    "./models/map_MILAiS.glb",
    "./models/map_research.glb",
    "./models/map_research_satellite.glb",
    "./models/map_swimming_pool.glb",
    "./models/map_workshop.glb",
]

export const bldgPos= {
    // 各施設のマップ上での位置
    '研究管理棟'                    :{leftX:  -37,  rightX :    1, frontY:   86,  backY:   48, height: 10},
    '図書館'                        :{leftX:   46,  rightX :   76, frontY:   96,  backY:   74, height: 10},
    '講義棟'                        :{leftX:   54,  rightX :   89, frontY:   34,  backY:  -6,  height: 20},
    '研究棟'                        :{leftX:  -44,  rightX :   31, frontY:   -2,  backY:  -35, height: 35},
    '総合研究棟'                    :{leftX:  -76,  rightX :  -48, frontY:   10,  backY:  -18, height: 31},
    '課外活動共用施設'              :{leftX:   86,  rightX :  120, frontY:  -89,  backY: -111, height: 11},
    '体育館'                        :{leftX:   89,  rightX :  117, frontY: -164,  backY: -192, height: 13},
    'マイクロ化総合技術センター'    :{leftX:  -13,  rightX :   46, frontY: -114,  backY: -140, height: 20},
    'キャリア支援室'                :{leftX:  -14,  rightX :    1, frontY:   42,  backY:    6, height:  9},
    '情報基盤センター'              :{leftX:  -39,  rightX :   -5, frontY:   43,  backY:   25, height: 15},
    'インキュベーション施設'        :{leftX: -143,  rightX :  -90, frontY:   84,  backY:   66, height: 20},
    'ラーニングアゴラ棟'            :{leftX:  188,  rightX :  230, frontY:  -68,  backY: -112, height: 20},
    '福利棟'                        :{leftX:   53,  rightX :   74, frontY:  -34,  backY:  -64, height: 9},
}
export const bldgURL = {
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

export const bldgCenterPos = [
    // 各施設のマップ上での位置
    {name: '研究管理棟',                    pos:[-17,  12,  80]},
    {name: '図書館',                        pos:[ 54,  12,  80]},
    {name: '講義棟',                        pos:[ 71,  21,   0]},
    {name: '研究棟',                        pos:[ 18,  34,  -8]},
    {name: '総合研究棟',                    pos:[-62,  33,   5]},
    {name: 'マイクロ化総合技術センター',    pos:[  7,  12, -70]},
    {name: '課外活動共用施設',              pos:[104,  12, -94]},
    {name: '体育館',                        pos:[103.4,16,-178]},
    {name: 'キャリア支援室',                pos:[ -6,  15,  20]},
    {name: '共通教育研究棟',                pos:[ 27,  21,  58]},
    {name: '情報基盤センター',              pos:[-21,  17,  37]},
    {name: 'インキュベーション施設',        pos:[-57,  11,  37]},
    {name: 'ラーニングアゴラ棟',            pos:[104.5, 8, -45]},
    {name: '福利棟',                        pos:[ 64,   11,-45]},
    {name: '実習棟',                        pos:[-25,  10, -70]},
    {name: 'MILAiS',                        pos:[119.3, 6,  24]},
    {name: 'スチューデント・レジデンス',    pos:[-71,  17,-232]}
    
]


export const path = {
    '講義棟':{
        route:[[30, 2, 25], [48, 2, 25], [48, 2, -2], [48, 100, -2],   [48, 2, 25], [30, 2, 25], [30, 2, 120], [30, -100, 120]],
                                                       /* 目的地 */                                              /* 定位置 */
        comment: ["この右の建物が講義棟です。", "大学4年間の授業は大体ここで行われます。"]
    },
    'インキュベーション施設':{
        route:[[-57,2, 120], [-57,2, 48], [-57, 100, 48], [-57, 2, 48], [-57,2, 120], [30, 2, 120], [30, -100, 120]],
                                          /* 目的地 */                                               /* 定位置 */

        comment: ["目の前にある施設がインキュベーション施設です。", "この施設は起業を考えている学生や教員が使うことができます。"]
    },
    '福利棟':{
        route:[[30, 2, 25], [48, 2, 25], [48, 2, -57], [48, 100, -57], [48, 2, 25], [30, 2, 25], [30,2,120], [30,-100,120]],
                                                        /* 目的地 */                                          /* 定位置 */

        comment: ["この右の建物が福利棟です。", "食堂や売店が入っています。"]
    }
}