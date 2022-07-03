import {
    PerspectiveCamera, GridHelper, DirectionalLight, Color, HemisphereLight,
    Scene, WebGLRenderer, Mesh, BoxGeometry, MeshBasicMaterial, TextureLoader, SphereGeometry, MeshPhongMaterial, AnimationMixer, Clock,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CubeTexture from './../../../asset/texture/texture-background.jpg';
import Cyber from './../../../asset/models/Soldier.glb';

const env_scene = new Scene();
const env_camera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
const env_render = new WebGLRenderer({ antialias: true });
const env_control = new OrbitControls(env_camera, env_render.domElement);
const hemiLight = new HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 20, 0);
env_scene.add(hemiLight);
env_render.setPixelRatio(window.devicePixelRatio);
env_render.setSize(window.innerWidth, window.innerHeight);
env_camera.position.set(0, 5, 5);
env_camera.lookAt(0, 0, 0);
const texture = new TextureLoader().load(CubeTexture);
const env_cube = new Mesh(new BoxGeometry(), new MeshBasicMaterial({ map: texture }));
env_cube.position.x -= 2;
env_scene.add(env_cube);

const env_sphere = new Mesh(new SphereGeometry(0.75, 32, 32), new MeshPhongMaterial({ color: 0x00ff00 }));
env_sphere.position.x += 2;
env_scene.add(env_sphere);
let mixer;
const loader = new GLTFLoader();
const clock = new Clock();

loader.loadAsync(Cyber).then((gltf) => {
    const model = gltf.scene;
    mixer = new AnimationMixer(model);
    const animations = gltf.animations;
    const runAction = mixer.clipAction(animations[1]);

    runAction.play();
    env_scene.add(model);
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
    env_cube.rotation.y += 0.02;
    const date = clock.getDelta();
    mixer.update(date);
    render();
}

export { env_scene, env_camera, env_render, env_animate };