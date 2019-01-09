export const userAgent = {
	isIpad: () => {
		let isIpad = false;
		try {
			const ua = navigator.userAgent;
			isIpad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
		} catch (e) {
			console.log(e)
		}
		return isIpad;
	}
};

export {};