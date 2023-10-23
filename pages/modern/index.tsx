import { useContext, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Chip, Paper, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { AlgorithmSelector, HistoryTable } from '../../components';
import { ToastContext } from '../../context';
import { modernAlgorithms } from '../../data';
import { Algorithm, CipherData } from '../../interfaces';
import { PageLayout } from '../../layouts';
import { getCipherData } from '../../utils';

interface IFormValues {
	text: string;
	cipher: string;
	file?: FileList;
}

const ModernPage: NextPage = () => {
	const [history, setHistory] = useState<CipherData[]>([]);
	const { setToastOptions } = useContext(ToastContext);
	const { handleSubmit, register, setValue, watch } = useForm<IFormValues>({
		defaultValues: { cipher: modernAlgorithms.at(0)?.algorithm }
	});

	const onSubmit: SubmitHandler<IFormValues> = async (formValues, e) => {
		const { nativeEvent: { submitter } } = e as any;
		const algorithm = modernAlgorithms.find(algorithm => algorithm.algorithm === formValues.cipher);
		try {
			const data = await getCipherData(algorithm as Algorithm, formValues.file?.item(0) ?? formValues.text, submitter.name);
			setHistory([...history, data]);
		} catch (e) {
			setToastOptions({ show: true, message: 'Error al encriptar.', color: 'error' });
		}
	};

	return (
		<PageLayout>
			<Box
				sx={{
					width: '100%',
					padding: '20px',
					display: 'flex',
					alignItems: 'flex-start',
					gap: '10px'
				}}
			>
				<Paper
					elevation={1}
					sx={{
						width: '80%',
						maxWidth: '400px',
						padding: '20px'
					}}
				>
					<form onSubmit={handleSubmit(onSubmit)}>
						<AlgorithmSelector
							algorithms={modernAlgorithms}
							onChange={(value) => setValue('cipher', value)}
						/>
						<TextField
							fullWidth
							autoComplete='off'
							label='Cadena'
							variant='outlined'
							{...register('text', { required: false })}
							sx={{ marginTop: '20px' }}
						/>
						<Box>
							<Button
								component='label'
								disableRipple
								sx={{
									width: '100%',
									height: '150px',
									backgroundColor: grey[100],
									marginTop: '20px',
									borderRadius: '10px',
									border: `1px dashed ${grey[500]}`,
									cursor: 'pointer',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									position: 'relative',
									'&, & > *': { transition: 'all .2s ease' },
									'&:hover': {
										backgroundColor: grey[50],
										'& > *': { transform: 'scale(1.2)' }
									}
								}}
							>
								<Image
									src='/folder.svg'
									alt='folder-image'
									width={100}
									height={100}
								/>
								<Typography sx={{ fontSize: '0.85em' }}>
									Seleccionar Archivos
								</Typography>
								<input
									type='file'
									{...register('file', { required: false })}
									style={{
										clip: 'rect(0 0 0 0)',
										clipPath: 'inset(50%)',
										height: 1,
										overflow: 'hidden',
										position: 'absolute',
										bottom: 0,
										left: 0,
										whiteSpace: 'nowrap',
										width: 1,
									}}
								/>
							</Button>
							{
								watch().file && watch().file?.length !== 0 && (
									<Box sx={{ marginTop: '10px', display: 'flex' }}>
										<Chip 
											variant='outlined'
											label={watch().file?.item(0)?.name.slice(0, 20)}
											onDelete={() => setValue('file', undefined)}
										/>
									</Box>
								)
							}
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
							<Button
								variant='contained'
								type='submit'
								name='encrypt'
							>
								Encriptar
							</Button>
							<Button
								variant='contained'
								type='submit'
								name='decrypt'
							>
								Desencriptar
							</Button>
						</Box>
					</form>
				</Paper>
				<HistoryTable data={history} />
			</Box>
		</PageLayout>
	)
}

export default ModernPage;