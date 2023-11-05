//@ts-nocheck
import React, { useRef, useState } from 'react'
import { Box, Card, Image, Text, rem, ActionIcon, Group, Table, Avatar, Container, SimpleGrid, Modal, AspectRatio, Title, Button, Paper, px } from '@mantine/core';
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
      <Box sx={{position: "absolute"}} style={{zIndex: width > 700 ? 0 : 3}}  bg="transparent" h="100vh" w="100%" pt="0vh">
        
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
          position: [18, 12, 34],
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
          <ExplosionConfetti  rate={0.4} amount={40} fallingHeight={6} fallingSpeed={0.01} Radius={10} AreaHeight={10} AreaWidth={10} enableShadows={false} isExploding colors={['yellow', 'white', 'red', 'blue', '#6BCB77']}/>
        </group>
        <group position={[-10, 0, 10]}>
          <ExplosionConfetti  rate={0.4} amount={40} fallingHeight={6} fallingSpeed={0.01} Radius={10} AreaHeight={10} AreaWidth={10} enableShadows={false} isExploding colors={['yellow', 'white', 'red', 'blue', '#6BCB77']}/>
        </group>
        <group position={[10, 0, -10]}>
          <ExplosionConfetti  rate={0.4} amount={40} fallingHeight={6} fallingSpeed={0.01} Radius={10} AreaHeight={10} AreaWidth={10} enableShadows={false} isExploding colors={['yellow', 'white', 'red', 'blue', '#6BCB77']}/>
        </group>
        <group position={[-10, 0, -10]}>
          <ExplosionConfetti  rate={0.4} amount={40} fallingHeight={6} fallingSpeed={0.01} Radius={10} AreaHeight={10} AreaWidth={10} enableShadows={false} isExploding colors={['yellow', 'white', 'red', 'blue', '#6BCB77']}/>
        </group>
        <ExplosionConfetti  rate={0.4} amount={40} fallingHeight={6} fallingSpeed={0.01} Radius={10} AreaHeight={10} AreaWidth={10} enableShadows={false} isExploding colors={['yellow', 'white', 'red', 'blue', '#6BCB77']}/>

        <Grid cellColor="#ddd" cellThickness={0.7} sectionThickness={0.7} sectionColor="#fff"  fadeStrength={1} position={[0, -0.04, 0]} args={[500, 500]} />
        <SoftShadows />
        <ContactShadows frames={2} opacity={0.9} scale={10} blur={0.1} far={4} width={5} height={5} color="#192655"/>
        <Environment preset="city" />

        <HomeScene modelPath={"./kyutech_map_2.glb"}/>
        <VideoBoard video_path={path.board.video_path} position={[-5.689, 1.174, 13.55]}/>
        <OrbitControls maxPolarAngle={11*Math.PI/24}  autoRotate={true} makeDefault  enableZoom={false} />
        <Characters />
      </Canvas>
      <Box sx={{position: "absolute", top: "60vh"}} w="100%">
        <Container size="md" px="xl">
          <Title>九工大</Title>
          <Title>バーチャルキャンパス</Title>
          <Button variant='filled' color="dark.8" mt="md">入ってみる</Button>
        </Container>
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
              <Text size="xs" color="white" weight="bold">&nbsp;</Text>
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
          <AspectRatio ratio={16 / 9} >
            <Canvas
              flat
              shadows="soft"
              style={{
                position:"absolute",
                borderRadius: rem(5),
                zIndex: -10
              }}
              
              camera={{ 
                position: [5, 4, 5],
                fov: 30,
              }}
            >
            <color attach="background" args={['#495780']} />
            <OrbitControls target={[0, 0.7, 0]} maxPolarAngle={11*Math.PI/24}  autoRotate={true} makeDefault  enableZoom={false} />

            <ambientLight intensity={0.8}/>
            <directionalLight
              position={[3,25,0]}
              intensity={1.3}
              castShadow
            />
            <Grid cellColor="#293966" cellThickness={1} sectionThickness={0.7} fadeStrength={4} position={[0, -0.04, 0]} args={[500, 500]} />

            <HomeScene modelPath={"./kenkyutou.glb"}/>
            </Canvas>
          </AspectRatio>
          <Text
            mb={ width > 700 ? "" : rem(60)}
          >あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお</Text>
          <AspectRatio ratio={16 / 9} >
          <Canvas
              flat
              shadows="soft"
              style={{
                position:"absolute",
                borderRadius: rem(5),
                zIndex: -10
              }}
              
              camera={{ 
                position: [5, 4, 5],
                fov: 30,
              }}
            >
          <color attach="background" args={['#495780']} />
          <OrbitControls target={[0, 0.6, 0]} maxPolarAngle={11*Math.PI/24}  autoRotate={true} makeDefault  enableZoom={false} />

            <ambientLight intensity={0.8}/>
            <directionalLight
              position={[3,25,0]}
              intensity={1.3}
              castShadow
            />
            <Grid cellColor="#293966" cellThickness={1} sectionThickness={0.7} fadeStrength={4} position={[0, -0.04, 0]} args={[500, 500]} />

            <HomeScene modelPath={"./kougitou.glb"}/>
            </Canvas>
          </AspectRatio>
          <Text
            mb={ width > 700 ? "" : rem(60)}
          >研究棟</Text>
          <AspectRatio ratio={16 / 9} >
          <Canvas
              flat
              shadows="soft"
              style={{
                position:"absolute",
                borderRadius: rem(5),
                zIndex: -10
              }}
              
              camera={{ 
                position: [5, 4, 5],
                fov: 30,
              }}
            >
          <color attach="background" args={['#495780']} />
          <OrbitControls target={[0, 0.3, 0]} maxPolarAngle={11*Math.PI/24}  autoRotate={true} makeDefault  enableZoom={false} />

            <ambientLight intensity={0.8}/>
            <directionalLight
              position={[3,25,0]}
              intensity={1.3}
              castShadow
            />
            <Grid cellColor="#293966" cellThickness={1} sectionThickness={0.7} fadeStrength={4} position={[0, -0.04, 0]} args={[500, 500]} />

            <HomeScene modelPath={"./tosyokan.glb"}/>
            </Canvas>
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
              <ActionIcon target="_blank" component="a" variant="filled" color="dark.9" radius="lg" size="sm" aria-label="Settings" href="https://www.iizuka.kyutech.ac.jp/access">
                <IconChevronRight style={{ width: '80%', height: '70%' }} stroke={3} />
              </ActionIcon>
            </Group>
          </Group>
          </Container>
          <Access />
      </Box>

      <Box w="100%">
        <Container size="md" py={rem(50)} px="xl" >
          <Group position='apart' >
            <Title>開発メンバー</Title>
            <Group mt="xs">
              {width > 700 && <Text weight="bolder">もっと見る</Text>}
              <ActionIcon target="_blank" component="a" variant="filled" color="dark.9" radius="lg" size="sm" aria-label="Settings" href="">
                <IconChevronRight style={{ width: '80%', height: '70%' }} stroke={3} />
              </ActionIcon>
            </Group>
          </Group>
          <Container size="sm">
            <Paper mt={rem(80)} p="sm">
                    <Group spacing="xs" mt="xs">
                      <Avatar w={rem(50)} h={rem(50)}  bg="gray.2" src={"./avatars/1.png"} radius={100} />
                      <Box w="70%">
                        <Text fz="md" fw={500}>梶谷 柊</Text>
                        <Text fz="xs" c="dimmed">情報創成工学専攻 M2 (物理情報工学科)</Text>
                      </Box>
                    </Group>
                    <Group spacing="xs" mt="xs">
                      <Avatar w={rem(50)} h={rem(50)}  bg="gray.2" src={"./avatars/2.png"} radius={100} />
                      <Box w="70%">
                        <Text fz="md" fw={500}>冨岡 莉生</Text>
                        <Text fz="xs" c="dimmed">情報創成工学専攻 D1 (システム創成情報工学科)</Text>
                      </Box>
                    </Group>
                    <Group spacing="xs" mt="xs">
                      <Avatar w={rem(50)} h={rem(50)}  bg="gray.2" src={"./avatars/3.png"} radius={100} />
                      <Box w="70%">
                        <Text fz="md" fw={500}>井上 快斗</Text>
                        <Text fz="xs" c="dimmed">情報創成工学専攻 M1 (物理情報工学科)</Text>
                      </Box>
                    </Group>
                    <Group spacing="xs" mt="xs">
                      <Avatar w={rem(50)} h={rem(50)}  bg="gray.2" src={"./avatars/4.png"} radius={100} />
                      <Box w="70%">
                        <Text fz="md" fw={500}>高津 太一</Text>
                        <Text fz="xs" c="dimmed">情報創成工学専攻 M1 (物理情報工学科)</Text>
                      </Box>
                    </Group>
                    <Group spacing="xs" mt="xs">
                      <Avatar w={rem(50)} h={rem(50)}  bg="gray.2" src={"./avatars/5.png"} radius={100} />
                      <Box w="70%">
                        <Text fz="md" fw={500}>根崎 翔</Text>
                        <Text fz="xs" c="dimmed">情報創成工学専攻 M1 (物理情報工学科)</Text>
                      </Box>
                    </Group>
                    <Group spacing="xs" mt="xs">
                      <Avatar w={rem(50)} h={rem(50)}  bg="gray.2" src={"./avatars/6.png"} radius={100} />
                      <Box w="70%">
                        <Text fz="md" fw={500}>南 歩希</Text>
                        <Text fz="xs" c="dimmed">工学部 応用化学科 B4</Text>
                      </Box>
                    </Group>
                    <Group spacing="xs" mt="xs">
                      <Avatar w={rem(50)} h={rem(50)}  bg="gray.2" src={"./avatars/7.png"} radius={100} />
                      <Box w="70%">
                        <Text fz="md" fw={500}>糸園 朔</Text>
                        <Text fz="xs" c="dimmed"></Text>
                      </Box>
                    </Group>
              <Text mt="md" size="xs" color="dimmed">所属は2023年時点のもの．カッコ内は学部生の時の所属学科．</Text>
            </Paper>
          </Container>
        </Container>
      </Box>
    </>
  )
}


