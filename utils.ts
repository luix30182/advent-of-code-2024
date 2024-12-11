import { TextLineStream } from 'jsr:@std/streams@1.0.8';

export async function openPuzzleInput(fileName: string, multipleLines = true) {
	const file = await Deno.open(fileName);
	const lines = [];

	try {
		const lineStream = file.readable
			.pipeThrough(new TextDecoderStream())
			.pipeThrough(new TextLineStream());

		for await (const line of lineStream) {
			lines.push(line);
		}

		if (multipleLines) {
			return lines;
		}

		return [lines.join('')];
	} catch (error) {
		file.close();
		console.error('Error reading file', error);
		return [];
	}
}
