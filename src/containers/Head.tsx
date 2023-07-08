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
  Popover,
  rem,
  Avatar,
  useMantineTheme,
  Tabs,
  px,
  createStyles,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { 
  IconInfoCircle,
  IconHandClick,
  IconUsers,
  IconMenu2
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({

  smartphone: {
    borderRadius: "600px",
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    [theme.fn.largerThan('sm')]: {
      paddingRight: theme.spacing.xl
    },
    [theme.fn.smallerThan('sm')]: {
      paddingRight: "0px"
    },
  },

  pc: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

const Head: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const theme = useMantineTheme();
  const [modalType, setModalType] = useState('none');
  const { classes, cx } = useStyles();

  return (
    <>
      <Header 
        height={60} 
        pt="lg"
        className={classes.header}
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
        <Group position="right">
        <Tabs
          color="#422612"
          unstyled
          styles={(theme) => ({
            tab: {
              ...theme.fn.focusStyles(),
              backgroundColor: theme.white,
              border: "2px solid #422612",
              padding: `${theme.spacing.md} ${theme.spacing.md}`,
              cursor: 'pointer',
              fontSize: theme.fontSizes.sm,
              display: 'flex',
              alignItems: 'center',
    
              '&:disabled': {
                opacity: 0.5,
                cursor: 'not-allowed',
              },
    
              '&:not(:first-of-type)': {
                borderLeft: 0,
              },

              '&:not(:last-of-type)': {
                borderRight: 0,
              },

    
              '&:first-of-type': {
                borderTopLeftRadius: "600px",
                borderBottomLeftRadius: "600px",
                borderRight: 0,
                paddingLeft: `${px(theme.spacing.xl)*1.5}px`,
              },
    
              '&:last-of-type': {
                borderTopRightRadius: "600px",
                borderBottomRightRadius: "600px",
                paddingRight: `${px(theme.spacing.xl)*1.5}px`,

              },
    
              '&:not([data-disabled])': theme.fn.hover({
                textDecoration: "underline 2px solid #422612",
                textUnderlineOffset: "0.4em",
              }),
            },
            tabsList: {
              display: 'flex',
            },
          })}
        >
          <Tabs.List className={classes.pc}>
          <Tabs.Tab value="操作方法" onClick={()=>{setModalType('操作方法');  open();}}>
            <Text color="#422612" fw={600}>操作方法</Text>
          </Tabs.Tab>
          <Tabs.Tab value="開発者" onClick={()=>{setModalType('開発者');  open();}} >
            <Text color="#422612" fw={600}>開発者</Text>
          </Tabs.Tab>
          
          <Tabs.Tab value="MDASHプログラム"  onClick={()=> {window.open("https://www.kyutech.ac.jp/campuslife/mdash.html");}}>
            <Text color="#422612" fw={600}>MDASHプログラム</Text>
          </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Popover position="bottom" withArrow 
          styles={(theme) => ({
            arrow: {
              border: "2px solid #422612",
            },
            dropdown: {
              border: "2px solid #422612",
            },
          })}
        >
          
            <Tabs
              className={classes.smartphone}
              unstyled
              color="#422612"
              styles={(theme) => ({
                tab: {
                  ...theme.fn.focusStyles(),
                  color: "#422612",
                  border: "2px solid #422612",
                  backgroundColor: theme.white,
                  padding: `${theme.spacing.md} ${theme.spacing.md}`,
                  cursor: 'pointer',
                  fontSize: theme.fontSizes.sm,
                  display: 'flex',
                  alignItems: 'center',
        
                  '&:first-of-type': {
                    borderTopLeftRadius: "600px",
                    borderBottomLeftRadius: "600px",
                    borderRight: 0,
                    paddingLeft: `${px(theme.spacing.xl)*1.3}px`,
                  },
                },
                
                tabsList: {
                  display: 'flex',
                },
              })}
            >
              <Tabs.List>
                <Popover.Target>
                  <Tabs.Tab value="メニュー" icon={<IconMenu2 size="1.5em" color="#422612" style={{paddingTop: "0.3em"}}/>}>
                    <Text color="#422612" fw={600} >Menu</Text>
                  </Tabs.Tab>
                </Popover.Target>
              </Tabs.List>
            </Tabs>
          

          <Popover.Dropdown p="0">
            <Tabs
              color="#422612"
              orientation="vertical"
              w={"100%"}
              styles={(theme) => ({
                tab: {
                  ...theme.fn.focusStyles(),
                  backgroundColor: theme.white,
                  padding: `${theme.spacing.md} ${theme.spacing.md}`,
                  cursor: 'pointer',
                  fontSize: theme.fontSizes.sm,
                },
              })}
              
            >
            <Tabs.List color="#422612">
              <Tabs.Tab value="操作方法" onClick={()=>{setModalType('操作方法');  open();}}>
                <Text color="#422612" fw={600}>操作方法</Text>
              </Tabs.Tab>
              <Tabs.Tab value="開発者" onClick={()=>{setModalType('開発者');  open();}} >
                <Text color="#422612" fw={600}>開発者</Text>
              </Tabs.Tab>
              
              <Tabs.Tab value="MDASHプログラム"  onClick={()=> {window.open("https://www.kyutech.ac.jp/campuslife/mdash.html");}}>
                <Text color="#422612" fw={600}>MDASHプログラム</Text>
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          </Popover.Dropdown>
        </Popover>
        
        </Group>
      </Header>
      <Modal
        size="md"
        centered
        opened={opened}
        onClose={()=> {close(); }}
        title={modalType}
        scrollAreaComponent={ScrollArea.Autosize}
        styles={(theme) => ({
          content: {
            backgroundColor: theme.white,
            border: "2px solid #422612",
            fontSize: theme.fontSizes.sm,
            borderRadius: "15px"
          },
          title: {
            color: "#422612",
            fontWeight: "bold"
          }
        })}
      >
        {modalType === "操作方法" &&
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
        }
        {modalType === "開発者" &&
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