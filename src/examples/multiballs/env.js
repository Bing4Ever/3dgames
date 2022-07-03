import { 
    PerspectiveCamera,
    Scene, WebGLRenderer
} from 'three';

const env_scene = new Scene();
const env_camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
const env_render = new WebGLRenderer( {alpha: true});

env_camera.position.z = 5;
env_render.setSize( window.innerWidth, window.innerHeight);

function render() {
    env_render.clear();
    env_render.render(env_scene, env_camera);
}

function env_animate() {
    requestAnimationFrame( env_animate );
    render();
}

export {env_scene, env_camera, env_render, env_animate};