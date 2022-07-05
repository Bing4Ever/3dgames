import { env_camera, env_render, env_animate, env_scene } from './env';

init();
env_animate();

function init() {    
    window.addEventListener("resize", onWindowResize, false);
    document.body.appendChild( env_render.domElement );     
}

function onWindowResize() {
    env_camera.aspect = window.innerWidth / window.innerHeight;
    env_camera.updateProjectionMatrix();
}



