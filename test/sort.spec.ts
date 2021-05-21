import * as fc from 'fast-check';
import {sort} from '../src/sort';
import chai from "chai";
import {count} from "./utils";

const {expect} = chai;

describe('sort', () => {

    it('should preserve items', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), data => {
                const sorted = sort(data);
                expect(sorted.length).to.eq(data.length);
                for (const item of data) {
                    expect(count(sorted, item)).to.eq(count(data, item));
                }
            })
        );
    });

    it('should produce ordered array', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), data => {
                const sorted = sort(data);
                for (let idx = 1; idx < sorted.length; ++idx) {
                    expect(sorted[idx - 1]).to.be.at.most(sorted[idx]);
                }
            }), {verbose: true}
        );
    });
});
