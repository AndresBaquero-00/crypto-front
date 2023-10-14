import { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import { ListItem, Box, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface Props {
  route: string;
  text: string;
  icon: JSX.Element;
}

export const ItemSidebar: FC<Props> = ({ route, text, icon }) => {
  const router = useRouter();
  const active = useMemo(() => router.pathname === route, [route, router]);

  return (
    <ListItem>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: '10px',
        }}
      >
        <ListItemButton
          sx={{ borderRadius: '10px' }}
          onClick={() => router.push(route)}
        >
          <ListItemIcon sx={{ minWidth: '40px', color: active ? 'white': 'grey.600' }}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ color: active ? 'white': 'grey.600' }}/>
        </ListItemButton>
      </Box>
    </ListItem>
  )
}
