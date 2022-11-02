import * as THREE from 'three';
import { Environment as Envrmnt } from '@react-three/drei';
const Environment = (props) => {
  return (
    <Envrmnt background>
      <mesh {...props}>
        <sphereGeometry args={[50, 100, 100]} />
        <meshBasicMaterial color="blue" side={THREE.BackSide} />
      </mesh>
    </Envrmnt>
  );
};

export default Environment;
