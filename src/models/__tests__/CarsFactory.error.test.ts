import CarsFactory from "../CarsFactory";

jest.mock('../../components/utils/loaders', () => ({
    loadGLB: () => {
        throw new Error('Test error')
    }
}));

describe('Check the error cases of the class', () => {
    it('should find the error box in the model', async () => {
        const factory = new CarsFactory();
        const porscheGroup = await factory.getPorsche();
        const errorBox = porscheGroup.getObjectByName('Error box')
        expect(errorBox).toBeDefined();
    });

    it('should test the unknown model case', async () => {
        const factory = new CarsFactory();
        let result;
        try {
            await factory.getModelByLabel('');
        } catch (error) {
            result = error;
        }
        expect(result.message).toEqual('Path is not defined');
    })
})