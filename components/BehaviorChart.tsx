import { FC } from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import { ApexOptions } from 'apexcharts';

import { CipherData } from '../interfaces';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const options: ApexOptions = {
	colors: ['#283593', '#AD1457', '#CAEF48', '#FBC02D'],
	chart: {
		zoom: { enabled: false },
		stacked: false,
	},
	grid: {
		borderColor: '#e0e0e0',
		strokeDashArray: 10,
		xaxis: { lines: { show: true } },
		yaxis: { lines: { show: false } }
	},
	dataLabels: { enabled: false },
	markers: { size: 0 },
	fill: {
		type: 'gradient',
		gradient: {
			shadeIntensity: 1,
			inverseColors: false,
			opacityFrom: 0.6,
			opacityTo: 0.05,
		},
	},
	yaxis: { labels: { show: false } },
	xaxis: {
		labels: {
			style: {
				fontFamily: 'Poppins',
				colors: '#757575'
			}
		}
	}
}

interface Props {
	data: CipherData[];
}

export const BehaviorChart: FC<Props> = ({ data }) => {

	const ciphers = Array.from(new Set(data.map(d => d.algorithm.name)));
	const series = ciphers.map(ch => ({
		name: ch,
		data: data.filter(d => d.algorithm.name === ch).map(d => d.time)
	}))

	return (
		<Box>
			<Typography variant='h5' sx={{ fontWeight: 600 }}>
				Comportamiento
			</Typography>
			<Box sx={{ marginTop: '20px' }}>
				{
					typeof window !== 'undefined' && (
						<Chart
							options={{
								...options,
								xaxis: {
									...options.xaxis,
									categories: data.map((_, i) => i + 1)
								}
							}}
							series={series as ApexAxisChartSeries}
							type='area'
							width='100%'
							height='430px'
						/>
					)
				}
			</Box>
		</Box>
	)
}
