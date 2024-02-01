"use client";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "three";
import { useRef } from "react";

export default function CanvasPage() {
	const cameraRef = useRef<OrthographicCamera>(null);

	return (
		<Canvas>
			<orthographicCamera
				ref={cameraRef}
				position={[0, 0, 10]}
				left={window.innerWidth / -2}
				right={window.innerWidth / 2}
				top={window.innerHeight / 2}
				bottom={window.innerHeight / -2}
				near={1}
				far={1000}
			/>
			<mesh>
				<boxGeometry args={[1, 1, 1]} />
				<meshBasicMaterial color={0x00ff00} />
			</mesh>
		</Canvas>
	);
}
