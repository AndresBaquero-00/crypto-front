import { Box, Typography } from '@mui/material';
import { FC } from 'react';

import { Sidebar } from '../components';

export const PageLayout: FC<{ children: JSX.Element[] }> = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100vw',
        display: 'flex',
        height: '100vh',
        maxHeight: '100vh'
      }}
    >
      <Sidebar />
      <Box sx={{ flex: 1 }}>
        <Box sx={{ width: '100%', height: '100px', padding: '30px 60px' }}>
          <Typography variant='h4' sx={{ fontWeight: 700 }}>CriptoApp</Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 'calc(100vh - 100px)',
            display: 'flex',
            alignItems: 'stretch',
            flexDirection: 'column',
            overflowY: 'scroll'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
