import {CAR_MODELS} from "../components/ViewerWrapper/config";
import {SelectorRow} from "../components/ViewerWrapper/types";
import * as THREE from "three";
import {createBox, loadGLB} from "../components/utils";

class CarsFactory {
    private dictionary: SelectorRow[];
    constructor() {
        this.dictionary = CAR_MODELS;
    }
    public async getModelByLabel(label: string) {
        const path = this.getModelPathByLabel(label);
        if (!path) {
            throw new Error('Path is not defined');
        }
        const group = new THREE.Group();
        group.name = label;
        const model = await this.loadModel(path);
        group.add(model);
        return group;
    }

    private getModelPathByLabel(label: string) {
        return this.dictionary.find(item => item.label === label)?.value;
    }

    private async loadModel(path: string): Promise<THREE.Object3D> {
        try {
            const car = await loadGLB(path);
            car.name = 'GLB Model';
            return car;
        } catch (error) {
            this.handleError(error, path);
            return Promise.resolve(createBox({name: 'Error box'}));
        }
    }

    private handleError(error, path?: string) {
        console.error('Cannot load glb model');
        console.debug({error, path});
    }

    public async getDatsun() {
        return this.getModelByLabel('Datsun');
    }

    public async getPorsche() {
        return this.getModelByLabel('Porsche');
    }

    public async getTruck() {
        return this.getModelByLabel('Truck');
    }

}

export default CarsFactory;
