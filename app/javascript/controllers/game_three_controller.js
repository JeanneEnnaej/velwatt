import { Controller } from "@hotwired/stimulus"
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ceilPowerOfTwo } from "three/src/math/MathUtils";


// Connects to data-controller="game-three"
export default class extends Controller {
  connect() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 5000 );

    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


    const light = new THREE.DirectionalLight( 0xffffff, 2.5 );
    light.position.set( 0, 340, 160 ); //default; light shining from top
    light.castShadow = true; // default false
    scene.add( light );

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 100; // default

    // Fake BIKE
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
		const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		const cube = new THREE.Mesh( geometry, material );
    cube.position.z = 5;
    cube.position.y = 53;
    
		scene.add( cube );

    // Instantiate a loader
    const loader = new GLTFLoader();

    loader.load('models3D/planetMap.glb', function ( gltf ) {
      const map = gltf.scene;
      map.rotation.y = Math.PI / 2;
      map.receiveShadow = true;
      scene.add( map );
    })

    // Load a glTF resource
    loader.load('models3D/planetTree.glb', function ( gltf ) {

        camera.position.z = 15; //15
        camera.position.y = 60; //60
        camera.rotateX( - Math.PI * 0.1 );

        

        const tree = gltf.scene;

        tree.castShadow = true; //default is false
        tree.receiveShadow = true; //default

        scene.add( tree );
        tree.rotation.y = Math.PI / 2;

        function animate() {
          requestAnimationFrame( animate );
          //tree.rotation.z += (0.003);
          renderer.render( scene, camera );
        };

        animate();

      }, undefined, function ( error ) {
        console.log( 'An error happened' );
      }
    );

    const helper = new THREE.CameraHelper( light.shadow.camera );
    scene.add( helper );
  }
}