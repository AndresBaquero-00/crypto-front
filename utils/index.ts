import { AxiosResponse } from 'axios';
import axios from '../config';
import { ClassicalAlghoritms, ModernAlghoritms } from '../enums';
import { APIResponse, CipherData } from '../interfaces';

const fetchCipherData = async (alghotims: ClassicalAlghoritms[] | ModernAlghoritms[], raws: string[]): Promise<CipherData[]> => {
  const promises = raws.map(raw => (
		alghotims.map(agh => {
			const body = new FormData();
			body.append('raw', raw);
			return axios.post<APIResponse>(`/${agh.toLowerCase()}`, body)
		})
	));

	try {
    const array: Promise<AxiosResponse<APIResponse>>[] = [];
    promises.forEach(pr => array.push(...pr));
		const res = await Promise.all(array);
		const data: CipherData[] = res.map((axr, i) => ({
			id: i,
			cipher: axr.data.cipher,
			raw: axr.data.raw,
			encrypted: axr.data.encrypted,
			time: axr.headers['request-duration']
		}))

		return data;
	} catch (e) {
		console.log(e);
		return [];
	}
}

export default fetchCipherData;