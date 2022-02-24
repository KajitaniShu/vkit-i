
//********************************************************//
// createLight()関数                                      //
// → 環境光とメインライトを作成する                      // 
//********************************************************//
function createLight(ambientColor, mainColor, mPosX, mPosY, mPosZ){
    const ambientLight = new THREE.AmbientLight(ambientColor, 3);
    const mainLight    = new THREE.DirectionalLight(mainColor, 2);
    mainLight.position.set(mPosX, mPosY, mPosZ);
    return {ambientLight, mainLight};
}