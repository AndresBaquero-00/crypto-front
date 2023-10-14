import { ClassicalAlghoritms, ModernAlghoritms } from '../enums';

export interface CipherData {
	id: string | number;
	cipher: ClassicalAlghoritms | ModernAlghoritms;
	raw: string;
	encrypted: string;
	time?: number;
}

export interface APIResponse {
	ok: boolean;
	status: number;
	cipher: ClassicalAlghoritms | ModernAlghoritms;
	raw: string;
	encrypted: string;
}