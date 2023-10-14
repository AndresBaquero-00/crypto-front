import { FC } from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  color: {bg: string; t: string};
  value: string | number;
  label?: string;
}

'primary.main'
'Tiempo Máximo'
'65ms'

export const InfoCard: FC<Props> = ({ color, label, value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: color.bg,
        padding: '25px 20px',
        borderRadius: '10px'
      }}
    >
      {
        label && (
          <Typography
            component='p'
            sx={{color: color.t}}
          >
            {label}
          </Typography>
        )
      }
      <Typography
        component='p'
        sx={{
          fontWeight: 500,
          fontSize: '1.5em',
          color: color.t
        }}
      >
        {value}
      </Typography>
    </Box>
  )
}
