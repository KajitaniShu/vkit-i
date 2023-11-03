import React, { useRef, useState } from 'react'
import { Box, Card, Image, Text, rem, ActionIcon, Group, Tabs, Paper, Container, SimpleGrid, Modal, AspectRatio, Title, Button, Timeline, Divider } from '@mantine/core';
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment, Grid, ContactShadows, OrbitControls, SoftShadows } from '@react-three/drei'
import { Carousel } from '@mantine/carousel';
import HomeScene  from '@/containers/HomeScene'
import path from '@/configs/model.json'
import { useViewportSize } from '@mantine/hooks';
import VideoBoard from '@/containers/VideoBoard'
import Characters from '@/components/molecules/Characters'
import { IconChevronsDown, IconChevronRight } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import Validation from '@/containers/Validation'
import Access from '@/containers/Access'
import ExplosionConfetti from '@/components/atoms/Contfetti'

export function Home() {
  const { height, width } = useViewportSize();
  const [modalType, setModalType] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);


  return (
    <>
    <div style={{position: "relative", height: "100vh"}}>
      <Box sx={{position: "absolute", top: "60vh", }}  h="100vh" w="100%" pt="0vh">
        <Container size="md" px="xl">
          <Title sx={{position: "absolute", zIndex:100}}>九工大</Title>
          <Title sx={{position: "absolute", zIndex:100}} mt={rem(45)}>バーチャルキャンパス</Title>
          <Button sx={{position: "absolute", zIndex:20}} variant='filled' mt={rem(100)} color="dark.8">入ってみる</Button>
        </Container>
      </Box>
    <Canvas
        flat
        shadows="soft"
        style={{
          top:0,
          position: "absolute",
          width: "100%",
          height: "100vh"
        }}
        
        camera={{ 
          position: [15, 15, 30],
          fov: 30,
        }}
      >
        {/* 8EA7E9 */}
        <ambientLight intensity={0.5}/>
        <directionalLight
          position={[4,25,0]}
          intensity={0.05}
          castShadow
        />
        <color attach="background" args={['#ECEEF1']} />
        <group position={[10, 0, 10]}>
          <ExplosionConfetti  rate={0.4} amount={60} fallingHeight={6} fallingSpeed={0.01} Radius={1000} AreaHeight={100000000} AreaWidth={10000000} enableShadows={false} isExploding colors={['yellow', 'white', 'red', 'blue', '#6BCB77']} AreaWidth={5} AreaHeight={400} Radius={100}/>
        </group>
        <group position={[-10, 0, 10]}>
          <ExplosionConfetti  rate={0.4} amount={60} fallingHeight={6} fallingSpeed={0.01} Radius={1000} AreaHeight={100000000} AreaWidth={10000000} enableShadows={false} isExploding colors={['yellow', 'white', 'red', 'blue', '#6BCB77']} AreaWidth={5} AreaHeight={400} Radius={100}/>
        </group>
        <group position={[10, 0, -10]}>
          <ExplosionConfetti  rate={0.4} amount={60} fallingHeight={6} fallingSpeed={0.01} Radius={1000} AreaHeight={100000000} AreaWidth={10000000} enableShadows={false} isExploding colors={['yellow', 'white', 'red', 'blue', '#6BCB77']} AreaWidth={5} AreaHeight={400} Radius={100}/>
        </group>
        <group position={[-10, 0, -10]}>
          <ExplosionConfetti  rate={0.4} amount={60} fallingHeight={6} fallingSpeed={0.01} Radius={1000} AreaHeight={100000000} AreaWidth={10000000} enableShadows={false} isExploding colors={['yellow', 'white', 'red', 'blue', '#6BCB77']} AreaWidth={5} AreaHeight={400} Radius={100}/>
        </group>
        <ExplosionConfetti  rate={0.4} amount={60} fallingHeight={6} fallingSpeed={0.01} Radius={1000} AreaHeight={100000000} AreaWidth={10000000} enableShadows={false} isExploding colors={['yellow', 'white', 'red', 'blue', '#6BCB77']} AreaWidth={5} AreaHeight={400} Radius={100}/>

        <Grid cellColor="#ddd" cellThickness={0.7} sectionThickness={0.7} sectionColor="#fff"  fadeStrength={1} position={[0, -0.04, 0]} args={[500, 500]} />
        <SoftShadows />
        <ContactShadows frames={2} opacity={0.9} scale={10} blur={0.1} far={4} width={5} height={5} color="#192655"/>
        <Environment preset="city" />
        
        <HomeScene modelPath={"./kyutech_map_2.glb"}/>
        <VideoBoard video_path={path.board.video_path} position={[-5.689, 1.174, 13.55]}/>
        <OrbitControls makeDefault enableZoom={true} autoRotate minAzimuthAngle={0}/>
        <Characters />
      </Canvas>
      <Box sx={{position: "absolute", top: "90vh"}} w="100%">
        <Text w="100%" align="center" weight="bold">Scroll</Text>
        <Group position='center'><IconChevronsDown /></Group>
      </Box>
      </div>

      <Modal.Root
        opened={opened}
        onClose={close}
        fullScreen
        radius={0}
        transitionProps={{ transition: "slide-up", duration: 300 }}
      >
        <Modal.Content>
          <Validation type={modalType} close={close} />
        </Modal.Content>
      </Modal.Root>
        
      <Container size="md" py={rem(100)} px="xl" >
      <Carousel
        slideSize="1%"
        slideGap="md"
        withControls={false} 
        align="start"
      >
        <Carousel.Slide>
          <Card 
            shadow="sm" 
            mx="xs"
            radius="md" 
            withBorder
            w={rem(200)}
            onClick={()=>{setModalType(0); open()}}
          >
            <Card.Section p="md" bg="red.6" h={rem(250)}>
              <Group position='apart'>
                <Text size="sm" color="white" weight="bold">通常ワールド</Text>
                <ActionIcon variant="filled" color="gray.0" radius="lg" size="xs" aria-label="Settings">
                  <IconChevronRight style={{ width: '80%', height: '70%', color: "#FA5252" }} stroke={3} />
                </ActionIcon>
              </Group>
              <Text size="xs" color="white" weight="bold">　</Text>
              <Image
                mt={rem(18)}
                radius="sm"
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={rem(150)}
                alt="画像"
              />
            </Card.Section>
          </Card>
        </Carousel.Slide>

        <Carousel.Slide>
          <Card 
            shadow="sm"
            mx="xs"
            radius="md" 
            withBorder
            onClick={()=>{setModalType(1); open()}}
            w={rem(200)}
          >
            <Card.Section p="md" bg="yellow.5" h={rem(250)}>
              <Group position='apart'>
                <Text size="sm" color="white" weight="bold">MDASHワールド</Text>
                <ActionIcon variant="filled" color="gray.0" radius="lg" size="xs" aria-label="Settings">
                  <IconChevronRight style={{ width: '80%', height: '70%', color: "#FCC419" }} stroke={3} />
                </ActionIcon>
              </Group>
              <Text size="xs" color="white" weight="bold">(軽量版)</Text>
              <Image
                mt={rem(18)}
                radius="sm"
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={rem(150)}
                alt="画像"
              />
            </Card.Section>
          </Card>
        </Carousel.Slide>

        <Carousel.Slide>
        <Card 
            shadow="sm"
            mx="xs"
            radius="md" 
            withBorder
            onClick={()=>{setModalType(2); open()}}
            w={rem(200)}
          >
            <Card.Section p="md" bg="indigo.5" h={rem(250)}>
              <Group position='apart'>
                <Text size="sm" color="white" weight="bold">MDASHワールド</Text>
                <ActionIcon variant="filled" color="gray.0" radius="lg" size="xs" aria-label="Settings">
                  <IconChevronRight style={{ width: '80%', height: '70%', color: "#5C7CFA" }} stroke={3} />
                </ActionIcon>
              </Group>
              <Text size="xs" color="white" weight="bold">(3Dキャラクター版)</Text>
              <Image
                mt={rem(18)}
                radius="sm"
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={rem(150)}
                alt="画像"
              />
            </Card.Section>
          </Card>
        </Carousel.Slide>
      </Carousel>

        <Group position='apart' mt={rem(100)} mb={rem(100)}>
          <Title>Campus Map</Title>
          <Group mt="xs">
            {width > 700 && <Text weight="bolder">もっと見る</Text>}
            <ActionIcon variant="filled" color="dark.9" radius="lg" size="sm" aria-label="Settings">
              <IconChevronRight style={{ width: '80%', height: '70%' }} stroke={3} />
            </ActionIcon>
          </Group>
        </Group>

        <SimpleGrid cols={width > 700 ? 2 : 1} spacing={ width > 700 ? rem(60) : ""} verticalSpacing={ width > 700 ? rem(80) : ""}>
          <AspectRatio ratio={16 / 9}>
            <Image src="" bg="blue" />
          </AspectRatio>
          <Text
            mb={ width > 700 ? "" : rem(60)}
          >あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお</Text>
          <AspectRatio ratio={16 / 9} >
            <Image src="" bg="blue" />
          </AspectRatio>
          <Text
            mb={ width > 700 ? "" : rem(60)}
          >あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお</Text>
          <AspectRatio ratio={16 / 9} >
            <Image src="" bg="blue" />
          </AspectRatio>
          <Text
            mb={ width > 700 ? "" : rem(60)}
          >あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお</Text>
        </SimpleGrid>
      </Container>

      <Box w="100%" bg="#ECEEF1">
        <Container size="md" py={rem(50)} px="xl" >

          <Group position='apart' >
            <Title>Access</Title>
            <Group mt="xs">
              {width > 700 && <Text weight="bolder">もっと見る</Text>}
              <ActionIcon variant="filled" color="dark.9" radius="lg" size="sm" aria-label="Settings">
                <IconChevronRight style={{ width: '80%', height: '70%' }} stroke={3} />
              </ActionIcon>
            </Group>
          </Group>
          </Container>
          <Access />
      </Box>
    </>
  )
}


