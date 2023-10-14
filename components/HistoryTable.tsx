import { FC } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { InfoCard } from './InfoCard';
import { CipherData } from '../interfaces';

const columns = ['ID', 'Cipher', 'Raw', 'Encrypted'];

interface Props {
  data: CipherData[];
}

export const HistoryTable: FC<Props> = ({ data }) => {
  return (
    <Box
      sx={{
        width: '100%',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
        borderRadius: '10px',
        overflow: 'hidden'
      }}
    >
      <InfoCard
        color={{ bg: 'dark.main', t: 'white' }}
        value='Historial'
      />
      <Box>
        <TableContainer 
          sx={{ 
            width: '100%',
            height: '320px',
            maxHeight: '320px',
            overflowX: 'hidden' 
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column}
                    align='center'
                    sx={{ padding: '8px', fontWeight: 600 }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                [...data].reverse().map(data => (
                  <TableRow key={data.id}>
                    <TableCell
                      align='center'
                      sx={{ padding: '8px', border: 'none' }}
                    >
                      {data.id}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{ padding: '8px', border: 'none' }}
                    >
                      {data.cipher}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{ padding: '8px', border: 'none', wordBreak: 'break-word', minWidth: '300px' }}
                    >
                      {data.raw.slice(0, 200)}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{ padding: '8px', border: 'none', wordBreak: 'break-word', maxWidth: '800px' }}
                    >
                      {data.encrypted}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>

  )
}
