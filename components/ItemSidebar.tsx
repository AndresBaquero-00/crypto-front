import { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { animated, useTransition } from '@react-spring/web';

interface Props {
  route: string;
  text: string;
  icon: JSX.Element;
}

interface ISAProps {
  active: boolean;
  children: JSX.Element;
}

const ItemSidebarActive: FC<ISAProps> = ({ active, children }) => {
  const { palette } = useTheme();
  const transition = useTransition(active, {
    from: { 
      backgroundColor: 'rgba(0, 0, 0, 0)',
      color: grey[600]
    },
    enter: { 
      backgroundColor: active ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
      color: active ? palette.primary.contrastText : grey[600]
    },
    leave: { 
      backgroundColor: active ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
      color: active ? palette.primary.contrastText : grey[600]
    }
  });

  return transition((style, item) => (
    <animated.div style={{ width: '100%', ...style }}>
      {children}
    </animated.div>
  ));
}

export const ItemSidebar: FC<Props> = ({ route, text, icon }) => {
  const router = useRouter();
  const active = useMemo(() => router.pathname === route, [route, router]);

  return (
    <ListItem sx={{ padding: 0 }}>
      <ItemSidebarActive active={active}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: '20px',
          }}
        >
          <ListItemButton
            sx={{ padding: '15px 30px' }}
            onClick={() => router.push(route, undefined, { shallow: true })}
          >
            <ListItemIcon sx={{ minWidth: '40px', color: 'inherit' }}>
              {icon}
            </ListItemIcon>
            <ListItemText 
              primary={text}
              sx={{ color: 'inherit' }} 
            />
          </ListItemButton>
        </Box>
      </ItemSidebarActive>
    </ListItem>
  )
}
