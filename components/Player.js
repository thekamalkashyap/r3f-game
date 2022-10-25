import React, { useEffect, memo, useRef } from "react";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useInput } from "../hooks/useInput";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuaternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

const directionOffset = ({ forward, backward, left, right }) => {
  var directionOffset = 0;
  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4;
    } else if (right) {
      directionOffset = -Math.PI / 4;
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2;
    } else if (right) {
      directionOffset = -Math.PI / 4 - Math.PI / 2;
    } else {
      directionOffset = Math.PI;
    }
  } else if (left) {
    directionOffset = Math.PI / 2;
  } else if (right) {
    directionOffset = -Math.PI / 2;
  }
  return directionOffset;
};

const Player = () => {
  const { forward, backward, left, right, jump, shift } = useInput();
  const model = useGLTF("/player.glb");
  const { actions } = useAnimations(model.animations, model.scene);

  const currentAction = useRef("");
  const controlRef = useRef();
  const camera = useThree((state) => state.camera);

  const updateCameraTarget = (moveX, moveZ) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;

    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y + 0.002;
    cameraTarget.z = model.scene.position.z;
    if (controlRef.current) controlRef.current.target = cameraTarget;
  };

  useEffect(() => {
    let action = "";
    if (forward || backward || left || right) {
      action = "walk";
      if (shift) {
        action = "run";
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
  }, [forward, backward, left, right, jump, shift]);

  useFrame((state, delta) => {
    if (currentAction.current == "run" || currentAction.current == "walk") {
      // model.scene.position.z += 0.12;
      let angleYCameraDirection = Math.atan2(
        camera.position.x - model.scene.position.x,
        camera.position.z - model.scene.position.z
      );
      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right,
      });

      rotateQuaternion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirection + newDirectionOffset
      );
      model.scene.quaternion.rotateTowards(rotateQuaternion, 0.2);

      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      const velocity = currentAction.current == "run" ? 0.002 : 0.001;

      const moveX = walkDirection.x + velocity + delta;
      const moveZ = walkDirection.z + velocity + delta;
      model.scene.position.x += moveX;
      model.scene.position.z += moveZ;
      updateCameraTarget(moveX, moveZ);
    }
  });

  return (
    <>
      <OrbitControls ref={controlRef} />
      <primitive object={model.scene} />
    </>
  );
};

export default memo(Player);
useGLTF.preload("/player.glb");
