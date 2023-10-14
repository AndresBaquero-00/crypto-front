import { useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography, styled } from '@mui/material';
import { ArrowForwardIosRounded, CloudUploadRounded } from '@mui/icons-material';

import { BehaviorChart, HistoryTable, InfoCard } from '../../components';
import { modernAlghoritms, raws } from '../../data';
import { ModernAlghoritms } from '../../enums';
import { CipherData } from '../../interfaces';
import { PageLayout } from '../../layouts';
import fetchCipherData from '../../utils';

interface IFormValues {
	raw?: string;
	file?: FileList;
	cipher: ModernAlghoritms;
}

interface Props {
	cipherData: CipherData[];
}

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

const ModernPage: NextPage<Props> = ({ cipherData }) => {
	const { register, watch, handleSubmit } = useForm<IFormValues>();
	const [data, setData] = useState(cipherData);

	const onSubmit: SubmitHandler<IFormValues> = (formValues) => {
		if (formValues.raw) {
			fetchCipherData([formValues.cipher], [formValues.raw])
				.then(d => setData([...data, ...d]));
		}

		formValues.file?.item(0)?.text().then((file => {
			fetchCipherData([formValues.cipher], [file])
				.then(d => setData([...data, ...d]));
		}));
	};

	return (
		<PageLayout>
			<Box
				sx={{
					padding: '10px 30px',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					gap: '30px'
				}}
			>
				<InfoCard
					color={{ bg: 'status.good', t: 'white' }}
					label='Tiempo Mínimo'
					value={`${Math.min(...data.map(d => (d.time ?? 0)))}ms`} />
				<InfoCard
					color={{ bg: 'secondary.main', t: 'black' }}
					label='Tiempo Promedio'
					value={`${((data.map(d => (d.time ?? 0)).reduce((a,b) => a + b, 0)) / data.length).toFixed(2)}ms`}
				/>
				<InfoCard
					color={{ bg: 'status.danger', t: 'white' }}
					label='Tiempo Máximo'
					value={`${Math.max(...data.map(d => (d.time ?? 0)))}ms`}
				/>
			</Box>
			<Box
				sx={{
					padding: '10px 30px',
					width: '100%',
				}}
			>
				<BehaviorChart data={data} />
			</Box>
			<Box sx={{ padding: '10px 30px', width: '100%' }}>
				<Typography variant='h5' sx={{ fontWeight: 600 }}>
					Encriptar
				</Typography>
				<form
					onSubmit={handleSubmit(onSubmit)}
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '30px',
						marginTop: '20px'
					}}
				>
					<Box
						sx={{
							flex: 1,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'stretch',
							gap: '10px',
						}}
					>
						<Box
							sx={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'stretch',
								gap: '10px'
							}}
						>
							<TextField
								variant='outlined'
								placeholder='Digite la cadena a encriptar...'
								color={'dark' as any}
								autoComplete='off'
								{...register('raw', { required: false })}
								sx={{ backgroundColor: '#F6F6F6' }}
							/>
							<Button component='label' variant='contained' startIcon={<CloudUploadRounded />}>
								{
									!watch().file ? (
										<>Cargar Archivo</>
									) : (
										watch().file?.item(0)?.name.slice(0, 20)
									)
								}
								<VisuallyHiddenInput
									{...register('file', { required: false })}
									type='file'
								/>
							</Button>
						</Box>
						<FormControl sx={{ flex: 1, backgroundColor: '#F6F6F6' }}>
							<InputLabel color={'dark' as any}>
								Cifrador
							</InputLabel>
							<Select
								color={'dark' as any}
								sx={{ height: '100%' }}
								{...register('cipher', { required: true, value: ModernAlghoritms.AES })}
							>
								{
									modernAlghoritms.map(agh => (
										<MenuItem key={agh} value={agh}>
											{agh}
										</MenuItem>
									))
								}
							</Select>
						</FormControl>
					</Box>
					<IconButton
						type='submit'
						sx={{
							width: '50px',
							padding: '15px',
							borderRadius: '10px',
							backgroundColor: 'dark.main',
							transition: 'transform .2s',
							'&:active': {
								transform: 'scale(0.9)'
							},
							'&:hover, &:active': {
								backgroundColor: 'dark.main',
							}
						}}
					>
						<ArrowForwardIosRounded sx={{ color: 'white' }} />
					</IconButton>
				</form>
			</Box>
			<Box
				sx={{
					padding: '10px 30px',
					width: '100%',
				}}
			>
				<HistoryTable data={data} />
			</Box>
		</PageLayout>
	)
}

export const getStaticProps: GetStaticProps = async (context) => {
	const cipherData = await fetchCipherData(modernAlghoritms, raws);
	return { props: { cipherData } };
}

export default ModernPage;