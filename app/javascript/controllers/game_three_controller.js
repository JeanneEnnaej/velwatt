import { Controller } from "@hotwired/stimulus"
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Connects to data-controller="game-three"
export default class extends Controller {
  connect() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 5000 );

    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
		const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		const cube = new THREE.Mesh( geometry, material );
    cube.position.z = 5;
    cube.position.y = 53;
    
		scene.add( cube );

    // Instantiate a loader
    const loader = new GLTFLoader();

    // Load a glTF resource
    loader.load('models3D/MapV2.glb', function ( gltf ) {

        camera.position.z = 15; //15
        camera.position.y = 60; //60
        camera.rotateX( - Math.PI * 0.1 );

        let directionalLight = new THREE.DirectionalLight(0xffffff,2.5);
        directionalLight.position.set(0,80,40);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        let light = new THREE.PointLight(0xffffff,1);
        light.position.set(0,300,500);
        //scene.add(light);

        const map = gltf.scene;

        scene.add( map );
        map.rotation.y = Math.PI / 2;

        function animate() {
          requestAnimationFrame( animate );
          map.rotation.z += (0.003);
          renderer.render( scene, camera );
        };

        animate();

      }, undefined, function ( error ) {
        console.log( 'An error happened' );
      }
    );
  }
}