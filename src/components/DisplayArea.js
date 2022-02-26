import React from 'react';
import { MainContents } from './MainContents';
import { DisplayInfo } from './DisplayInfo';
import { InfoButton } from './InfoButton';

export const DisplayArea = ({itemList, setItemList}) => {
    // メインのコンテンツ表示と説明画面の表示を切り替える
    const [isMain, setIsMain] = React.useState(true);

    return (
        <>
        <InfoButton isMain={isMain} setIsMain={setIsMain} />
        {isMain===true ? <MainContents/> : <DisplayInfo itemList={itemList} setItemList={setItemList}/> }
        </>
    );
}
