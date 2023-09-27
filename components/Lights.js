import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { useRef } from "react";

const Lights = () => {
  const directionalLightRef = useRef();
  // useHelper(directionalLightRef,DirectionalLightHelper,1,'red')
  return (
    <>
      <ambientLight intensity={0.01} />
      <directionalLight ref={directionalLightRef} castShadow intensity={1} position={[-4, 10, 5]} />
    </>
  );
};
export default Lights;
