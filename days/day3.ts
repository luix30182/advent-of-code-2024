import { openPuzzleInput } from '../utils.ts';

function multiply(value: Array<number>) {
	return value.reduce((acc, curr) => acc * curr, 1);
}

function getMultiplication(line: string): number {
	const regex = /mul\((\d+,)+\d+\)/g;

	console.log([...line.matchAll(regex)].length);
	const validMul = [...line.matchAll(regex)]
		.map(x => x[0])
		.map(x => x.slice(4, -1))
		.map(x => x.split(','))
		.map(x => x.map(Number));

	return validMul.map(multiply).reduce((acc, curr) => acc + curr, 0);
}

export async function dayThreePartOne() {
	const sampleData = await openPuzzleInput('./data/day3.txt');

	let sum = 0;
	if (sampleData) {
		for (const line of sampleData) {
			const mulResult = getMultiplication(line);
			sum += mulResult;
		}

		console.log(sum);
	}
}

function getState(state: number, column: number) {
	if (column < 0) {
		return -1;
	}

	const transition = [
		[1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1],
		[-1, 1, 2, -1, -1, 1, 5, -1, -1, -1, -1, -1],
		[-1, -1, -1, 2, 2, 2, 5, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1, 3, 9, -1, -1],
		[-1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1],
		[-2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2],
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 6],
		[-1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 7],
		[1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
		[-1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1]
	];
	if (column > -1) {
		return transition[state][column];
	}

	return -1;
}

function getColumn(char: string) {
	const validChars = ['d', 'o', 'n', `'`, 't', '(', ')', 'm', 'u', 'l', ','];

	if (!isNaN(Number(char))) {
		return 11;
	}

	return validChars.indexOf(char);
}

function getValidData(line: string) {
	const chars = line.split('');

	const commands = [];
	let buff = '';
	let state = 0;

	for (const c of chars) {
		const column = getColumn(c);

		if (column > -1) {
			state = getState(state, column);
			if (state > -1) {
				buff += c;
			}
			if (state === -1) {
				buff = '';
				state = 0;
			}
			if (state === 8) {
				buff = '';
			}
			if (state === 5) {
				commands.push(buff);
				buff = '';
				state = 0;
			}
		} else {
			buff = '';
			state = 0;
		}
	}

	return commands;
}

function getValidMultiplication(data: Array<string>) {
	let skyp = false;

	let sum = 0;
	let c = 0;
	for (const d of data) {
		if (d === `don't()`) {
			skyp = true;
		}
		if (d === 'do()') {
			skyp = false;
		}

		if (d.includes('mul') && !skyp) {
			c++;
			const mul = multiply(d.slice(4, -1).split(',').map(Number));
			sum += mul;
		}
	}
	return sum;
}

export async function dayThrePartTwo() {
	const sampleData = await openPuzzleInput('./data/day3.txt', false);

	let sum = 0;
	if (sampleData) {
		for (const line of sampleData) {
			const validData = getValidData(line);
			const mul = getValidMultiplication(validData);
			sum += mul;
		}

		console.log(sum);
	}
}
