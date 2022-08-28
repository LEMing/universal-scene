import CarsFactory from "../CarsFactory";
import * as THREE from 'three';

const mockObject3D = new THREE.Object3D();
jest.mock('../../components/utils/loaders', () => ({
    loadGLB: () => {
        return Promise.resolve(mockObject3D)
    },
}));

describe('Check the CarsFactory', () => {
    it('should check the Datsun model', async () => {
        const factory = new CarsFactory();
        const car = await factory.getDatsun();
        expect(car.name).toEqual('Datsun');
    });

    it('should check the Truck model', async () => {
        const factory = new CarsFactory();
        const car = await factory.getTruck();
        expect(car.name).toEqual('Truck');
    });

    it('should check the Porsche model', async () => {
        const factory = new CarsFactory();
        const car = await factory.getPorsche();
        expect(car.name).toEqual('Porsche');
    });


})