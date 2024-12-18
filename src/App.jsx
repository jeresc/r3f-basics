import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import PropTypes from "prop-types"; // Import PropTypes for validation
import { useRef, useState } from "react";
import {
  MeshWobbleMaterial,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { useControls } from "leva";

/**
 * Torus component renders a 3D torus mesh.
 *
 * @param {Object} props The props object.
 * @param {[number, number, number]} props.position The position of the torus in the 3D space (x, y, z).
 * @param {[number, number, number]} props.size The size of the torus in 3D space (radius, tube, radialSegments, tubularSegments).
 * @returns {JSX.Element} The rendered Torus component.
 */
function Torus({ position, size }) {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 1 : 0.2;
    ref.current.rotation.y += delta * speed;
  });

  const { color, radius } = useControls({
    color: "lightblue",
    radius: {
      value: 0.5,
      min: 0.5,
      max: 10,
      step: 0.5,
    },
  });

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
    >
      <torusKnotGeometry args={[radius, ...size]} />
      {/* <meshStandardMaterial color={isHovered ? color[0] : color[1]} /> */}
      <MeshWobbleMaterial speed={1.2} color={color} />
    </mesh>
  );
}

Torus.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function Scene() {
  const directionalLightRef = useRef();
  const otherDirectionalLightRef = useRef();

  const { lightColor, lightIntensity } = useControls({
    lightColor: "white",
    lightIntensity: {
      value: 0.5,
      min: 0,
      max: 5,
    },
  });

  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white");
  useHelper(otherDirectionalLightRef, DirectionalLightHelper, 0.5, "#f8d628");

  return (
    <>
      <directionalLight
        position={[2, 2, 0]}
        ref={directionalLightRef}
        color={lightColor}
        intensity={lightIntensity}
      />
      <directionalLight position={[-2, -1, 0]} ref={otherDirectionalLightRef} />
      <ambientLight intensity={0.5} />
      <Torus position={[0, 0, 0]} size={[0.4, 400, 50]} />
      <OrbitControls />
    </>
  );
}

function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}

export default App;
