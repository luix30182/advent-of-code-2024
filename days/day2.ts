import { openPuzzleInput } from '../utils.ts';

function isSafeReport(report: Array<number>, withTolerance = true): boolean {
	let isSafe = true;
	const isAsending = report[0] < report[1];
	for (let index = 0; index < report.length - 1; index++) {
		const diff = Math.abs(report[index] - report[index + 1]);

		if (diff > 3 || diff < 1) {
			isSafe = false;
		}

		if (isAsending) {
			if (isAsending && report[index] > report[index + 1]) {
				isSafe = false;
			}
		} else {
			if (report[index] < report[index + 1]) {
				isSafe = false;
			}
		}
	}

	if (withTolerance) {
		const toleranceCheck = report
			.map((_, index) => report.toSpliced(index, 1))
			.map(r => isSafeReport(r, false));

		for (const x of toleranceCheck) {
			if (x) {
				return true;
			}
		}
	}

	return isSafe;
}

export async function dayTwoPartOne() {
	const sampleData = await openPuzzleInput('./day2/day2_1.txt');

	const lines = sampleData.map(line => line.split(' ').map(Number));

	let safeReports = 0;

	for (const line of lines) {
		const isSafe = isSafeReport(line);

		if (isSafe) {
			safeReports++;
		}
	}

	console.log(safeReports);
}

export async function dayTwoPartTwo() {
	const sampleData = await openPuzzleInput('./day2/day2_1.txt');

	const lines = sampleData.map(line => line.split(' ').map(Number));

	let safeReports = 0;

	for (const line of lines) {
		const isSafe = isSafeReport(line);

		if (isSafe) {
			safeReports++;
		}
	}

	console.log(safeReports);
}
