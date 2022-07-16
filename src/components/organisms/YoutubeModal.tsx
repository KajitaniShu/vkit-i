import { FC } from 'react'
import {
  Image,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Container,
  HStack,
  Flex
} from '@chakra-ui/react'
import YoutubeModalProps from '@/types/interfaces/YoutubeModal'
//@ts-ignore
import YouTube, { YouTubeProps } from 'react-youtube';
//@ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const YoutubeModal: FC<YoutubeModalProps> = ({ isOpen, onClose , modal_header, modal_image, modal_message, modal_url}) => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.mute();
    event.target.cueVideoById({
        'videoId': "LuB4VaScsHo"});
    event.target.playVideo();
  }


  const opts: YouTubeProps['opts'] = {
      playerVars: {
          // https://developers.google.com/youtube/player_parameters
          loop: 1
      },
      controls: 0
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
};

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent style={{zIndex:1000}}>
        <ModalHeader>{modal_header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Slider {...settings}>
                {/* @ts-ignore */}
                <div><YouTube  opts={opts} onReady={onPlayerReady} key={1} style={{zIndex:0}}/></div>
                {/* @ts-ignore */}
                <div><YouTube  opts={opts} onReady={onPlayerReady} key={2} style={{zIndex:0}}/></div>
                {/* @ts-ignore */}
                <div><YouTube  opts={opts} onReady={onPlayerReady} key={3} style={{zIndex:0}}/></div>
                {/* @ts-ignore */}
                <div><YouTube  opts={opts} onReady={onPlayerReady} key={4} style={{zIndex:0}}/></div>
        </Slider>
        </ModalBody>
        <ModalFooter>
          <Button as={"a"} href={modal_url} target={'_blank'} colorScheme='blue' mr={3} onClick={onClose}>
            webサイトを開く
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default YoutubeModal