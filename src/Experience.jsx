/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, {useRef, useState,useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import CustomObject from './CustomObject'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise, SMAA } from '@react-three/postprocessing';
import * as THREE from 'three'
import PropTypes from 'prop-types';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
import {getProject} from '@theatre/core'
import { editable as e, SheetProvider } from '@theatre/r3f'
const demoSheet = getProject('Demo Project').sheet('Demo Sheet')



function Model({envMap}) {
  const gltf = useGLTF('models/besht.glb');
  
  const model = gltf.scene;
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if(child.name.startsWith("Cube") || child.name.startsWith("string")){
        child.castShadow = false;
      }
      if(!child.name.startsWith("Cylinder") && !child.name.startsWith("Cube") && !child.name.startsWith("string")){
        child.material.envMap = envMap;
        child.material.envMapIntensity = 0.2;
        // doubleside
        child.material.side = THREE.DoubleSide;
      }
      if(child.name.startsWith("Cylinder")){
        const lightMapTexture = new THREE.TextureLoader().load('lightMap.png');
        lightMapTexture.flipY = false;
        child.material.side = THREE.DoubleSide;
        child.material.lightMap = lightMapTexture;
        child.material.lightMapIntensity = 2;

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
    angle: Math.PI / 10,
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
  const [envMap, setEnvMap] = useState(null);
  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const hdrTexture = new RGBELoader().load('hdri/second.hdr', (texture) => {
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
  const spotLightSmallRef = useRef();
  useFrame(({ state, delta }) => {
    if (spotLightSmallRef.current) {
      const position = spotLightSmallRef.current.position;
      position.y = 0;
      spotLightSmallRef.current.target.position.copy(position);
      console.log(position);
      spotLightSmallRef.current.target.updateMatrixWorld();
    }
  });
    return (
      <>
        <SheetProvider sheet={demoSheet}>
          <OrbitControls />
          {/* <e.directionalLight theatreKey="DirectionalLight" intensity={0.5} castShadow/> */}
          {/* <e.pointLight theatreKey="point1"color={0xffffff} intensity={0.1} position={[5, 5, 5]} /> */}
          <e.ambientLight theatreKey="AmbientLight" intensity={0.04}castShadow/>
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
          {/* <e.spotLight ref={spotLightSmallRef} theatreKey="SpotLightSmall" {...spotLightSmallConfig}/> */}
          <Model receiveShadow castShadow envMap={envMap}/>
          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={20} height={300} />
            <SMAA />
          </EffectComposer>
        </SheetProvider>
      </>
    )
}