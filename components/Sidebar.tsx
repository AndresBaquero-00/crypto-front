import { FC } from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { AcUnitRounded, GradeRounded, TimelineRounded } from '@mui/icons-material';

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
  },
  {
    route: '/statistics',
    text: 'Estadísticas',
    icon: <TimelineRounded />
  }
]

export const Sidebar: FC = () => {
  return (
    <Box sx={{ 
      width: '20%',
      minWidth: '250px',
      maxWidth: '400px',
      backgroundColor: 'primary.main',
      height: '100vh'
    }}>
      <Box 
        sx={{ 
          width: '100%',
          padding: '60px 30px 20px',
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
        <Typography sx={{ color: 'white', fontSize: '1em' }}>
          CriptoApp
        </Typography>
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        {routes.map(route => (<ItemSidebar key={route.route} {...route}/>))}
      </Box>
    </Box>
  )
}
