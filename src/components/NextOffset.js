// 足踏みモーション
function nextOffset(count){
    if(true) {
        switch(count){
            case 1:
                return 0.02;
            case 2:
                return 0.35;
            case 3:
                return 0.69;
            case 0:
                return 0.35;
        }
    }
}

export default nextOffset;