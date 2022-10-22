import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Player = () => {
  const model = useGLTF("/player.glb");
  const { actions } = useAnimations(model.animations, model.scene);
  useEffect(() => {
    actions?.run?.play();
  }, []);
  return <primitive object={model.scene} />;
};

export default Player;
useGLTF.preload("/globe.glb");
