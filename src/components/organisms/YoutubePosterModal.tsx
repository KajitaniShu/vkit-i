import { FC } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text
} from '@chakra-ui/react'
import YoutubePosterModalProps from '@/types/interfaces/YoutubePosterModal'
import React from 'react'
import YouTube, { YouTubeProps } from 'react-youtube';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.css";

const YoutubePosterModal: FC<YoutubePosterModalProps> = ({ isOpen, onClose , modal_header, modal_message, modal_url, ids}) => {
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        //event.target.mute();
    }


    const opts: YouTubeProps['opts'] = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            loop: 1,
            rel: 0
        },
        controls: 0
    };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background={"black"} color={"white"} style={{ zIndex: 1000 }}>
          <ModalHeader>{modal_header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Carousel autoPlay={true} infiniteLoop={true} stopOnHover={true} showArrows={true} interval={5000}>
              {ids.map((id) => {
                return (
                  <div>
                    <YouTube opts={opts} onReady={onPlayerReady} videoId={id}/>
                  </div>
                )
              })}
            </Carousel>
            <Text>{modal_message}</Text>
          </ModalBody>
          <ModalFooter>
            <Button as={"a"} href={modal_url} target={'_blank'} colorScheme='red' mr={3} onClick={onClose}>
              <Text>動画一覧</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default YoutubePosterModal