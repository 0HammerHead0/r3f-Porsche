/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useGLTF } from '@react-three/drei';

function Model() {
  const gltf = useGLTF('models/besht.glb');

  const model = gltf.scene;
  model.traverse((child) => {
    if (child.isMesh) {
      console.log(child);
      child.castShadow = true;
      child.receiveShadow = true;
      if(child.name.startsWith("Cube") || child.name.startsWith("string")){
        child.castShadow = false;
      }
    }
  });
  return <primitive object={gltf.scene} />;

}

export default Model;
