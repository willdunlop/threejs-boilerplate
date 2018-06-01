import constants from '../config/constants';
import UI from './ui';
import Tree from './meshes/tree';

/**
 * @class: Core
 * The Core class acts as the core of the threejs environment. It is in this
 * class that the scene, renderer, camera, controls and lights are all configured 
 */
class Core {
    constructor() {
            this.stats = new Stats();
            this.scene = new THREE.Scene();
            this.renderer = this.configureRenderer();
            this.camera = this.configureCamera();
            this.controls = this.configureControls();
            this.ui = new UI();
    
            this.init();
            this.animate(0);
    }

    /**
     * @function: configureRenderer
     * @returns: {Object}: renderer
     * sets up and configures the renderer object to be used in the 
     * environment.
     */
    configureRenderer() {
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        return renderer;
    }

    /**
     * @function: configureCamera
     * @returns: {Object}: camera
     * sets up and configures the camera object to be used in the 
     * environment.
     */
    configureCamera() {
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000); 
        camera.updateProjectionMatrix();
        camera.position.set(-275,275,250);

        return camera;
    }

    /**
     * @function: configureControls
     * @returns: {Object}: controls
     * sets up and configures the developer control object to be used 
     * in the environment.
     */
    configureControls() {
        const controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.panningMode = THREE.HorizontalPanning;
        controls.minDistance = 40.0;
        controls.maxDistance = 20000.0;
        return controls;

    }

    /**
     * @function: onWindowResize
     * Is triggered by a window resize which will adjust the camera and 
     * renderer size and ration for responsive rendering.
     */
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }



    /**
     * @function: init
     * Initialises the environment. All the pieces of the scene are put
     * together in this function.
     */
    init() {
        /** direct the renderer and UI elements to the container element */
        const container = document.getElementById('container');
        container.appendChild(this.renderer.domElement);
        container.appendChild(this.stats.dom);
        this.camera.lookAt(this.controls.target);

        

        /** Set up lights to be used in the scene */
        const light = new THREE.DirectionalLight(0xffffff, 0.8);
        light.position.set(100, 100, 100)
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;  // default
        light.shadow.mapSize.height = 1024;

        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 400;
        light.shadow.camera.left = -200;
        light.shadow.camera.right = 200;
        light.shadow.camera.top = 200;
        light.shadow.camera.bottom = -200;

        // const shadowHelper = new THREE.CameraHelper(light.shadow.camera);
        // this.scene.add(shadowHelper)

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 0.4 );

        const groundGeo = new THREE.PlaneBufferGeometry(300, 300, 1);
        const groundMat = new THREE.MeshLambertMaterial({ color: 0x0a420d, side: THREE.DoubleSide })
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = - Math.PI * 0.5;
        ground.receiveShadow = true;

        constants.trees.forEach((tree, i) => {
            const treeMesh = new Tree().mesh;
            treeMesh.name = `tree-${i}`
            const { x, y, z } = tree.position;
            treeMesh.position.set(x, y, z)
            this.scene.add(treeMesh);
        })
        
        /** Add all lights, meshes and shaders to the scene */
        this.scene.add(light);
        this.scene.add(hemiLight);
        this.scene.add(ground);
        this.scene.add(this.ui.HUD);
        
        /** Add event listeners for screen resizing */
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    /**
     * @function: animate
     * @param {Number} timestamp: Used to measure the progress of time, a frame counter
     * Used to call upon the render function continuously so a new frame can be drawn
     * allowing for animation
     */
    animate(timestamp) {
        this.renderer.setAnimationLoop(this.render.bind(this));
        this.render(timestamp);
        this.controls.update();
    }

    /**
     * @function: render
     * @param {Number} timestamp: Used to measure the progress of time, a frame counter
     * Draws an image to the screen including any pogressive changes. Uses the 
     * threejs/WebGL renderer to draw an image
     */
    render(timestamp) {
        /** FPS counter */
        this.stats.update();
        this.ui.positionUI(this.camera);

        /** Updates tweenjs animations for each frame */
        // TWEEN.update(timestamp);

        /** Render the scene */
        this.renderer.render(this.scene, this.camera);
    }
}

export default Core;