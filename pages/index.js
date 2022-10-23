import { Canvas } from "@react-three/fiber";
import Lights from "../components/Lights";
import Controls from "../components/Controls";
import { lazy, Suspense } from "react";
const Trees = lazy(() => import("../components/Trees"));
const Player = lazy(() => import("../components/Player"));
export default function Home() {
  return (
    <div>
      <main className="canvas">
        <Canvas camera={{ position: [0, 4, 5] }}>
          <Controls />
          <Lights />
          <Suspense fallback={null}>
            <Trees boundary={60} count={20} />
            <Player />
          </Suspense>
          <gridHelper args={[100, 100]} />
        </Canvas>
      </main>
    </div>
  );
}
