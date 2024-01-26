/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
export default function CustomObject() {
    return (
        <mesh >
            <planeGeometry/>
            <meshBasicMaterial  color={0x00f0ff} side={THREE.DoubleSide}/>
        </mesh>
    )
}