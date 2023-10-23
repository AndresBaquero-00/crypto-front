import { FC, useContext } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { grey, blueGrey } from '@mui/material/colors';

import { AlgorithmChip } from './AlgorithmChip';
import { CipherData } from '../interfaces';
import { ToastContext } from '../context';

const columns = ['Cipher', 'Raw', 'Encrypted', 'Time'];

interface Props {
  data: CipherData[];
}

export const HistoryTable: FC<Props> = ({ data }) => {
  const { setToastOptions } = useContext(ToastContext);

  return (
    <Paper elevation={1} sx={{ flex: 1 }}>
      <Typography sx={{ padding: '20px', fontSize: '1.2em', fontWeight: 600 }}>
        Historial
      </Typography>
      {
        data.length === 0 ? (
          <Typography sx={{ padding: '20px', fontSize: '0.8em', textAlign: 'center' }}>
            No hay datos registrados.
          </Typography>
        ) : (
          <TableContainer
            sx={{
              width: '100%',
              maxHeight: '400px',
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
                      sx={{ padding: '8px', fontWeight: 600, backgroundColor: grey[200], color: blueGrey[400] }}
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
                        <AlgorithmChip algorithm={data.algorithm} />
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ padding: '8px', border: 'none', wordBreak: 'break-word', maxWidth: '100px' }}
                      >
                        {
                          data.raw.length > 60 ? (
                            data.raw.slice(0, 50).concat('...')
                          ) : (data.raw)
                        }
                      </TableCell>
                      <TableCell
                        align='center'
                        onClick={() => {
                          navigator.clipboard.writeText(data.encoded)
                            .then(() => {
                              setToastOptions({ show: true, message: 'Texto copiado al portapapeles.', color: 'info' })
                            }).catch(err => {
                              setToastOptions({ show: true, message: 'Error al copiar texto.', color: 'error' })
                            })
                        }}
                        sx={{
                          padding: '8px',
                          border: 'none',
                          wordBreak: 'break-word',
                          maxWidth: '100px',
                          cursor: 'pointer',
                          userSelect: 'none'
                        }}
                      >
                        {
                          data.encoded.length > 60 ? (
                            data.encoded.slice(0, 50).concat('...')
                          ) : (data.encoded)
                        }
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ padding: '8px', border: 'none', wordBreak: 'break-word' }}
                      >
                        {data.time}ms
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
    </Paper>
  )
}
