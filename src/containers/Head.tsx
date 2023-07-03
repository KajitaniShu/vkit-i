import { FC, useState } from 'react'
import { 
  MantineProvider, 
  ColorSchemeProvider, 
  ColorScheme, 
  Header,
  Container,
  Group,
  Title,
  Modal,
  ActionIcon,
  ScrollArea,
  Table,
  Text,
  Menu,
  rem,
  Avatar,
  useMantineTheme
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { 
  IconInfoSmall,
  IconHandClick,
  IconUsers
} from '@tabler/icons-react';

const Head: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const theme = useMantineTheme();
  const [modalType, setModalType] = useState('none');

  return (
    <>
      <Header 
        height={50} 
        px="md" 
        style={{
          position: 'absolute',
          top: 0,
          width: '100vw',
          height: '100vh',
          zIndex: '10',
          backgroundColor:'transparent',
          borderBottom: 0
        }}
      >
        <Group position="right" noWrap pt="sm">
        <Menu width={150} shadow="md" position="left-start">
          <Menu.Target>
              <ActionIcon size="sm" radius="xl" variant="light">
                <IconInfoSmall size="1.725rem" />
              </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {open(); setModalType('operation');}}
              icon={<IconHandClick color={theme.colors.blue[6]} size={rem(14)} />}
            >
              <Text size="xs" weight={700}  color="dimmed" >操作方法</Text>
            </Menu.Item>

            <Menu.Item
              onClick={() => {open(); setModalType('developer');}}
              icon={<IconUsers size={rem(14)} color={theme.colors.violet[6]} />}
            >
              <Text size="xs" weight={700}  color="dimmed">開発者</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        </Group>
      </Header>
      <Modal
        size="md"
        centered
        opened={opened}
        onClose={()=> {close(); }}
        title={modalType === "operation" ? "操作方法" : "開発者"}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        {modalType === "operation" ?
        <Table highlightOnHover withColumnBorders withBorder>
          <thead>
            <tr>
              <th><Text size="sm">動作</Text></th>
              <th><Text size="sm">タッチで操作</Text></th>
              <th><Text size="sm">マウスで操作</Text></th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>移動</td>
            <td>移動したい場所をタッチ</td>
            <td>移動したい場所を左クリック</td>
          </tr>
          <tr>
            <td>カメラの回転</td>
            <td>二本指でタッチし，左右に動かす</td>
            <td>右クリックでドラッグしながら左右に動かす</td>
          </tr>
          <tr>
            <td>カメラの距離を変更</td>
            <td>二本指でピンチイン・ピンチアウト</td>
            <td>マウスホイールを回転させる</td>
          </tr>
          </tbody>
          
          </Table>
          
        :
        <>
        <Table highlightOnHover withColumnBorders>
          <tr>
            <td>
              <Group spacing="sm" >
                <Avatar size={40} src={"./avatars/1.png"} radius={40} />
                <div>
                  <Text fz="sm" fw={500}>梶谷 柊</Text>
                  <Text fz="xs" c="dimmed">情報創成工学専攻 M2 (物理情報工学科)</Text>
                </div>
              </Group>
            </td>
          </tr>
          <tr>
            <td>
              <Group spacing="sm">
                <Avatar size={40} src={"./avatars/2.png"} radius={40} />
                <div>
                  <Text fz="sm" fw={500}>冨岡 莉生</Text>
                  <Text fz="xs" c="dimmed">情報創成工学専攻 D1 (システム創成情報工学科)</Text>
                </div>
              </Group>
            </td>
          </tr>
          <tr>
            <td>
              <Group spacing="sm">
                <Avatar size={40} src={"./avatars/3.png"} radius={40} />
                <div>
                  <Text fz="sm" fw={500}>井上 快斗</Text>
                  <Text fz="xs" c="dimmed">情報創成工学専攻 M1 (物理情報工学科)</Text>
                </div>
              </Group>
            </td>
          </tr>
          <tr>
            <td>
              <Group spacing="sm">
                <Avatar size={40} src={"./avatars/4.png"} radius={40} />
                <div>
                  <Text fz="sm" fw={500}>高津 太一</Text>
                  <Text fz="xs" c="dimmed">情報創成工学専攻 M1 (物理情報工学科)</Text>
                </div>
              </Group>
            </td>
          </tr>
          <tr>
            <td>
              <Group spacing="sm">
                <Avatar size={40} src={"./avatars/5.png"} radius={40} />
                <div>
                  <Text fz="sm" fw={500}>根崎 翔</Text>
                  <Text fz="xs" c="dimmed">情報創成工学専攻 M1 (物理情報工学科)</Text>
                </div>
              </Group>
            </td>
          </tr>
          <tr>
            <td>
              <Group spacing="sm">
                <Avatar size={40} src={"./avatars/6.png"} radius={40} />
                <div>
                  <Text fz="sm" fw={500}>南 歩希</Text>
                  <Text fz="xs" c="dimmed">工学部 応用化学科 B4</Text>
                </div>
              </Group>
            </td>
          </tr>
          <tr>
            <td>
              <Group spacing="sm">
                <Avatar size={40} src={"./avatars/7.png"} radius={40} />
                <div>
                  <Text fz="sm" fw={500}>糸園 朔</Text>
                  <Text fz="xs" c="dimmed"></Text>
                </div>
              </Group>
            </td>
          </tr>
          </Table>
          
        <Text mt="md" size="xs" color="dimmed">所属は2023年時点のもの．カッコ内は学部生の時の所属学科．</Text>
        </>
        }
      </Modal>
    </>
  )
}

export default Head