import { FC } from 'react';
import Image from 'next/image';
import { AcUnitRounded, GradeRounded } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import { ItemSidebar } from './ItemSidebar';

const routes = [
  {
    route: '/',
    text: 'Clásicos',
    icon: <AcUnitRounded />
  },
  {
    route: '/modern',
    text: 'Modernos',
    icon: <GradeRounded />
  }
]

export const Sidebar: FC = () => {
  return (
    <Box sx={{ width: '250px', backgroundColor: 'dark.main' }}>
      <Box 
        sx={{ 
          width: '100%',
          padding: '40px 30px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <Image
          src={'/assets/crypto.png'}
          alt='Icono'
          width={60}
          height={60}
        />
        <Typography sx={{ color: 'white', fontSize: '1em' }}>CriptoApp</Typography>
      </Box>
      <Box sx={{ marginTop: '10px', padding: '0 10px 0' }}>
        {routes.map(route => (<ItemSidebar key={route.route} {...route}/>))}
      </Box>
    </Box>
  )
}
