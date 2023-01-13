import '@ethersproject/shims';
import {ethers} from 'ethers';

export default function createWallet(req, res) {
  //craete wallet
  const wallet = ethers.Wallet.createRandom();

  const response = {
    privateKey: wallet.privateKey,
    address: wallet.address,
    mnemonic: wallet._mnemonic().phrase,
  };

  return response;
}
