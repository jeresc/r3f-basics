import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import PropTypes from 'prop-types' // Import PropTypes for validation
import { useRef } from 'react'

/** 
  * Sphere component renders a 3D sphere mesh.
  *
  * @param {Object} props The props object.
  * @param {[number, number, number]} props.position The position of the sphere in the 3D space (x, y, z).
  * @param {[number, number, number]} props.size The size of the sphere in 3D space (radius, widthSegments, heightSegments).
  * @param {string} props.color The color of the sphere.
  * @returns {JSX.Element} The rendered Sphere component.
  */
function Sphere({ position, size, color }) {

  const ref = useRef()
  useFrame((state, delta) => {
    // Rotate the cube
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta
    ref.current.position.z = Math.sin(state.clock.elapsedTime) + position[2]
  })

  return <mesh position={position} ref={ref}>
    <sphereGeometry args={size} />
    <meshStandardMaterial color={color} />
  </mesh>
}

Sphere.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
}

/**
  * Torus component renders a 3D torus mesh.
  *
  * @param {Object} props The props object.
  * @param {[number, number, number]} props.position The position of the torus in the 3D space (x, y, z).
  * @param {[number, number, number]} props.size The size of the torus in 3D space (radius, tube, radialSegments, tubularSegments).
  * @param {string} props.color The color of the torus.
  * @returns {JSX.Element} The rendered Torus component.
  */
function Torus({ position, size, color }) {

  const ref = useRef()
  useFrame((state, delta) => {
    // Rotate the cube
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta
    ref.current.position.z = Math.sin(state.clock.elapsedTime) + position[2]
  })

  return <mesh position={position} ref={ref}>
    <torusKnotGeometry args={size} />
    <meshStandardMaterial color={color} />
  </mesh>
}

Torus.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
}


function App() {

  return (
    <Canvas>
      <directionalLight position={[2, 2, 0]} />
      <directionalLight position={[-2, -1, 0]} />
      <ambientLight intensity={0.8} />
      <Sphere position={[-1, -1, 0]} size={[1, 12, 12]} color="red" />
      <Torus position={[1, 2, 0]} size={[1, 0.4, 32, 32]} color="skyBlue" />
    </Canvas>
  )
}

export default App
