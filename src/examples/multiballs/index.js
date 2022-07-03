import { loadGame } from './game.js';
import { env_camera, env_render, env_animate } from './env.js';

init();
env_animate();

function init() {
    window.addEventListener("resize", onWindowResize, false);
    document.body.appendChild( env_render.domElement ); 

    loadGame();
}

function onWindowResize() {
    env_camera.aspect = window.innerWidth / window.innerHeight;
    env_camera.updateProjectionMatrix();
}



