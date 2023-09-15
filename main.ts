import { serveFile } from "https://deno.land/std@0.201.0/http/file_server.ts";
import { Submission } from "./Submission.ts";

const SUBMISSION_LIFETIME = 5 * 60 * 1000;

const submissions = new Map<string, Submission<ArrayBuffer | null>>();

Deno.serve(async (request) => {
	const url = new URL(request.url);
	const id = url.searchParams.get("id");
	if (!id) {
		return new Response("No id provided", { status: 404 });
	}
	let submission = submissions.get(id);
	if (!submission) {
		submission = new Submission();
		submissions.set(id, submission);
	}

	setTimeout(() => {
		clearOldSubmissions();
	}, SUBMISSION_LIFETIME);

	if (url.pathname == "/") {
		submission.refreshLifetime();
		return serveFile(request, "main.html");
	} else if (url.pathname == "/submit" && request.method == "POST") {
		const data = await request.arrayBuffer();

		const success = submission.submitData(data);
		if (!success) {
			return new Response("Already submitted", { status: 400 });
		}

		return new Response(id);
	} else if (url.pathname == "/getResult" && request.method == "GET") {
		const result = await submission.waitForData();

		return new Response(result, {
			headers: {
				"Content-Type": "image/png",
			},
		});
	}

	return new Response("Not found", { status: 404 });
});

function clearOldSubmissions() {
	for (const [id, submission] of submissions) {
		if (submission.lifeTime > SUBMISSION_LIFETIME) {
			submission.submitData(null);
			submissions.delete(id);
		}
	}
}
