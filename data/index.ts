import { ClassicalAlgorithms, ModernAlgorithms } from '../enums';
import { Algorithm } from '../interfaces';

export const raws: string[] = [
	'sistemas',
	'redes',
	'comunicaciones',
	'universidad',
	'distrital',
	'algoritmos',
	'criptograficos',
];

export const classicalAlgorithms: Algorithm[] = [
	{
		algorithm: ClassicalAlgorithms.Caesar,
		name: 'Caesar',
		img: 'caesar.png',
	},
	{
		algorithm: ClassicalAlgorithms.Polybius,
		name: 'Polybius',
		img: 'polybius.png',
	},
	{
		algorithm: ClassicalAlgorithms.Playfair,
		name: 'Playfair',
		img: 'playfair.png',
	},
];

export const modernAlgorithms: Algorithm[] = [
	{
		algorithm: ModernAlgorithms.DES3,
		name: 'DES3',
		img: 'des3.png',
	},
	{
		algorithm: ModernAlgorithms.AES,
		name: 'AES',
		img: 'aes.png',
	},
	{
		algorithm: ModernAlgorithms.RSA,
		name: 'RSA',
		img: 'rsa.png',
	},
	{
		algorithm: ModernAlgorithms.EC,
		name: 'EC',
		img: 'ec.png',
	},
];