/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import * as THREE from 'three';


function App() {
  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        preserveDrawingBuffer: true,
        outputEncoding: THREE.sRGBEncoding,
       }}
      camera={{ position: [1, 1.3, 5], fov: 45 }}
    >
    <Experience/>
    </Canvas>
  )
}

export default App
