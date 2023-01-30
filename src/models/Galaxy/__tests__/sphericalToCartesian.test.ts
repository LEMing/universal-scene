import {sphericalToCartesian} from '../utils';

describe('sphericalToCartesian', () => {
  it('Should check North pole coordinates', () => {
    const point1 = sphericalToCartesian(1, 0, Math.PI);
    const coords = `${point1.x}|${point1.y}|${point1.z}|`
    expect(coords).toEqual('0|0|1|');
  })

  it('Should check South pole coordinates', () => {
    const point1 = sphericalToCartesian(1, Math.PI, 0);
    const coords = `${point1.x}|${point1.y}|${point1.z}|`
    expect(coords).toEqual('1.2246467991473532e-16|0|-1|');
  })
});
