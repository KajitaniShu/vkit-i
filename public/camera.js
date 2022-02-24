
//********************************************************//
// createCamera()関数                                     //
// → カメラを作成する                                    //
//********************************************************//
function createCamera(){
    const camera = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height() ,0.1, 6000);
    camera.lookAt(40, 5, 0);
    return camera;
}