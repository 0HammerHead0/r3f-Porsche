/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, {useRef, useState,useEffect} from 'react';
import { useFrame, useThree ,useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Text , Environment,SpotLight, AdaptiveDpr, BakeShadows,PerformanceMonitor ,MeshReflectorMaterial} from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette, DotScreen, Noise,SSAO, SMAA,GodRays, FXAA,Sepia, SelectiveBloom, ShockWave, HueSaturation, Scanline , Autofocus, LensFlare} from '@react-three/postprocessing';
import * as THREE from 'three'
import PropTypes from 'prop-types';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
import {getProject,val} from '@theatre/core'
import { editable as e, SheetProvider,PerspectiveCamera,useCurrentSheet,} from "@theatre/r3f";
import {TextureLoader} from 'three';
import {useScroll, useTexture, Html} from '@react-three/drei';
import statefinal from '../public/json/state-final.json'
import './style.css'
import {gsap} from 'gsap'

const demoSheet = getProject('Demo Project',{state:statefinal}).sheet('Demo Sheet')



function Model({envMap}) {
  const gltf = useGLTF('models/compressed.glb');
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
const camera = useThree().camera;
function calculateScreenPosition(object3D) {
  const vector = new THREE.Vector3();
  const widthHalf = window.innerWidth / 2;
  const heightHalf = window.innerHeight / 2;

  object3D.updateMatrixWorld();
  vector.setFromMatrixPosition(object3D.matrixWorld);
  vector.project(camera);
  const x = (vector.x * widthHalf) + widthHalf;
  const y = -(vector.y * heightHalf) + heightHalf;
}
  const [roughness, normal, color, height, ao, opacity] = useLoader(TextureLoader, [
    "textures/concrete-roughness.jpg",
    "textures/concrete-normal.png",
    "textures/concrete-color.jpg",
    "textures/concrete-height.png",
    "textures/concrete-ao.jpg",
    "textures/concrete-opacity.jpg"
  ])

  useEffect(() =>{
    [normal,roughness,color, height, ao].forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4);
      texture.colorSpace =  THREE.SRGBColorSpace 
    });
  },[normal,roughness,color, height, ao]);




  const bias= -0.001;


  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const cameraRef = useRef();
  const unleash_the = useRef();
  const thrill = useRef();
  const porsche_911 = useRef();
  const gt2rs = useRef();
  let makeInvisible = true;
  useFrame(()=>{
    cameraRef.current.lookAt(0, 0, 0);
    const currentTime = sheet.sequence.position;
    if(currentTime >= 0.60 && currentTime <= 0.70 && makeInvisible){
      makeInvisible=false;
      const t2 = gsap.timeline();
      t2.to(unleash_the.current.material,{
      duration: 0.2, opacity: 0, ease: "power2.inOut"
      },0)
      t2.to(thrill.current.material,{
      duration: 0.2, opacity: 0, ease: "power2.inOut"
      },0)
    }
    if(currentTime<0.65) {
      makeInvisible=true;
      const t2=gsap.timeline();
      t2.to(unleash_the.current.material,{
      duration: 0.2, opacity: 1, ease: "power2.inOut"
      },0)
      t2.to(thrill.current.material,{
      duration: 0.2, opacity: 1, ease: "power2.inOut"
      },0)
    }

  })
  const circle = document.querySelector('.circle');
  var animationFraction = 0;
  var animationStarted = false;
  var animationTime = 0;  
  var isDragging = false;
  useEffect(() => {
    const knob = document.querySelector('.knob');
    isDragging = false;
    const handleMouseDown = (event) => {
      isDragging = true;
      event.preventDefault();
    };
    var constrainedAngle = 0;
    var knobRect = knob.getBoundingClientRect();    
    var circleRect = circle.getBoundingClientRect();
    var circleCenterX = circleRect.left + circleRect.width / 2;
    var circleCenterY = circleRect.top + circleRect.height / 2;
    var radius = circleRect.width / 2;
    const opacity_factor = 4;
    const handleMouseMove = (event) => {
      if (isDragging && !animationStarted) {
        circleRect = circle.getBoundingClientRect();
        circleCenterX = circleRect.left + circleRect.width / 2;
        circleCenterY = circleRect.top + circleRect.height / 2;
        const angle = Math.atan2(-event.clientY + circleCenterY, event.clientX - circleCenterX);
        constrainedAngle = 2*Math.PI - Math.max(0, Math.min(angle, Math.PI));
        let fraction = (Math.PI*2 - constrainedAngle)/(Math.PI);
        const sequenceLength = val(sheet.sequence.pointer.length);
        sheet.sequence.position = fraction*sequenceLength/8;
        circle.style.opacity = (1-opacity_factor*fraction);
        const newX = circleCenterX + Math.cos(constrainedAngle) * (circleRect.width / 2 -1);
        const newY = circleCenterY + Math.sin(constrainedAngle) * (circleRect.height / 2 -1 );
        knob.style.left = newX - knobRect.width /2 + 'px';
        knob.style.top = newY - knobRect.height /2 + 'px';
        if(fraction>=0.25 && fraction<=0.35){
           const temp_fraction = fraction - 0.25;
           knob.style.opacity = 1 - temp_fraction*10; 
          }
        if(fraction>0.36){
          knob.style.opacity = 0;
          circle.style.opacity = 0;
          animationFraction = fraction;
          animationTime = sheet.sequence.position;
          animationStarted = true;
          const reset = document.querySelector('.reset');
          gsap.to(reset,{
            opacity: 0,
            duration: 1, ease: "power2.inOut"
          },0)

          animateScene();
        }
      }
    };
    const handleMouseUp = () => {
      if(isDragging){
        const temp_obj = {angle:constrainedAngle};
        const targetAngle = Math.PI * 2;
        if(animationStarted) return;
        gsap.to(temp_obj, {
          duration: 1,
          angle: targetAngle,
          ease: "bounce",
          onUpdate: () => {
            if(animationStarted)
            {
              gsap.killTweensOf(temp_obj);
              return;
            }
            circleRect = circle.getBoundingClientRect();
            circleCenterX = circleRect.left + circleRect.width / 2;
            circleCenterY = circleRect.top + circleRect.height / 2;
            const newX = circleCenterX + Math.cos(temp_obj.angle) * (circleRect.width / 2 -1);
            const newY = circleCenterY + Math.sin(temp_obj.angle) * (circleRect.height / 2 -1 );
            knob.style.left = newX - knobRect.width /2 + 'px';
            knob.style.top = newY - knobRect.height /2+ 'px';
            let fraction = (Math.PI*2 - temp_obj.angle)/(Math.PI);
            const sequenceLength = val(sheet.sequence.pointer.length);
            sheet.sequence.position = fraction*sequenceLength/8;
            circle.style.opacity = (1-opacity_factor*fraction);
            
            if(fraction>=0.25 && fraction<=0.35){
              const temp_fraction = fraction - 0.25;
              knob.style.opacity = 1 - temp_fraction*10; 
            }
          }
        });
      }
      isDragging = false;
    };
    knob.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      knob.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [circle]);
  const sequenceLength = val(sheet.sequence.pointer.length);
  var lastTextAnimationFlag = false;
  function animateScene() {
    sheet.sequence.position = animationTime;
    if (animationTime <= sequenceLength) {
      animationTime+= 0.02;
      if(animationTime>11.5 &&  !lastTextAnimationFlag){
        lastTextAnimationFlag = true;
        const t2 = gsap.timeline();
        t2.to(porsche_911.current.material,{
        duration: 1, opacity: 1, ease: "power2.inOut"
        },0)
        t2.to(gt2rs.current.material,{
        duration: 1, opacity: 1, ease: "power2.inOut"
        },0)
        
      }
      requestAnimationFrame(animateScene);
    }
    else{
      const reset = document.querySelector('.reset');
      gsap.to(reset,{
        opacity: 1,
        duration: 1, ease: "power2.inOut"
      },0)
      animateFooter();
    }

  }
  function resetAnimations(){
    if(sheet.sequence.position>0)
    {
      const t2 = gsap.timeline();
      t2.to(porsche_911.current.material,{
      duration: 1, opacity: 0, ease: "power2.inOut"
      },0)
      t2.to(gt2rs.current.material,{
      duration: 1, opacity: 0, ease: "power2.inOut"
      },0)
      const t3 = gsap.timeline();
      t3.to(unleash_the.current.material,{
      duration: 0.2, opacity: 1, ease: "power2.inOut"
      },0)
      t3.to(thrill.current.material,{
      duration: 0.2, opacity: 1, ease: "power2.inOut"
      },0)
      sheet.sequence.position = 0;
      animationTime = 0;
      animationFraction = 0;
      animationStarted = false;
      lastTextAnimationFlag = false;
      const knob = document.querySelector('.knob');
      const circle = document.querySelector('.circle');
      const centerText = document.querySelector('.centerText');
      const readMore = document.querySelector('.readMore');
      const share = document.querySelector('.share');
      const mouse = document.querySelector('.mouse');
      const timeline = gsap.timeline();
      const obj = {left: 45, opacity: 1};
      timeline.to(share,
      {
        left: 40,
        duration: 1,
        ease: "power2.inOut"
      },0)
      timeline.to(mouse, {
        opacity: 0,
        duration: 0.5, ease: "power2.inOut"
      },0.4)
      timeline.to(obj,{
        left:40,
        opacity: 0,
        duration: 1, ease: "power2.inOut",
        onUpdate: () => {
          centerText.style.left = obj.left + '%';
          centerText.style.opacity = obj.opacity;
        }
        },0.2)
      timeline.to(readMore,{
        opacity: 0,
        duration: 1, ease: "power2.inOut"
      },0.2)
      timeline.to(knob,{
        opacity: 1,
        duration: 1, ease: "power2.inOut"
      },0.5)
      timeline.to(circle,{
        opacity: 1,
        duration: 1, ease: "power2.inOut"
      },0.5)
      const circleRect = circle.getBoundingClientRect();
      const knobRect = knob.getBoundingClientRect();
      const circleCenterX = circleRect.left + circleRect.width / 2;
      const circleCenterY = circleRect.top + circleRect.height / 2;
      const newX = circleCenterX + Math.cos(Math.PI*2) * (circleRect.width / 2 -1);
      const newY = circleCenterY + Math.sin(Math.PI*2) * (circleRect.height / 2 -1 );
      knob.style.left = newX - knobRect.width /2 + 'px';
      knob.style.top = newY - knobRect.height /2+ 'px';
    }

  }
  const reset = document.querySelector('.reset');
  reset.addEventListener('click',resetAnimations);

  function animateFooter(){
    const centerText = document.querySelector('.centerText');
    const readMore = document.querySelector('.readMore');
    const centerTextObj = {left: 40, opacity: 0};
    const share = document.querySelector('.share');
    const mouse = document.querySelector('.mouse');
    const timeline = gsap.timeline();
    timeline.to(share,
    {
      left: 120,
      duration: 1,
      ease: "power2.inOut"
    },0)
    timeline.to(mouse,{
      opacity: 1,duration: 0.5, ease: "power2.inOut"
    },0.4)
    timeline.to(centerTextObj,{
     left:45,
      opacity: 1,
     duration: 1, ease: "power2.inOut",
     onUpdate: () => {
      centerText.style.left = centerTextObj.left + '%';
      centerText.style.opacity = centerTextObj.opacity;
     }
    },0.2)
    timeline.to(readMore,{
      opacity: 1,
      duration: 1, ease: "power2.inOut"
    },0.2)

  }
    return (
      <>
        <e.mesh receiveShadow theatreKey='floor' rotation={[-Math.PI/2, 0,0]}>
          <planeGeometry args={[2,2]}/>
          <MeshReflectorMaterial
            roughnessMap = {roughness}
            normalMap = {normal}
            map = {color}
            aoMap = {ao}
            displacementMap = {height}
            alphaMap = {opacity}
            blur={[10, 10]}
            resolution ={1024}
            mixBlur={1}
            mixStrength={5}
            mixContrast={1.3}
            metalness={0.9}
            depthScale={1}
            minDepthThreshold={0}
            maxDepthThreshold={0.5}
            depthToBlurRatioBias={10}
            roughness={1}
            mirror={0}
          />
        </e.mesh>
        <e.group theatreKey="unleash-the" position={[0,0,0]} rotation={[0,0,0]} scale={[1,1,1]}>
          <Text  ref={unleash_the}  font={"typeface/TrinosStencil.ttf"}>
            UNLEASH the
            <meshStandardMaterial attach="material" color="white" emissive="white" emissiveIntensity={1.5} side={THREE.DoubleSide}/>
          </Text>
        </e.group>
        <e.group theatreKey="thrill" position={[0,0,0]} rotation={[0,0,0]} scale={[1,1,1]}>
          <Text  ref={thrill} font={"typeface/TrinosStencil.ttf"}>
            THRILL
            <meshStandardMaterial attach="material" color="white" emissive="white" emissiveIntensity={1.5} side={THREE.DoubleSide}/>
          </Text>
        </e.group>
        <e.group theatreKey="Porsche-911" position={[0,0,0]} rotation={[0,0,0]} scale={[1,1,1]}>
          <Text  ref={porsche_911} font={"typeface/911.ttf"}>
            PORSCHE{'\n'}911
            <meshStandardMaterial attach="material" opacity={0} color="white" emissive="white" emissiveIntensity={1.75} side={THREE.DoubleSide}/>
          </Text>
        </e.group>
        <e.group theatreKey="GT2-RS" position={[0,0,0]} rotation={[0,0,0]} scale={[1,1,1]}>
          <Text ref={gt2rs} font={"typeface/911.ttf"}>
            GT2 RS
            <meshStandardMaterial attach="material" opacity={0} color="white" emissive="white" emissiveIntensity={1.75} side={THREE.DoubleSide}/>
          </Text>
        </e.group>
        <fog attach="fog" color={new THREE.Color('#a3a3a3')} near={3} far={25} />
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
          shadow-camera-near={1}
          shadow-camera-far={20} 
          fov={30}
        />
        <e.pointLight theatreKey="tubelight-enhance" castShadow={false}/>
        <e.pointLight theatreKey="PointLight2" castShadow={false} {...pointLightConfig} shadow-bias={bias} />
        <e.pointLight theatreKey="PointLight4" castShadow={false} {...pointLightConfig} shadow-bias={bias} />
        <e.pointLight theatreKey="PointLight7" castShadow={false} {...pointLightConfig} shadow-bias={bias} />
        <e.pointLight theatreKey="PointLight8" castShadow={false} {...pointLightConfig} shadow-bias={bias} />
        <e.pointLight theatreKey="PointLight9" castShadow={false} {...pointLightConfig} shadow-bias={bias} />
        <e.pointLight theatreKey="PointLight10" castShadow={false} {...pointLightConfig} shadow-bias={bias} />
        <e.group theatreKey="Model">
          <Model receiveShadow castShadow envMap={envMap}/>

        </e.group>
        <BakeShadows />
        <AdaptiveDpr pixelated />
        <PerformanceMonitor />
        <EffectComposer>
          {/* <DotScreen angle={0} opacity={0.001} scale={0.8}   /> */}
          <Bloom luminanceThreshold={0} luminanceSmoothing={10} height={300} />
          {/* <DepthOfField focusDistance={1} focalLength={0} bokehScale={3} height={1000} /> */}
          <Vignette eskil={false} offset={0} darkness={1.1} />
            <SMAA />
        </EffectComposer>
        <PerspectiveCamera ref={cameraRef} makeDefault theatreKey='PerspectiveCamera' position={[2, 1, 2]} fov={40} />
      </>
    )
}