import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import PropTypes from 'prop-types' // Import PropTypes for validation
import { useRef } from 'react'

/**
 * Cube component renders a 3D cube mesh.
 * 
 * @param {Object} props The props object.
 * @param {[number, number, number]} props.position The position of the cube in the 3D space (x, y, z).
 * @param {[number, number, number]} props.size The size of the cube in 3D space (width, height, depth).
 * @param {string} props.color The color of the cube.
 * @returns {JSX.Element} The rendered Cube component.
 */
function Cube({ position, size, color }) {

  const ref = useRef()
  useFrame((state, delta) => {
    // Rotate the cube
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta
    ref.current.position.z = Math.sin(state.clock.elapsedTime) + position[2]
  })

  return <mesh position={position} ref={ref}>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} />
  </mesh>

}

Cube.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
};

function App() {

  return (
    <Canvas>
      <directionalLight position={[0, 0, 2]} />
      <directionalLight position={[2, 2, 0]} />
      <ambientLight intensity={0.8} />
      <group position={[0, 0, -0.5]}>
        <Cube position={[1, 0, 0]} size={[1, 1, 1]} color={"orange"} />
        <Cube position={[0, -1, 2]} size={[1, 1, 1]} color={"green"} />
        <Cube position={[-1, 1, 2]} size={[1, 1, 1]} color={"red"} />
        <Cube position={[1, 2, -2]} size={[1, 1, 1]} color={"skyBlue"} />
      </group>
    </Canvas>
  )
}

export default App
