import { FC } from 'react';
import { Box } from '@mui/material';

import { ClassicalAlgorithms, ModernAlgorithms } from '../enums';
import { Algorithm } from '../interfaces';

interface Props {
  algorithm: Algorithm;
}

const backgroundColor = {
  [ClassicalAlgorithms.Caesar]: '#90CAF9',
  [ClassicalAlgorithms.Polybius]: '#9FA8DA',
  [ClassicalAlgorithms.Playfair]: '#80CBC4',
  [ModernAlgorithms.DES3]: '#C5E1A5',
  [ModernAlgorithms.AES]: '#CE93D8',
  [ModernAlgorithms.RSA]: '#F48FB1',
  [ModernAlgorithms.EC]: '#BCAAA4',
}

const textColor = {
  [ClassicalAlgorithms.Caesar]: '#0D47A1',
  [ClassicalAlgorithms.Polybius]: '#1A237E',
  [ClassicalAlgorithms.Playfair]: '#004D40',
  [ModernAlgorithms.DES3]: '#33691E',
  [ModernAlgorithms.AES]: '#4A148C',
  [ModernAlgorithms.RSA]: '#880E4F',
  [ModernAlgorithms.EC]: '#3E2723',
}

export const AlgorithmChip: FC<Props> = ({ algorithm }) => {
  return (
    <Box sx={{ width: 'fit-content', margin: '0 auto' }}>
      <Box
        sx={{
          padding: '5px',
          borderRadius: '5px',
          textTransform: 'capitalize',
          fontWeight: '700',
          fontSize: '12px',
          backgroundColor: backgroundColor[algorithm.algorithm],
          color: textColor[algorithm.algorithm],
        }}
      >
        {algorithm.name}
      </Box>
    </Box>
  );
};
