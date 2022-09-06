import { Controller } from "@hotwired/stimulus"
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ceilPowerOfTwo } from "three/src/math/MathUtils";


// Connects to data-controller="test"
export default class extends Controller {
  connect() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 5000 );

    camera.position.x = 0; //15
    camera.position.z = 15; //15
    camera.position.y = 60; //60
    camera.rotateX( - Math.PI * 0.1 );

    scene.add(camera);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight( 0xffffff, 1);
    light.position.set( 20, 60, 60 ); //default; light shining from top
    light.castShadow = true; // default false

    light.shadow.camera.left = -3000;
    light.shadow.camera.right = 3000;
    light.shadow.camera.top = 3500;
    light.shadow.camera.bottom = -3000;

    scene.add( light );

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512*40; // default
    light.shadow.mapSize.height = 512*40; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 4000; // default
    light.shadow.normalBias = -0.1;

    const material = new THREE.MeshStandardMaterial({color: 0x395730});
    material.roughness = 0.7;

    const cylinderR = new THREE.Mesh(
      new THREE.CylinderGeometry(51.8, 51.8, 35, 150),
      material
    );

    cylinderR.receiveShadow = true;
    cylinderR.rotation.x = - Math.PI * 0.5;
    cylinderR.rotation.z = - Math.PI * 0.5;
    cylinderR.position.y = - 2;
    cylinderR.position.x = 20;

    const cylinderL = new THREE.Mesh(
      new THREE.CylinderGeometry(51.8, 51.8, 35, 150),
      material
    );

    cylinderL.receiveShadow = true;
    cylinderL.rotation.x = - Math.PI * 0.5;
    cylinderL.rotation.z = - Math.PI * 0.5;
    cylinderL.position.y = - 2;
    cylinderL.position.x = -20;

    scene.add(cylinderR, cylinderL);

    const loader = new GLTFLoader();
    loader.load('planetTree.glb', function ( gltf ) {
      const tree = gltf.scene;
      tree.rotation.y = Math.PI / 2;
      tree.traverse(function (node) {
        if (node.isMesh)
          node.castShadow = true;
      })
      scene.add( tree );


      function animate() {
        requestAnimationFrame( animate );
        tree.rotation.z += (0.003);
        cylinderL.rotation.x += (0.003);
        cylinderR.rotation.x += (0.003);
        renderer.render( scene, camera );
      };

      animate();
    });
  };
};
