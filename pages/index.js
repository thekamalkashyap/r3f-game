import { Canvas } from "@react-three/fiber";
import Lights from "../components/Lights";
import Controls from "../components/Controls";
import { lazy } from "react";
const Trees = lazy(() => import("../components/Trees"));
const Player = lazy(() => import("../components/Player"));
export default function Home() {
  return (
    <div>
      <main className="canvas">
        <Canvas shadows camera={{ position: [0, 4, 5] }}>
          <Controls />
          <Lights />
          {/* <Trees boundary={60} count={10} /> */}
          <Player />
          <mesh
            rotation={[-0.5 * Math.PI, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[200, 200, 1, 1]} />
            {/* <shadowMaterial transparent opacity={0.75} /> */}
            <meshBasicMaterial color={'#7f868c'}/>
          </mesh>
        </Canvas>
      </main>
    </div>
  );
}
