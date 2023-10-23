import { FC } from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  type: 'good' | 'warning' | 'danger';
  statistic: number;
  label: string;
}

export const StatisticCard: FC<Props> = ({ type, statistic, label }) => {
  return (
    <Box
      sx={{
        width: '170px',
        height: '170px',
        backgroundColor: `status.${type}.main`,
        color: `status.${type}.contrastText`,
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px'
      }}
    >
      <Typography sx={{ fontSize: '2.2em', fontWeight: 600 }}>
        {statistic.toFixed(2)}
      </Typography>
      <Typography sx={{ fontSize: '0.9em' }}>
        {label}
      </Typography>
    </Box>
  )
}
