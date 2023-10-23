import { ClassicalAlgorithms, ModernAlgorithms } from '../enums';

export type RequestType = 'encrypt' | 'decrypt';

export interface APIResponse {
	ok: boolean;
	status: number;
	raw?: string;
	encoded?: string;
}

export interface Algorithm {
	algorithm: ClassicalAlgorithms | ModernAlgorithms;
	name: string;
	img: string;
}

export interface CipherData {
	id: string | number;
	algorithm: Algorithm;
	raw: string;
	encoded: string;
	time: number;
}