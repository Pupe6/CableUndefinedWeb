import Image from "next/image";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Image src="/logo.png" alt="logo" width="100" height="100" />
		</div>
	);
}
