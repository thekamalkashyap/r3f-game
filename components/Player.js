import React, { useEffect, memo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useInput } from "../hooks/useInput";
const Player = () => {
  const { forward, backward, left, right, jump, shift } = useInput();
  const model = useGLTF("/player.glb");
  const { actions } = useAnimations(model.animations, model.scene);

  const currentAction = useRef("");

  useEffect(() => {
    let action = "";
    if (forward || backward || left || right) {
      if (shift) {
        action = "run";
      } else {
        action = "walk";
      }
    } else if (jump) {
      action = "jump";
    } else {
      action = "idle";
    }

    if (currentAction.current != action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }

    // actions?.idle?.play();
  }, [actions, forward, backward, left, right, jump, shift]);
  return <primitive object={model.scene} />;
};

export default memo(Player);
useGLTF.preload("/player.glb");
