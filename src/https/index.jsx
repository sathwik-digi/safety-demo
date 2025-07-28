
export const setCookie = (
	name,
	value,
	daysToExpire
) => {
	const expiryDate = new Date();
	expiryDate.setTime(expiryDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000);

	const cookieString = `${name}=${encodeURIComponent(
		value
	)}; expires=${expiryDate.toUTCString()}; path=/;`;

	document.cookie = cookieString;
};

export const getCookie = (name) => {
	const cookies = document.cookie.split(";");

	for (let i = 0; i < cookies.length; i += 1) {
		const cookie = cookies[i].trim();
		const cookieParts = cookie.split("=");

		if (cookieParts[0] === name) {
			return decodeURIComponent(cookieParts[1]);
		}
	}

	return null;
};

export const clearCookie=()=>{
	document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

