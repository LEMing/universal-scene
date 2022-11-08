import {CAR_MODELS} from "../components/ViewerWrapper/config";
import * as THREE from "three";
import {createBoxOrSphere, loadGLB} from "../components/utils";
import WorldFactory from './WorldFactory';

class CarsFactory extends WorldFactory {
    constructor() {
        super();
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
        return this.dictionary?.find(item => item.label === label)?.value;
    }

    private async loadModel(path: string): Promise<THREE.Object3D> {
        try {
            const car = await loadGLB(path);
            car.name = 'GLB Model';
            return car;
        } catch (error) {
            this.handleError(error, path);
            return Promise.resolve(createBoxOrSphere({name: 'Error box'}));
        }
    }

    private handleError(error, path?: string) {
        if (process.env.NODE_ENV !== 'test') {
            console.error('Cannot load glb model');
            console.debug({error, path});
        }
    }
}

export default CarsFactory;
