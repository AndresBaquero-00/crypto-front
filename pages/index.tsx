import { useContext, useState } from 'react';
import { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Paper, TextField } from '@mui/material';

import { AlgorithmSelector, HistoryTable } from '../components';
import { classicalAlgorithms } from '../data';
import { Algorithm, CipherData } from '../interfaces';
import { PageLayout } from '../layouts';
import { getCipherData } from '../utils';
import { ToastContext } from '../context';

interface IFormValues {
	text: string;
	cipher: string;
}

const ClassicalPage: NextPage = () => {
	const [history, setHistory] = useState<CipherData[]>([]);
	const { setToastOptions } = useContext(ToastContext);
	const { register, setValue, handleSubmit } = useForm<IFormValues>({
		defaultValues: { cipher: classicalAlgorithms.at(0)?.algorithm }
	});

	const onSubmit: SubmitHandler<IFormValues> = async (formValues, e) => {
		const { nativeEvent: { submitter } } = e as any;
		const algorithm = classicalAlgorithms.find(algorithm => algorithm.algorithm === formValues.cipher);
		try {
			const data = await getCipherData(algorithm as Algorithm, formValues.text, submitter.name);
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
							algorithms={classicalAlgorithms}
							onChange={(value) => setValue('cipher', value)}
						/>
						<TextField
							fullWidth
							autoComplete='off'
							label='Cadena'
							variant='outlined'
							{...register('text', { required: true })}
							sx={{ marginTop: '20px' }}
						/>
						<Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
							<Button
								variant='contained'
								type='submit'
								name='encrypt'
								sx={{ marginTop: '20px' }}
							>
								Encriptar
							</Button>
							<Button
								variant='contained'
								type='submit'
								name='decrypt'
								sx={{ marginTop: '20px' }}
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

export default ClassicalPage;