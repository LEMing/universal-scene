import CarsFactory from "../CarsFactory";
import * as THREE from 'three';

const mockObject3D = new THREE.Object3D();
jest.mock('tiny-viewer/src/utils/loaders', () => ({
    loadGLB: () => {
        return Promise.resolve(mockObject3D)
    },
}));

describe('Check the CarsFactory', () => {
    it('should check the Datsun model', async () => {
        const factory = new CarsFactory();
        const car = await factory.getModelByLabel('Datsun');
        expect(car.name).toEqual('Datsun');
    });

    it('should check the Truck model', async () => {
        const factory = new CarsFactory();
        const car = await factory.getModelByLabel('Truck');
        expect(car.name).toEqual('Truck');
    });

    it('should check the Porsche model', async () => {
        const factory = new CarsFactory();
        const car = await factory.getModelByLabel('Porsche');
        expect(car.name).toEqual('Porsche');
    });


})
