/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import * as THREE from 'three';
import {getProject} from '@theatre/core'
import { SheetProvider} from '@theatre/r3f';
import statefinal from '../public/json/state-final.json'
import './style.css'
const demoSheet = getProject('Demo Project',{state:statefinal}).sheet('Demo Sheet')

function App() {
  return (
    <>
      <header className="header">
        <a id="porsche-logo" href="https://www.porsche.com/" target="_blank" rel="noreferrer">
          <svg  width="730" height="36" viewBox="0 0 730 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd"  clipRule="evenodd" d="M181.963 26.4044H116.827C115.831 26.4044 114.844 25.7445 113.848 24.4205V11.4881C113.848 9.50427 114.831 8.50818 116.827 8.50818H181.963C182.286 8.84851 182.772 9.01038 183.444 9.01038C184.44 9.68273 184.938 10.5045 184.938 11.4923V24.4247L181.963 26.4044ZM80.039 13.4886H10.9361V8.51233H80.039L83.0355 10.5086L80.039 13.4886ZM288.336 12.4883C288.008 13.1648 287.51 13.4886 286.85 13.4886H218.253V8.51233H286.846C287.505 8.51233 288.331 9.18884 289.327 10.5086C288.991 11.1685 288.655 11.8284 288.336 12.4883ZM92.9673 7.51626C92.9673 2.55247 90.4729 0.058136 85.5133 0.058136H0V35.3649H10.9361V21.4448H85.5133C90.4771 21.4448 92.9673 18.7968 92.9673 13.4886V7.51626ZM194.38 7.51626C194.38 2.55247 191.886 0.058136 186.926 0.058136H110.863C105.887 0.058136 103.405 2.55247 103.405 7.51626V26.9066C103.405 32.5427 105.887 35.3649 110.863 35.3649H186.926C191.886 35.3649 194.38 32.5427 194.38 26.9066V7.51626ZM300.268 24.9227C300.268 22.9306 299.267 20.9467 297.288 18.9504C299.267 17.9668 300.268 16.1448 300.268 13.4886V7.51626C300.268 2.55247 297.607 0.058136 292.312 0.058136H207.803V35.3649H218.257V21.4448H285.854C286.177 21.7643 286.837 22.3454 287.837 23.1837C288.834 24.018 289.336 24.7608 289.336 25.4083V35.3608H300.272L300.268 24.9227ZM404.673 21.4448C404.673 16.1448 402.013 13.4886 396.721 13.4886H325.12C324.46 13.4886 323.46 12.505 322.14 10.5086L323.377 9.26768C323.601 9.0303 323.871 8.84096 324.171 8.71112C324.47 8.58127 324.793 8.51364 325.12 8.51233H404.669V0.058136H319.658C314.682 0.058136 312.2 2.55247 312.2 7.51626V13.4886C312.2 18.801 314.682 21.4448 319.658 21.4448H391.239C393.227 21.4448 394.223 22.4408 394.223 24.4247C393.899 24.7608 393.476 25.18 392.982 25.6656C392.757 25.9017 392.487 26.0894 392.187 26.2172C391.887 26.3449 391.565 26.41 391.239 26.4085H312.204V35.3649H396.721C402.013 35.3649 404.673 32.5427 404.673 26.9066V21.4448ZM509.062 26.4044H430.028L428.529 24.4205V11.4881C428.529 10.5045 429.023 9.50426 430.028 8.50818H509.062V0.0539562H425.554C420.237 0.0539562 417.593 2.54832 417.593 7.51211V26.9024C417.593 32.5386 420.237 35.3608 425.554 35.3608H509.062V26.4044ZM611.476 0.0539562H601.536V13.4844H529.934V0.0539562H519.5V35.3608H529.934V21.4406H601.536V35.3608H611.476V0.0539562ZM716.865 26.4044H634.846V21.4448H716.865V13.4886H634.846V8.51233H716.865V0.058136H623.914V35.3649H716.865V26.4044ZM724.489 0C721.717 0 719.567 2.15404 719.567 4.91816C719.567 7.68227 721.717 9.84043 724.489 9.84043C727.27 9.84043 729.411 7.68227 729.411 4.91816C729.411 2.15404 727.27 0 724.489 0ZM724.489 0.701431C726.871 0.701431 728.648 2.56907 728.648 4.9223C728.648 7.27969 726.871 9.13903 724.489 9.13903C722.107 9.13903 720.339 7.27969 720.339 4.9223C720.339 2.56492 722.107 0.701431 724.489 0.701431ZM723.414 5.23771H724.589L726.187 7.75697H727.004L725.311 5.23771C726.083 5.10075 726.747 4.65254 726.747 3.64816C726.747 2.62718 726.17 2.07516 724.892 2.07516H722.713V7.75697H723.418L723.414 5.23771ZM723.414 4.64008V2.67283H724.697C725.385 2.67283 726.041 2.85959 726.041 3.65231C726.041 4.61933 725.199 4.64008 724.34 4.64008H723.414Z" fill="white"/>
          </svg>
        </a>
        <div className="right">
          <div className="build-price">BUILD & PRICE</div>
          <div className="current-offers">CURRENT OFFERS</div>
          <div className="menu">
            <svg width="176" height="37" viewBox="0 0 176 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="176" height="10" rx="5" fill="white"/>
            <rect y="27" width="176" height="10" rx="5" fill="white"/>
            </svg>
          </div>
        </div>
      </header>
      <div className = "circleScroll">
        <div className="knob">
        </div>
        <div className="circle">
        </div>
      </div>
      <div className="centerText">
        SCULPTED FOR <i>SPEED</i>,<br/>BORN TO <strong>DOMINATE</strong>.
      </div>
      <div className="readMore">
      Porsche models are crafted for <br/>precision, performance, and elegance.<br/><br/><br/><a href="https://www.porsche.com/middle-east/_india_/"> READ MORE</a>
      </div>
      <footer className="footer">
        <div className="mouse">
        </div>
        <div className="share">
          SHARE
        </div>
        <div className="reset">
          RESET
        </div>
      </footer>
      <Canvas onCreated={state => {
        state.gl.toneMapping = THREE.ReinhardToneMapping }}
        shadows
        gl={{
          preserveDrawingBuffer: true
        }}
        >
          <SheetProvider sheet={demoSheet}>
            <Experience/>
          </SheetProvider>
      </Canvas>
    </>
  )
}

export default App
