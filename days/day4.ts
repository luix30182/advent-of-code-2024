import { openPuzzleInput } from '../utils.ts';

export async function dayFourPartOne() {
	const sampleData = await openPuzzleInput('./data/day4.txt');
	const XMAS = 'XMAS';
	// const formatData = sampleData.map(d => d.split(''));
	if (sampleData) {
		let sum = 0;

		for (let i = 0; i < sampleData.length; i++) {
			// horizontal →
			for (let j = 0; j < sampleData[0].length - 3; j++) {
				const section = sampleData[i].slice(j, j + 4);
				if (section === XMAS) {
					sum++;
				}
			}

			// horizontal ←
			for (let j = sampleData[0].length; j > 3; j--) {
				const section = sampleData[i]
					.slice(j - 4, j)
					.split('')
					.reverse()
					.join('');

				if (section === XMAS) {
					sum++;
				}
			}
		}

		for (let i = 0; i < sampleData[0].length; i++) {
			//vertical ↓
			for (let j = 0; j < sampleData.length - 3; j++) {
				const section =
					sampleData[j][i] +
					sampleData[j + 1][i] +
					sampleData[j + 2][i] +
					sampleData[j + 3][i];

				if (section === XMAS) {
					sum++;
				}
			}
			//vertical ↑
			for (let j = sampleData[0].length - 1; j > 2; j--) {
				const section =
					sampleData[j][i] +
					sampleData[j - 1][i] +
					sampleData[j - 2][i] +
					sampleData[j - 3][i];

				if (section === XMAS) {
					sum++;
				}
			}
		}

		for (let i = 0; i < sampleData[0].length - 3; i++) {
			//diagonal ↘
			for (let j = 0; j < sampleData.length - 3; j++) {
				const section =
					sampleData[i][j] +
					sampleData[i + 1][j + 1] +
					sampleData[i + 2][j + 2] +
					sampleData[i + 3][j + 3];

				if (section === XMAS) {
					sum++;
				}
			}
			//diagonal ↙
			for (let j = sampleData.length - 1; j > 2; j--) {
				const section =
					sampleData[i][j] +
					sampleData[i + 1][j - 1] +
					sampleData[i + 2][j - 2] +
					sampleData[i + 3][j - 3];

				if (section === XMAS) {
					sum++;
				}
			}
		}

		for (let i = sampleData.length - 1; i > 2; i--) {
			//diagonal ↗
			for (let j = 0; j < sampleData.length - 3; j++) {
				const section =
					sampleData[i][j] +
					sampleData[i - 1][j + 1] +
					sampleData[i - 2][j + 2] +
					sampleData[i - 3][j + 3];

				if (section === XMAS) {
					sum++;
				}
			}
			//diagonal ↖
			for (let j = sampleData.length - 1; j > 2; j--) {
				const section =
					sampleData[i][j] +
					sampleData[i - 1][j - 1] +
					sampleData[i - 2][j - 2] +
					sampleData[i - 3][j - 3];
				if (section === XMAS) {
					sum++;
				}
			}
		}
		console.log(sum);
	}
}
