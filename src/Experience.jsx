/* eslint-disable react/no-unknown-property */
import {useFrame} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
export default function Experience() {
    useFrame((state, delta) => {
        // console.log(' ')
        console.log('state', state)
        console.log('delta', delta)
    })
    return (
    <>
        <OrbitControls/>
        <directionalLight position={[1,2,3]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        <mesh>
            <sphereGeometry/>
            <meshStandardMaterial  flatShading={false}/>
        </mesh>
    </>
    )
}