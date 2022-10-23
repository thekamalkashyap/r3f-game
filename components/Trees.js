import React, { memo, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
const Trees = ({ boundary, count }) => {
  const model = useGLTF("/tree.glb");
  const [trees, setTrees] = useState();

  const boxIntersect = (
    minAx,
    minAz,
    maxAx,
    maxAz,
    minBx,
    minBz,
    maxBx,
    maxBz
  ) => {
    let aLeftOfB = maxAx < minBx;
    let aRightOfB = minAx > maxBx;
    let aAboveB = minAz > maxBz;
    let aBelowB = maxAz < minBz;
    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
  };

  const isOverlapping = (index, tree, trees) => {
    const minTargetX = tree.position.x - tree.box / 2;
    const maxTargetX = tree.position.x + tree.box / 2;
    const minTargetZ = tree.position.z - tree.box / 2;
    const maxTargetZ = tree.position.z + tree.box / 2;
    for (let i = 0; i < index; i++) {
      let minChildX = trees[i].position.x - trees[i].box / 2;
      let maxChildX = trees[i].position.x + trees[i].box / 2;
      let minChildZ = trees[i].position.z - trees[i].box / 2;
      let maxChildZ = trees[i].position.z + trees[i].box / 2;
      if (
        boxIntersect(
          minTargetX,
          minTargetZ,
          maxTargetX,
          maxTargetZ,
          minChildX,
          minChildZ,
          maxChildX,
          maxChildZ
        )
      ) {
        return true;
      }
    }
    return false;
  };

  const newPosition = (box, boundary) => {
    return (
      boundary / 2 -
      box / 2 -
      (boundary - box) * (Math.round(Math.random() * 100) / 100)
    );
  };
  const updatePosition = (treeArray, boundary) => {
    treeArray.forEach((tree, index) => {
      do {
        tree.position.x = newPosition(tree.box, boundary);
        tree.position.z = newPosition(tree.box, boundary);
      } while (isOverlapping(index, tree, treeArray));
    });
    setTrees(treeArray);
  };
  useEffect(() => {
    const tempTrees = [];
    for (let i = 0; i < count; i++) {
      tempTrees.push({ position: { x: 0, z: 0 }, box: 1 });
    }
    updatePosition(tempTrees, boundary);
  }, [boundary, count]);
  return (
    <group scale={0.6}>
      {trees?.map((tree, index) => (
        <object3D key={index} position={[tree.position.x, 0, tree.position.z]}>
          <primitive object={model.scene.clone()} />
        </object3D>
      ))}
    </group>
  );
};

export default memo(Trees);
useGLTF.preload("/tree.glb");
