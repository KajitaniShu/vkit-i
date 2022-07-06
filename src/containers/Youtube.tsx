import React from 'react'
import { Html } from "@react-three/drei"
import { Vector3 } from 'three';

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
const Youtube = () => {
    return (
        <>
            <Html position={[1.6, 1.9, -0.27]} transform occlude distanceFactor={1.4} center={true} >
                <iframe width="720" height="420" loading="lazy" src="https://www.youtube.com/embed/videoseries?loop=1&mute=1?controls=0&amp;list=PLW67WEKYaxqNXDn51SIQj49ZlHFYKKIjE" title="研究紹介" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
            </Html>
        </>
    );
}

export default Youtube