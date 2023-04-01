import { FC, useEffect, useState } from 'react'
import { useFrame} from '@react-three/fiber';
import { Html, useAnimations, useGLTF } from '@react-three/drei'
import { useDisclosure } from '@chakra-ui/react'
import YoutubePosterProps from '@/types/interfaces/YoutubePoster'
import YoutubePosterModel from '@/components/molecules/YoutubePosterModel'
import YoutubePosterModal from '@/components/organisms/YoutubePosterModal'
import ChakraWrapper from '@/components/atoms/ChakraWrapper'

const YoutubePoster: FC<YoutubePosterProps> = ({ playerRef, modelPath, position, modal_header, modal_message, modal_url, ids }) => {
  const gltf = useGLTF(modelPath)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [opend, setOpend] = useState(false);

  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);
  useEffect(() => {
    //console.log(actions);
    actions.Idle?.play();
  }, [actions, scene]);

  useFrame(() => {
    // @ts-ignore
    if(Math.abs(playerRef.current.position.x - position.x) + Math.abs(playerRef.current.position.z - position.z) < 1.5) {// @ts-ignore
      if(!isOpen && !opend) onOpen(true);
      if(!opend) setOpend(true);
    }else{
      if(opend) setOpend(false);
    }
  });

function countText(text: String){
    var length = 0.0;
    for(var i=0; i < text.length; i++) {
        text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
    }
    return length;
}

  return (
    <>
      <YoutubePosterModel 
        onClick={onOpen}
        gltf={gltf}
        position={position}
      />


      <ChakraWrapper>
        <YoutubePosterModal
          isOpen={isOpen}
          onClose={onClose}
          modal_header={modal_header}
          modal_message={modal_message}
          modal_url={modal_url}
          ids={ids}
        />
      </ChakraWrapper>
    </>
  )
}

export default YoutubePoster