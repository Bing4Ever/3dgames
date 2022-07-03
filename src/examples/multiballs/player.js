import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";
import { env_scene, env_camera } from "./env";

export const Player = function(playerId) {
    this.playerId = playerId;
    this.isMain = false;
    this.mesh;

    const cube_geometry = new BoxGeometry(1, 1, 1, 1);
    const cube_matria = new MeshBasicMaterial(
        {
            color: 0x7777ff,
            wireframe: false
        }
    );

    const scope =this;

    this.init = function() {
        scope.mesh = new Mesh(cube_geometry, cube_matria);
        scope.mesh.position.x = 1.5;
        scope.mesh.position.y = 1.5;
        scope.mesh.position.z = 1.5;
        env_scene.add(scope.mesh);
        if (this.isMain) {
        }
    }

    this.setOrientation = function(position, rotation) {
        if (scope.mesh) {
            scope.mesh.position.copy = position;
            scope.mesh.rotation.copy = rotation;
        }
    }
}

