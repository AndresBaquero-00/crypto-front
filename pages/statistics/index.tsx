import React, { useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import { AcUnitRounded, GradeRounded } from '@mui/icons-material';

import { BehaviorChart, StatisticCard } from '../../components';
import { classicalAlgorithms, modernAlgorithms, raws } from '../../data';
import { PageLayout } from '../../layouts';
import { CipherData } from '../../interfaces';
import { fetchCipherData } from '../../utils';

interface Props {
  classical: CipherData[];
  modern: CipherData[];
}

const StatisticsPage: NextPage<Props> = ({ classical, modern }) => {
  const [algorithmType, setAlgorithmType] = useState('classical');
  const [data, setData] = useState(classical);

  return (
    <PageLayout>
      <Box>
        <BottomNavigation
          value={algorithmType}
          onChange={(e, newValue) => {
            setAlgorithmType(newValue);
            setData(newValue === 'classical' ? classical : modern);
          }}
          sx={{ width: '100%' }}
        >
          <BottomNavigationAction
            label='Classical'
            value='classical'
            icon={<AcUnitRounded />}
            sx={{ position: 'relative', zIndex: 1 }}
          />
          <BottomNavigationAction
            label='Modern'
            value='modern'
            icon={<GradeRounded />}
            sx={{ position: 'relative', zIndex: 1 }}
          />
        </BottomNavigation>
      </Box>
      <Box
        sx={{
          width: '100%',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '10px',
          marginTop: '20px'
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <StatisticCard
            type='good'
            statistic={Math.min(...data.map(e => (e.time ?? 0)))}
            label='Tiempo Mínimo (ms)'
          />
          <StatisticCard
            type='warning'
            statistic={data.map(e => e.time).reduce((a, b) => a + b, 0) / data.length}
            label='Tiempo Promedio (ms)'
          />
          <StatisticCard
            type='danger'
            statistic={Math.max(...data.map(e => (e.time ?? 0)))}
            label='Tiempo Máximo (ms)'
          />
        </Box>
        <Paper sx={{ width: '100%', padding: '20px' }}>
          <BehaviorChart data={data} />
        </Paper>
      </Box>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const classical = await fetchCipherData(classicalAlgorithms, raws);
  const modern = await fetchCipherData(modernAlgorithms, raws);
  return { 
    props: { classical, modern },
  };
}

export default StatisticsPage;