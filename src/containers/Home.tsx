//@ts-nocheck
import React, { useRef, useState } from 'react'
import { Box, Card, Image, Text, rem, ActionIcon, Group, Footer, Avatar, Container, SimpleGrid, Modal, AspectRatio, Title, Button, Paper, Anchor, ThemeIcon } from '@mantine/core';
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
  const links = [
    { link: '#', label: 'Contact' },
    { link: '#', label: 'Privacy' },
    { link: '#', label: 'Blog' },
    { link: '#', label: 'Careers' },
  ];

  return (
    <>
    <div style={{position: "relative", height: "100vh"}}>
      <Box sx={{position: "absolute"}} style={{zIndex: width > 700 ? 0 : 3}}  bg="transparent" h="100vh" w="100%" pt="0vh" id="top">
        
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
      <div style={{position: "absolute", top: "60vh", width: "100%"}}>
        <Container size="md" px="xl">
          <Title>九工大</Title>
          <Title>バーチャルキャンパス</Title>
          <Button variant='filled' color="dark.8" mt="md" onClick={()=>{setModalType(2); open()}}>入ってみる</Button>
        </Container>
      </div>
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
            <Card.Section p="md" bg="red.7" h={rem(250)}>
              <Group position='apart'>
                <Text size="sm" color="white" weight="bold">通常ワールド</Text>
                <ActionIcon variant="filled" color="gray.0" radius="lg" size="xs" aria-label="Settings">
                  <IconChevronRight style={{ width: '80%', height: '70%', color: "#FA5252" }} stroke={3} />
                </ActionIcon>
              </Group>
              <Text size="xs" color="white" weight="bold">&nbsp;</Text>
              <Box mt={rem(18)} h={rem(150)} bg="red.8" sx={{borderRadius: "6px"}} />
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
            <Card.Section p="md" bg="yellow.6" h={rem(250)}>
              <Group position='apart'>
                <Text size="sm" color="white" weight="bold">MDASHワールド</Text>
                <ActionIcon variant="filled" color="gray.0" radius="lg" size="xs" aria-label="Settings">
                  <IconChevronRight style={{ width: '80%', height: '70%', color: "#FCC419" }} stroke={3} />
                </ActionIcon>
              </Group>
              <Text size="xs" color="white" weight="bold">(軽量版)</Text>
              <Box mt={rem(18)} h={rem(150)} bg="yellow.7" sx={{borderRadius: "6px"}} />
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
            <Card.Section p="md" bg="indigo.7" h={rem(250)}>
              <Group position='apart'>
                <Text size="sm" color="white" weight="bold">MDASHワールド</Text>
                <ActionIcon variant="filled" color="gray.0" radius="lg" size="xs" aria-label="Settings">
                  <IconChevronRight style={{ width: '80%', height: '70%', color: "#5C7CFA" }} stroke={3} />
                </ActionIcon>
              </Group>
              <Text size="xs" color="white" weight="bold">(3Dキャラクター版)</Text>
              <Box mt={rem(18)} h={rem(150)} bg="indigo.9" sx={{borderRadius: "6px"}} />
            </Card.Section>
          </Card>
        </Carousel.Slide>
      </Carousel>

        <Group position='apart' mt={rem(100)} mb={rem(100)}>
          <Title id="campus_map">Campus Map</Title>
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

            <ambientLight intensity={0.9}/>
            <directionalLight
              position={[3,25,0]}
              intensity={2}
              castShadow
            />
            <Grid cellColor="#293966" cellThickness={1} sectionThickness={0.7} fadeStrength={4} position={[0, -0.04, 0]} args={[500, 500]} />

            <HomeScene modelPath={"./kenkyutou.glb"}/>
            </Canvas>
          </AspectRatio>
          <div style={{marginBottom:rem(30)}}>
            <Title
              mb="xs"
              order={4}
              weight={500}
            >研究棟</Title>
            <Text color="gray.7">幅広い分野の研究室が入っており，日々研究を進めています．</Text>
          </div>
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
          <div style={{marginBottom:rem(30)}}>
            <Title
              mb="xs"
              order={4}
              weight={500}
            >講義棟</Title>
            <Text color="gray.7">情報工学部の多くの講義がこの建物で行われます．加えて，1階にはレーザーカッター等の設備を利用できる<Anchor href="https://www.ltc.kyutech.ac.jp/business/engineering-design/koubou/iizuka/" target="_blank">デザイン工房</Anchor>もあります．</Text>
          </div>
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
          <div style={{marginBottom:rem(30)}}>
            <Title
              mb="xs"
              order={4}
              weight={500}
            >附属図書館 分館</Title>
            <Text color="gray.7">最新の専門書や研究資料が揃っています．静かなので一人で集中したい人に人気なスポットです．</Text>
          </div>
          
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
            <Title id="member">開発メンバー</Title>
            <Group mt="xs">
              {width > 700 && <Text weight="bolder">もっと見る</Text>}
              <ActionIcon target="_blank" component="a" variant="filled" color="dark.9" radius="lg" size="sm" aria-label="Settings" href="">
                <IconChevronRight style={{ width: '80%', height: '70%' }} stroke={3} />
              </ActionIcon>
            </Group>
          </Group>
          <Text mt={rem(50)}>九工大バーチャルキャンパスの開発は以下の学生で行いました．</Text>
          <Text>2023年度からは「メタプラス」という学生プロジェクトとして，「バーチャルGYMLABO」や「バーチャル戸畑キャンパス」等，様々なアプリケーションの開発を行っています．</Text>
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
      <Footer bg="dark" mt={rem(60)}>
        <Container py={rem(60)} >
          <Group position="center">
            <ThemeIcon radius="xl" size="lg" p="6px" variant="filled" color="dark.9">
              <Image src="./images/vkit.png"/>
            </ThemeIcon>
            <Text size="sm" color="gray.5">九工大バーチャルキャンパス</Text>
          </Group>
          <Group position='center' mt="md">
            <Text size="xs" color="gray.5" component="a" href="#top">Top</Text>
            <Text size="xs" color="gray.5" component="a" href="#campus_map">Campus Map</Text>
            <Text size="xs" color="gray.5" component="a" href="#member">開発メンバー</Text>
          </Group>
        </Container>
      </Footer>
    </>
  )
}


