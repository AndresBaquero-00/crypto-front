import { map, interval } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { axios } from '../config';
import { APIResponse, Algorithm, CipherData, RequestType } from '../interfaces';

export const getCipherData = async (algorithm: Algorithm, s: string | File, type: RequestType): Promise<CipherData> => {
	const body = {} as any;
	const formData = new FormData();
	switch (type) {
		case 'encrypt':
			if (typeof s === 'string')
				body.raw = s;
			else
				formData.append('file', s);
			break;
		case 'decrypt':
			body.encoded = s;
			break;
	}

	try {
		const { headers, data } = await axios.post<APIResponse>(`/${algorithm.name.toLowerCase()}`, typeof s === 'string' ? body : formData, {
			headers: {
				Accept: 'application/json',
				'Access-Control-Allow-Origin': '*',
			}
		});

		return ({
			id: uuidv4(),
			algorithm: algorithm,
			raw: body.raw ?? data.raw ?? (s as File).name,
			encoded: body.encoded ?? data.encoded,
			time: headers['request-duration'] ?? 0
		});
	} catch (e) {
		console.log(e);
		throw e;
	}
}

export const fetchCipherData = (algorithms: Algorithm[], raws: string[]): Promise<CipherData[]> => {
	return new Promise((resolve, _) => {
		const combined: { algorithm: Algorithm, raw: string }[] = [];
		const samples: CipherData[] = [];

		raws.forEach(raw => {
			algorithms.forEach(algorithm => {
				combined.push({ algorithm, raw });
			});
		});

		interval(2000).pipe(
			map((_, index) => (combined.at(index) as { algorithm: Algorithm, raw: string })),
			map(({ algorithm, raw }) => ({
				algorithm,
				raw,
				request: axios.post<APIResponse>(`/${algorithm.name.toLowerCase()}`, { raw }, {
					headers: { Accept: 'application/json', 'Access-Control-Allow-Origin': '*' }
				})
			}))
		).subscribe({
			next: async ({ algorithm, raw, request }) => {
				const { headers, data } = await request;
				samples.push({
					id: uuidv4(),
					algorithm: algorithm,
					raw: raw,
					encoded: data.encoded || '',
					time: headers['request-duration'] ?? 0
				});
			},
			error: (e) => {
				console.log(e);
				resolve(samples);
			}
		})
	});
}
