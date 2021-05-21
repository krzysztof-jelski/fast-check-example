import * as fc from 'fast-check';
import {
    createMockProvider,
    deployContract,
    getWallets,
    solidity
} from "ethereum-waffle";
import chai from 'chai';
import {BigNumber} from 'ethers/utils';

import MultiplyingToken from '../build/MultiplyingToken.json';

chai.use(solidity);
const {expect} = chai;

function toEthBn(amount: bigint) {
    return new BigNumber(amount.toString());
}

describe('token transfer', () => {
    let provider = createMockProvider();
    let [mainWallet, receiver] = getWallets(provider);
    let token;

    it('balance from constructor', async () => {
        await fc.assert(
                fc.asyncProperty(
                fc.bigUint(),
                async (walletFromInitial: bigint) => {
                    token = await deployContract(mainWallet, MultiplyingToken, [mainWallet.address, (toEthBn(walletFromInitial))]);
                    let walletFromBalanceAfterTransfer = await token.balanceOf(mainWallet.address);
                    expect(toEthBn(walletFromBalanceAfterTransfer)).to.equal(toEthBn(walletFromInitial));
                }),
            {numRuns: 50}
        );
    });


    it('doubles the transfer amount', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.tuple(fc.bigUint().noShrink(), fc.bigUint().noShrink())
                    .filter(tuple => tuple[0] >= tuple[1] && tuple[1] > 0),
                async ([supply, transferAmount]) => {
                    token = await deployContract(mainWallet, MultiplyingToken, [mainWallet.address, (toEthBn(supply))]);

                    await token.transfer(receiver.address, toEthBn(transferAmount));

                    let receiverBalance = await token.balanceOf(receiver.address);
                    expect(receiverBalance).to.equal(toEthBn(transferAmount).mul(2));
                }),
            {numRuns: 30, verbose: true, timeout: 100}
        );
    })
});
