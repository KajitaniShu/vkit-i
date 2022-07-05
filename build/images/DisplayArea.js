import React, {useState} from 'react';
import { Draw3D } from './Draw3D';
import { Draw2D } from './Draw2D';
import { InfoButton } from './InfoButton';
import Box from '@mui/material/Box';

export const DisplayArea = ({itemList, setItemList}) => {
    const [isMain, setIsMain] = useState(true);

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                width: "100%",
                height:"100%",
                position: 'relative',
            }}
        >
            {isMain ? <Draw2D itemList={itemList} setItemList={setItemList}/> : <Draw3D className="main-contents" itemList={itemList}/>}
            <InfoButton isMain={isMain}  setIsMain={setIsMain} />
        </Box>
    );
}
