import {
    PerspectiveCamera, GridHelper, DirectionalLight, Color, HemisphereLight,
    Scene, WebGLRenderer, Mesh, BoxGeometry, MeshBasicMaterial, TextureLoader, SphereGeometry, MeshPhongMaterial, AnimationMixer, Clock, AnimationClip,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CubeTexture from './../../../asset/texture/texture-background.jpg';
import Cyber from './../../../asset/models/Soldier.glb';

// Scene
const env_scene = new Scene();
env_scene.background = new Color(0xa8def0);

// Camera
const env_camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
env_camera.position.set(0, 5, 5);
env_camera.lookAt(0, 0, 0);

// Render
const env_render = new WebGLRenderer({ antialias: true });
env_render.setPixelRatio(window.devicePixelRatio);
env_render.setSize(window.innerWidth, window.innerHeight);

// Controls
const env_control = new OrbitControls(env_camera, env_render.domElement);
env_control.enableDamping = true;
env_control.minDistance = 5;
env_control.maxDistance = 15;
env_control.enablePan = false;
env_control.maxPolarAngle = Math.PI /2 -0.05;
env_control.update();

// Key Events
const keysPressed = {};
const keyDisplayQueue = new KeyDisplay();
document.addEventListener('keydown', (event) => {
    keyDisplayQueue.down(event.key);
    keysPressed[event.key.toLowerCase()] = true;
}, false);
document.addEventListener('keyup', (event) => {
    keyDisplayQueue.up(event.key);
    keysPressed[event.key.toLowerCase()] = false;
}, false);

let mixer;
const loader = new GLTFLoader();
const clock = new Clock();

loader.loadAsync(Cyber).then((gltf) => {
    const model = gltf.scene;
    model.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = true;
        }
    });
    env_scene.add(model);

    const animations = gltf.animations;
    const mixer = new AnimationMixer(model);
    const animationMap = new Map();
    animations.filter( a => a.name != 'TPose').forEach(element => {
        animationMap.set(element.name, mixer.clipAction(element))
    });
});

const dirLight = new DirectionalLight(0xffffff);
dirLight.position.set(- 3, 10, - 10);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 2;
dirLight.shadow.camera.bottom = - 2;
dirLight.shadow.camera.left = - 2;
dirLight.shadow.camera.right = 2;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 40;
env_scene.add(dirLight);
//env_scene.add(light);
env_scene.add(new GridHelper(6, 16, 0x888888, 0x444444));
env_scene.background = new Color(0xffffff);
function render() {
    env_render.clear();
    env_render.render(env_scene, env_camera);
}


function env_animate() {
    requestAnimationFrame(env_animate);
    render();
}

export { env_scene, env_camera, env_render, env_animate };