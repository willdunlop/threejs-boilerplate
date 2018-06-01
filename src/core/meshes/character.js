export default class Character {
    constructor() {
        this.mesh = this.createCharacter();
        this.animation;
    }

    createCharacter() {
        const charGeo = new THREE.BoxBufferGeometry(10,20,10);
        const charMat = new THREE.MeshPhongMaterial({ color: 0xdd3333 })
        const char = new THREE.Mesh(charGeo, charMat);
        char.castShadow = true;
        return char;
    }
}