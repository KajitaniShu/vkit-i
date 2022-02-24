
//********************************************************//
// Resize関数                                             //
// → windowのサイズが変更されるとcanvasの                //
//    縦横の長さアスペクト比を変更する                    //
//********************************************************//
function resize(camera, renderer){
    camera.aspect =$(window).width() / $(window).height();
    camera.updateProjectionMatrix();
    renderer.setSize($(window).width(), $(window).height());
    renderer.setPixelRatio(window.devicePixelRatio);
}

