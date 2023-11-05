//@ts-nocheck
import React, {useState} from 'react'
import { Text, rem, Group, Tabs, Paper, Container, Timeline, Divider, Anchor, Alert } from '@mantine/core';
import { IconSettings, IconMessageCircle, IconMapPinFilled, IconBus, IconCircleChevronRight  } from '@tabler/icons-react';


export default function Access() {
  const [routes, setRoutes] = useState<number>(0);
  const routes_data = [
    {
      path: [{spot: "新飯塚駅", routes: "九工大バス", time:"約14分"}],
      map_link: "https://www.google.co.jp/maps/dir/%E6%96%B0%E9%A3%AF%E5%A1%9A%E9%A7%85%E3%80%81%E7%A6%8F%E5%B2%A1%E7%9C%8C%E9%A3%AF%E5%A1%9A%E5%B8%82/%E4%B9%9D%E5%B7%9E%E5%B7%A5%E6%A5%AD%E5%A4%A7%E5%AD%A6+%E9%A3%AF%E5%A1%9A%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%91%E3%82%B9%E3%80%81%E3%80%92820-0067+%E7%A6%8F%E5%B2%A1%E7%9C%8C%E9%A3%AF%E5%A1%9A%E5%B8%82%E5%B7%9D%E6%B4%A5%EF%BC%96%EF%BC%98%EF%BC%90%E2%88%92%EF%BC%94/@33.6458052,130.6765359,15.5z/data=!3m1!5s0x35417fd3804f0e19:0x41e70745beb25652!4m14!4m13!1m5!1m1!1s0x35417e223d5acefd:0x1e7ce289edbdd981!2m2!1d130.694269!2d33.644262!1m5!1m1!1s0x35417fd47fedfba3:0xf99288c58bd3c0e9!2m2!1d130.6726693!2d33.653526!3e3?hl=ja&entry=ttu",
    },{
      path: [
        {spot: "西鉄天神高速バスターミナル", routes: "西鉄バス", time:"約60分"},
        {spot: "飯塚バスターミナル", routes: "九工大バス (または西鉄バス)", time:"約19分"},
      ],
      map_link: "https://www.google.co.jp/maps/dir/%E8%A5%BF%E9%89%84%E5%A4%A9%E7%A5%9E%E9%AB%98%E9%80%9F%E3%83%90%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%9F%E3%83%8A%E3%83%AB%E3%80%81%E3%80%92810-0001+%E7%A6%8F%E5%B2%A1%E7%9C%8C%E7%A6%8F%E5%B2%A1%E5%B8%82%E4%B8%AD%E5%A4%AE%E5%8C%BA%E5%A4%A9%E7%A5%9E%EF%BC%92%E4%B8%81%E7%9B%AE%EF%BC%91%E2%88%92%EF%BC%91/%E4%B9%9D%E5%B7%9E%E5%B7%A5%E6%A5%AD%E5%A4%A7%E5%AD%A6+%E9%A3%AF%E5%A1%9A%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%91%E3%82%B9%E3%80%81%E3%80%92820-0067+%E7%A6%8F%E5%B2%A1%E7%9C%8C%E9%A3%AF%E5%A1%9A%E5%B8%82%E5%B7%9D%E6%B4%A5%EF%BC%96%EF%BC%98%EF%BC%90%E2%88%92%EF%BC%94/@33.6213091,130.4640935,12z/data=!3m2!4b1!5s0x35417fd3804f0e19:0x41e70745beb25652!4m14!4m13!1m5!1m1!1s0x3541918febfa6201:0xb196904809e34e5!2m2!1d130.39984!2d33.589226!1m5!1m1!1s0x35417fd47fedfba3:0xf99288c58bd3c0e9!2m2!1d130.6726693!2d33.653526!3e3?hl=ja&entry=ttu",
    }
  ]

  
  return (
    <>
    <Container size="xs"  px="xl"  pb={rem(100)}>
      <Paper>
      <Tabs variant="pills" defaultValue="iiduka" p="xs">
        <Tabs.List grow>
          <Tabs.Tab
            value="iiduka"
            onClick={()=>setRoutes(0)}
          >
            <Text weight="bold">新飯塚駅から</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value="tenjin"
            onClick={()=>setRoutes(1)}
          >
            <Text weight="bold">天神から</Text>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Group p="xl" mt="md" >
        
        <Timeline active={routes_data[routes].path.length} bulletSize={20} ml="md" lineWidth={2}>
          {routes_data[routes].path.map((item, index) => 
            <Timeline.Item title={item.spot} key={index}>
              <Alert color="gray.7" my="xl" variant="light"  title={item.routes} icon={<IconBus />}>
                <Text c="dimmed" size="xs">{item.time}</Text>
              </Alert>
            </Timeline.Item>
          )}
          <Timeline.Item bullet={<IconMapPinFilled size={12} />} title="九工大飯塚キャンパス"/>
        </Timeline>
      </Group>
      <Anchor color="dimmed" href={routes_data[routes].map_link} target="_blank">
        <Group position='right'pb="lg" pr="xl"><Text  c="dimmed" size="xs"><IconMapPinFilled size={12} style={{paddingTop:"1px", marginRight:"4px"}}/>Google Mapで確認</Text></Group>
      </Anchor>
      </Paper>
    </Container>
    </>
  )
}
