/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, {useRef, useState,useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import CustomObject from './CustomObject'
import { OrbitControls, useGLTF, Text , Environment,SpotLight, AdaptiveDpr, BakeShadows,PerformanceMonitor ,MeshReflectorMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette, DotScreen, Noise,SSAO, SMAA,GodRays, FXAA,Sepia, SelectiveBloom, ShockWave, HueSaturation, Scanline , Autofocus, LensFlare} from '@react-three/postprocessing';
import * as THREE from 'three'
import PropTypes from 'prop-types';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
import {getProject} from '@theatre/core'
import { editable as e, SheetProvider,PerspectiveCamera,useCurrentSheet,} from "@theatre/r3f";
import state1 from '../public/json/state1.json'
import './style.css'


const demoSheet = getProject('Demo Project',{state:state1}).sheet('Demo Sheet')



function Model({envMap}) {
  const gltf = useGLTF('models/final1.glb');
  const model = gltf.scene;
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if(child.name.startsWith("Cube") || child.name.startsWith("string")){
        child.castShadow = false;
        child.material.toneMapped = false;
      }
      if(!child.name.startsWith("Env") && !child.name.startsWith("Cube") && !child.name.startsWith("string")){
        child.material.envMap = envMap;
        child.material.envMapIntensity = 0.7;
        child.material.side = THREE.DoubleSide;
      }
      if(child.name.startsWith("Env001")){
        child.material.side = THREE.DoubleSide;
        child.material.envMap = envMap;
        child.material.envMapIntensity = 0.1;
      }
    }
  });
  return <primitive object={gltf.scene} />;

}
Model.propTypes = {
  envMap: PropTypes.object.isRequired,
};

export default function Experience() {
  const spotLightSmallConfig = {
    castShadow: true,
    position: [0,4, 0],
    angle: Math.PI / 3,
    penumbra: 1,
    decay: 1.7,
    distance: 15,
    intensity: 50,
    shadowBias: -0.001,
    shadowMapSizeWidth: 2048,
    shadowMapSizeHeight: 2048,
    shadowFilter: THREE.PCFSoftShadowMap,
    shadowCameraNear: 1,
    shadowCameraFar: 20,
    fov: 30,
  };

  const { gl, scene } = useThree();
  const bloomLayer = useRef();
  const [envMap, setEnvMap] = useState(null);
  useEffect(() => {
    bloomLayer.current = new THREE.Layers();
    bloomLayer.current.set(1);
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const hdrTexture = new RGBELoader().load('hdri/final.hdr', (texture) => {
      const newEnvMap = pmremGenerator.fromEquirectangular(texture).texture;
      newEnvMap.needsUpdate = true;
      setEnvMap(newEnvMap);
      texture.dispose();
      pmremGenerator.dispose();
    });
    
    return () => {
      pmremGenerator.dispose();
    };
  }, [gl]);
  const spotLightSmall1 = {
    castShadow: false,
    position: [-8.61, 3.878, -3.202],
    angle: 1.4,
    penumbra: 1.063,
    decay: -0.4,
    distance: 15,
    intensity: 0.1,
    shadowBias: -0.001,
    shadowMapSizeWidth: 2048,
    shadowMapSizeHeight: 2048,
    shadowFilter: THREE.PCFSoftShadowMap,
    shadowCameraNear: 1,
    shadowCameraFar: 20,
    fov: 30,
  }
const pointLightConfig = {
  intensity : 6.65,
  distance : 5.9,
  decay : 1.65,
  color: "#dbb788",
  scale: [5,5,5]
}

  
  
  const spotLightSmallRefs = Array.from({ length: 4 }, () => React.createRef());
  useFrame(({ state, delta }) => {
    spotLightSmallRefs.forEach((spotLightSmallRef, index) => {
      if (spotLightSmallRef.current) {
        const position = spotLightSmallRef.current.position;
        position.y = 0;
        spotLightSmallRef.current.target.position.copy(position);
        spotLightSmallRef.current.target.updateMatrixWorld();
      }
    });
  });
  const bias= -0.001;
    return (
      <>
        <e.mesh receiveShadow theatreKey='floor' rotation={[-Math.PI/2, 0,0]}>
          <planeGeometry />
          <MeshReflectorMaterial
          blur={[100, 100]}
          resolution ={2048}
          mixBlur={0}
          mixStrength={10}
          metalness={0.8 }
          depthScale={10}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          roughness={0}
          color="#ffffff"
          />
        </e.mesh>
        <e.group theatreKey="unleash-the" position={[0,0,0]} rotation={[0,0,0]} scale={[1,1,1]}>
          <Text font={"public/typeface/TrinosStencil.ttf"}>
            UNLEASH the
            <meshStandardMaterial attach="material" color="white" emissive="white" emissiveIntensity={2} side={THREE.DoubleSide}/>
          </Text>
        </e.group>
        <e.group theatreKey="thrill" position={[0,0,0]} rotation={[0,0,0]} scale={[1,1,1]}>
          <Text font={"public/typeface/TrinosStencil.ttf"}>
            THRILL
            <meshStandardMaterial attach="material" color="white" emissive="white" emissiveIntensity={2} side={THREE.DoubleSide}/>
          </Text>
        </e.group>
        <fog attach="fog" color={new THREE.Color('#a3a3a3')} near={3} far={32} />
        <e.ambientLight theatreKey="AmbientLight" intensity={0.02}/>
        <e.spotLight theatreKey="SpotLight"
          castShadow 
          position={[0, 10, 0]}
          angle={Math.PI / 10}
          penumbra={1} decay={1.7}
          distance={15} intensity={50}
          shadow-bias={-0.001}
          shadow-mapSize-width={2048} 
          shadow-mapSize-height={2048} 
          shadow-filter={THREE.PCFSoftShadowMap}
          shadow-camera-near={1} // Adjust near plane
          shadow-camera-far={20} // Adjust far plane
          fov={30}
        />
        <e.pointLight theatreKey="tubelight-enhance" castShadow={false}/>
        {/* <e.pointLight theatreKey="PointLight" castShadow={false} {...pointLightConfig} shadow-bias={bias} /> */}
        {/* <e.pointLight theatreKey="PointLight1" castShadow={false} {...pointLightConfig} shadow-bias={bias} /> */}
        <e.pointLight theatreKey="PointLight2" castShadow={false} {...pointLightConfig} shadow-bias={bias} />
        {/* <e.pointLight theatreKey="PointLight3" castShadow={false} {...pointLightConfig} shadow-bias={bias} /> */}
        <e.pointLight theatreKey="PointLight4" castShadow={false} {...pointLightConfig} shadow-bias={bias} />
        {/* <e.pointLight theatreKey="PointLight5" castShadow={false} {...pointLightConfig} shadow-bias={bias} /> */}
        {/* <e.pointLight theatreKey="PointLight6" castShadow={false} {...pointLightConfig} shadow-bias={bias} /> */}
        <e.pointLight theatreKey="PointLight7" castShadow={false} {...pointLightConfig} shadow-bias={bias} />
        <e.pointLight theatreKey="PointLight8" castShadow={false} {...pointLightConfig} shadow-bias={bias} />
        <e.pointLight theatreKey="PointLight9" castShadow={false} {...pointLightConfig} shadow-bias={bias} />
        <e.pointLight theatreKey="PointLight10" castShadow={false} {...pointLightConfig} shadow-bias={bias} />
        {/* <e.group theatreKey="Model"> */}
        <Model receiveShadow castShadow envMap={envMap}/>
        <BakeShadows />
        <AdaptiveDpr pixelated />
        <PerformanceMonitor />
        {/* </e.group> */}
        <EffectComposer>
          {/* <DotScreen angle={0} opacity={0.001} scale={0.8}   /> */}
          <Bloom luminanceThreshold={0} luminanceSmoothing={30} height={300} />
          {/* <DepthOfField focusDistance={1} focalLength={0} bokehScale={3} height={1000} /> */}
          <Vignette eskil={false} offset={0} darkness={1.1} />
            <SMAA />
        </EffectComposer>
        <PerspectiveCamera makeDefault theatreKey='PerspectiveCamera' position={[2, 1, 2]} fov={40} />
      </>
    )
}