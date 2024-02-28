"use client";

import Image from "next/image";
import "@b.borisov/cu-elements";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Image src="/logo.png" alt="logo" width="100" height="100" />
			<wokwi-show-pins pinRadius={6}>
				<wokwi-breadboard />
			</wokwi-show-pins>
		</div>
	);
}
