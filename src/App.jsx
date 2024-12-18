import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import PropTypes from "prop-types"; // Import PropTypes for validation
import { useRef } from "react";
import { useState } from "react";

/**
 * Torus component renders a 3D torus mesh.
 *
 * @param {Object} props The props object.
 * @param {[number, number, number]} props.position The position of the torus in the 3D space (x, y, z).
 * @param {[number, number, number]} props.size The size of the torus in 3D space (radius, tube, radialSegments, tubularSegments).
 * @param {[string, string]} props.color The color of the torus.
 * @returns {JSX.Element} The rendered Torus component.
 */
function Torus({ position, size, color }) {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 1 : 0.2;
    ref.current.rotation.y += delta * speed;
  });

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? [1.2, 1.2, 1.2] : [1, 1, 1]}
    >
      <torusKnotGeometry args={size} />
      <meshStandardMaterial color={isHovered ? color[0] : color[1]} />
    </mesh>
  );
}

Torus.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
};

function App() {
  return (
    <Canvas>
      <directionalLight position={[2, 2, 0]} />
      <directionalLight position={[-2, -1, 0]} />
      <ambientLight intensity={0.8} />
      <Torus
        position={[0, 0, 0]}
        size={[1, 0.4, 32, 32]}
        color={["skyBlue", "red"]}
      />
    </Canvas>
  );
}

export default App;
