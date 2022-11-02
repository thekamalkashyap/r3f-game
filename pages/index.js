import { Canvas } from "@react-three/fiber";
import Lights from "../components/Lights";
import Controls from "../components/Controls";
import { lazy, Suspense } from "react";
const Trees = lazy(() => import("../components/Trees"));
const Player = lazy(() => import("../components/Player"));
import Environment from "../components/Environment";
import Floor from "../components/Floor";
import { Physics } from "@react-three/cannon";
export default function Home() {
  return (
    <div>
      <main className="canvas">
        <Canvas camera={{ position: [0, 4, 5] }}>
          <Controls />
          <Lights />
          <Suspense fallback={null}>            
            {/* <Environment /> */}
            <Trees boundary={60} count={10} />
            <Player />
            {/* <Physics>
              <Floor />
            </Physics> */}
          </Suspense>
          {/* <gridHelper args={[100, 100]} /> */}
        </Canvas>
      </main>
    </div>
  );
}
