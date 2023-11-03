import React from 'react'
import { Text, rem, Alert, Flex, Container, Title, Button, Avatar, Box } from '@mantine/core';
import { IconAlertTriangle  } from '@tabler/icons-react';


const validation_data = [
  {
    title: "通常ワールド",
    color: "#FA5252",
    alert: "このワールドは只今準備中です．公開までしばらくお待ちください．",
    link: ""
  },{
    title: "MDASHワールド (軽量版)",
    color: "#FCC419",
    alert: "このワールドは只今準備中です．公開までしばらくお待ちください．",
    link: ""
  },{
    title: "MDASHワールド (3Dキャラクター版)",
    color: "#FCC419",
    alert: "このワールドはデバイスの性能が不十分だと動作がカクカクする場合があります．スマートフォン等でアクセスする場合はライト版をご利用ください．",
    link: "./Mdash_3d"
  }
]

export default function Validation({type, close}: any) {
  return (
    <Container size="xs">
      <Flex
        mt="20vh"
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Avatar src="./images/ufo.png" bg={validation_data[type].color}  size={rem(100)} mb="md" radius={rem(1000)} p="xl" />
        <Title order={1} weight="bold" color="black" style={{	opacity: 0.95}} mb="xl">{validation_data[type].title}</Title>
        {validation_data[type].alert !== "" && 
          <Alert title="注意" w="100%" icon={<IconAlertTriangle />} mb="xl" variant='default'>
            <Text>{validation_data[type].alert}</Text>
          </Alert>
        }
        {validation_data[type].alert === "" && <Box h={rem(100)}/>}
            <Button 
              mt="xl"
              variant='filled' fullWidth color="dark.9" size="lg" 
              disabled={validation_data[type].link === "" && true} component="a"
              href={validation_data[type].link}>ワールドに入る</Button>
            <Button variant='filled' fullWidth color="gray.2" size="lg"  onClick={close}><Text color="black">戻る</Text></Button>
        </Flex>
    </Container>
  )
}
