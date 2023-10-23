import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { Sidebar } from '../components';

export const PageLayout: FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box 
        sx={{ 
          flex: 1,
          height: '100vh',
          maxHeight: '100vh',
          overflowY: 'auto'
        }}
      >
        <Box 
          sx={{ 
            width: '100%',
            height: '100px',
            padding: '30px 60px',
            position: 'sticky',
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 999,
            top: 0
          }}
        >
          <Typography variant='h4' sx={{ fontWeight: 400 }}>
            CriptoApp
          </Typography>
        </Box>
        <Box sx={{ width: '100%', padding: '5px' }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
