import { usePlane } from '@react-three/cannon';

const Floor = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-(Math.PI / 180) * 90, 0, 0],
    ...props,
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshPhongMaterial color="green" />
    </mesh>
  );
};

export default Floor;