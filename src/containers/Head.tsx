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
  Text
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { 
  IconInfoSmall 
} from '@tabler/icons-react';

const Head: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  return (
    <>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
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
            <ActionIcon size="sm" radius="xl" variant="outline" onClick={open}>
              <IconInfoSmall size="1.725rem" />
            </ActionIcon>
            </Group>
      </Header>
      <Modal
        centered
        opened={opened}
        onClose={close}
        title="操作方法"
        scrollAreaComponent={ScrollArea.Autosize}
      >
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
      </Modal>

    </MantineProvider>
    </>
  )
}

export default Head