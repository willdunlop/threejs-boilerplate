export default class UI {
    constructor() {
        this.HUD = this.createHUD();
    }

    createHUD() {
        const HUD = new THREE.Mesh();

        const axesHelper = new THREE.AxesHelper( 5 );
        axesHelper.name = 'axesHelper'
        axesHelper.position.set(-30,-17,0);
        HUD.add(axesHelper);

        return HUD;
    }

    positionUI(camera) {
        this.HUD.position.copy(camera.position);
        this.HUD.rotation.copy(camera.rotation);
        
        this.HUD.children.forEach(child => {
            if (child.name === 'axesHelper') child.rotation.y = camera.rotation.y;
        })
        
        this.HUD.updateMatrix();
        this.HUD.translateZ( - 50 );
    }


    // createAxesHelper() {
    //     const axesHelper = new THREE.AxesHelper( 5 );
        
    // }
}