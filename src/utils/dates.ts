export function formatDate(dateString: string): string {
	const date = new Date(dateString);

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		timeZoneName: "short",
	};

	const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
		date
	);

	return formattedDate;
}
