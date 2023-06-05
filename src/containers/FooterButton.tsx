import { FC, useState } from 'react'
import FooterButtonProps from '@/types/interfaces/FooterButtonProps'
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
  Button,
  Center,
  px,
  rem
} from '@mantine/core';

import { 
  useDisclosure,
  useViewportSize,
} from '@mantine/hooks';
import { 
  IconInfoSmall 
} from '@tabler/icons-react';

const FooterButton: FC<FooterButtonProps> = ({opened, close}) => {
  const { height, width } = useViewportSize();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  
  return (
    <>
      {/* @ts-ignore */}
      {opened && 
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <Center
            style={{
              marginTop: height - 1.3 * px(rem(50)),
                height: rem(50),
                width: "100vw",
                marginLeft: "auto", 
                marginRight: "auto", 
                position: 'absolute',
                zIndex: 10,
            }}>
            <Container size="xs"
            style={{
              width: "100%",
              position: 'relative',
            }}>
              <Group 
                grow 
                style={{
                  position: 'relative',
                }}
              >
                <Button variant="filled" onClick={close}>またあとで</Button>
              </Group>
            </Container>
            
          </Center>
          
      </MantineProvider>
    }
    </>
  )
}

export default FooterButton