import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import Player from "../components/Player";

export default function Home() {
  return (
    <div>
      <main className="canvas">
        <Canvas shadows>
          {/* <axesHelper args={[4]} /> */}
          <gridHelper args={[60, 60]} />
          <OrbitControls />
          <Stats />
          <ambientLight intensity={0.1} />
          <directionalLight position={[-4, 2, 5]} />
          <Player />
        </Canvas>
      </main>
    </div>
  );
}
