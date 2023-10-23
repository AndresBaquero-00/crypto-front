import { FC, useState } from 'react';
import Image from 'next/image';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';

import { Algorithm } from '../interfaces';

interface Props {
  algorithms: Algorithm[];
  onChange: (value: string) => void;
}

export const AlgorithmSelector: FC<Props> = ({ algorithms, onChange }) => {
  const [value, setValue] = useState<string>(algorithms.at(0)?.algorithm as string);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ marginBottom: '10px', fontWeight: 500 }}>
        Algoritmo
      </Typography>
      <FormControl fullWidth>
        <Select
          value={value}
          onChange={(e) => { setValue(e.target.value); onChange(e.target.value); }}
          sx={{
            '& .MuiSelect-select': {
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }
          }}
        >
          {
            algorithms.map(a => (
              <MenuItem key={a.algorithm} value={a.algorithm} sx={{ display: 'flex', gap: '10px' }}>
                <Image
                  src={`/assets/${a.img}`}
                  alt='algoritmo-logo'
                  width={20}
                  height={20}
                />
                {a.name}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  )
}
