import { TextLineStream } from 'jsr:@std/streams@1.0.8';

export async function openPuzzleInput(fileName: string) {
	const file = await Deno.open(fileName);
	const lines = [];

	try {
		const lineStream = file.readable
			.pipeThrough(new TextDecoderStream())
			.pipeThrough(new TextLineStream());

		for await (const line of lineStream) {
			lines.push(line);
		}

		return lines;
	} catch (error) {
		file.close();
		console.error('Error reading file', error);
		return [];
	}
}
