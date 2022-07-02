import { 
    Scene, WebGLRenderer, PerspectiveCamera, LineBasicMaterial, 
    Vector3, BufferGeometry, Line, DirectionalLight
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Cyber from './models/wraith.glb';

const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.set( 0, 1, 2 );
const scene = new Scene();

const loader = new GLTFLoader();
loader.load(Cyber, function(gltf){
    console.log(gltf);
    const model = gltf.scene;
    model.scale.set(0.03, 0.03, 0.03);
    scene.add(gltf.scene);
});

const light = new DirectionalLight();
light.position.set(0, 0, 50);
scene.add(light);

function animate() {
    requestAnimationFrame(animate);
    renderer.render( scene, camera);
}

animate();