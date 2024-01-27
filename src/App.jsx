/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import * as THREE from 'three';

import {getProject} from '@theatre/core'
import { SheetProvider} from '@theatre/r3f';
import state1 from '../public/json/state1.json'


const demoSheet = getProject('Demo Project',{state:state1}).sheet('Demo Sheet')

function App() {
  return (
    <Canvas onCreated={state => {
      state.gl.toneMapping = THREE.ReinhardToneMapping }}
      shadows
      gl={{
        preserveDrawingBuffer: true
       }}
      // camera={{ position: [1, 1.3, 5], fov: 40 }}
      >
      <SheetProvider sheet={demoSheet}>
        <Experience/>
      </SheetProvider>
  </Canvas> 
  )
}

export default App
