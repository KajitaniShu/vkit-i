import React from 'react'
import { Html, useGLTF } from "@react-three/drei"
import { Vector3 } from 'three';
import { useDisclosure } from '@chakra-ui/react'
import ChakraWrapper from '@/components/atoms/ChakraWrapper'
import OnClickModel from '@/components/molecules/OnClickModel'

import {
    HStack,
    Tag,
    TagLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

// @ts-ignore
const Youtube = ({ modelPath}) => {
    const gltf = useGLTF(modelPath);
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <mesh scale={[1.2, 1.2, 1.2]} position={[2, 0, 0.5]}>
            <mesh scale={[0.19, 0.19, 0.19]} position={[0, 0, 0]}>
                <primitive
                // @ts-ignore
                object={gltf.scene}
                />
            </mesh>
            <Html position={[0, 1.05, 0.02]} transform occlude distanceFactor={1.1} center={true} >
                <iframe width="720" height="420" src="https://www.youtube.com/embed/videoseries?autoplay=1&loop=1&mute=1?controls=0&amp;list=PLW67WEKYaxqNXDn51SIQj49ZlHFYKKIjE" title="研究紹介" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
            </Html>
        </mesh>
        </>
    );
}

export default Youtube