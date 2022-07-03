import { 
    SphereGeometry, MeshNormalMaterial, Mesh, Scene
} from 'three'
import { env_scene } from './env';
import { Player } from './player';

export function loadGame() {
    loadEnvironment();

    const player = new Player("1");
    player.init();
}

function loadEnvironment() {
    const sphere_geometry = new SphereGeometry();
    const sphere_metrai = new MeshNormalMaterial();
    const sphere = new Mesh (sphere_geometry, sphere_metrai);
    env_scene.add(sphere);
}