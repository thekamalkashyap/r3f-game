const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[-4, 2, 5]} />
    </>
  );
};
export default Lights;
