import { openPuzzleInput } from '../utils.ts';

function getColumnLines(data: string[]) {
	const columns = data.map(row => row.split(' '));

	const columnOne = columns.map(row => Number(row[0]));
	const columnTwo = columns.map(row => Number(row.at(-1) ?? []));

	return [columnOne, columnTwo];
}

export async function dayOnePartOne() {
	const sampleData = await openPuzzleInput('./data/day1.txt');

	let sum = 0;
	if (sampleData) {
		let [columnOne, columnTwo] = getColumnLines(sampleData);
		columnOne = columnOne.sort((a, b) => (a > b ? 1 : -1));
		columnTwo = columnTwo.sort((a, b) => (a > b ? 1 : -1));

		for (let index = 0; index < columnOne.length; index++) {
			const diff = columnOne[index] - columnTwo[index];
			sum += diff > 0 ? diff : diff * -1;
		}
	}
	console.log(sum);
}

export async function dayOnePartTwo() {
	const sampleData = await openPuzzleInput('./data/day1.txt');

	let sum = 0;
	if (sampleData) {
		const [columnOne, columnTwo] = getColumnLines(sampleData);
		for (const n of columnOne) {
			const t = columnTwo.filter(x => x === n).length;
			sum += n * t;
		}

		console.log(sum);
	}
}
