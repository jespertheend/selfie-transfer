export class Submission<T> {
	lastModifyTime = Date.now();

	refreshLifetime() {
		this.lastModifyTime = Date.now();
	}

	get lifeTime() {
		return Date.now() - this.lastModifyTime;
	}

	#dataSubmitted = false;
	#resolveDataPromise: ((data: T) => void) | null = null;
	#dataPromise = new Promise<T>((resolve) => {
		this.#resolveDataPromise = resolve;
	});

	submitData(data: T) {
		if (this.#dataSubmitted) return false;
		this.#dataSubmitted = true;
		this.refreshLifetime();
		this.#resolveDataPromise!(data);
		return true;
	}

	get dataSubmitted() {
		return this.#dataSubmitted;
	}

	waitForData() {
		return this.#dataPromise;
	}
}
