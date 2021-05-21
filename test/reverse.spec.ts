import * as fc from 'fast-check';
import reverse from "../src/reverse";
import chai from "chai";

const {expect} = chai;

describe('reverse', () => {
    it('should reverse the array', () => {
        fc.assert(fc.property(fc.array(fc.integer()),
            (array) => {
                const originalArray = [...array];
                reverse(array);
                for (let i = 0; i < originalArray.length; i++) {
                    expect(originalArray[i]).to.eq(array.pop());
                }
            }), {verbose: true});
    });

    it('should work as library reverse', () => {
        fc.assert(fc.property(fc.array(fc.integer()),
            (array) => {
                const originalArray = [...array];
                reverse(array);
                expect(array).to.deep.eq(originalArray.reverse());
            }));
    });
});
