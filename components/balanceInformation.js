import React, {useEffect, useState} from 'react';
import {ethers, providers} from 'ethers';
import {Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants';
export const balanceInformation = async address => {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    'https://eth-goerli.g.alchemy.com/v2/NmShLyLunzQEWmshUdHRDRRWReqIhmAR',
  );

  const balance = (await provider.getBalance(address)).toString();
  const formatted = ethers.utils.formatUnits(balance, 'ether');

  return formatted;
};

export const MainBalanceInfo = async address => {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    'https://eth-mainnet.g.alchemy.com/v2/JWDQNWpuTdABpcaT8qe5vdvEw7KPdl-T',
  );

  const balance = (await provider.getBalance(address)).toString();
  const formatted = ethers.utils.formatUnits(balance, 'ether');

  return formatted;
};

export function SwitchButton() {
  const [provider, setProvider] = useState(
    new ethers.providers.StaticJsonRpcProvider('mainnet'),
  );
  const [network, setNetwork] = useState('mainnet');

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (network === 'mainnet') {
            setProvider(
              new ethers.providers.StaticJsonRpcProvider(
                'https://eth-goerli.g.alchemy.com/v2/NmShLyLunzQEWmshUdHRDRRWReqIhmAR',
              ),
            );
            setNetwork(<Text style={{color: 'orange'}}>Goerli</Text>);
          } else {
            setProvider(
              new ethers.providers.StaticJsonRpcProvider(
                'https://eth-mainnet.g.alchemy.com/v2/JWDQNWpuTdABpcaT8qe5vdvEw7KPdl-T',
              ),
            );
            setNetwork(<Text style={{color: COLORS.green}}>Mainnet</Text>);
          }
        }}>
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            backgroundColor: COLORS.white,
            borderRadius: 20,
            width: 120,
            textAlign: 'center',
          }}>
          {network}
          {console.log(provider)}
          {console.log(network)}
        </Text>
      </TouchableOpacity>
    </>
  );
}

// export function SwitchButtonLogic() {
//   const [provider, setProvider] = useState(
//     new ethers.providers.StaticJsonRpcProvider('mainnet'),
//   );
//   const [network, setNetwork] = useState('mainnet');

//   if (network === 'mainnet') {
//     setProvider(
//       new ethers.providers.StaticJsonRpcProvider(
//         'https://eth-goerli.g.alchemy.com/v2/NmShLyLunzQEWmshUdHRDRRWReqIhmAR',
//       ),
//     );
//     setNetwork('testnet');
//   } else {
//     setProvider(
//       new ethers.providers.StaticJsonRpcProvider(
//         'https://eth-mainnet.g.alchemy.com/v2/JWDQNWpuTdABpcaT8qe5vdvEw7KPdl-T',
//       ),
//     );
//     setNetwork('mainnet');
//   }

//   return network;
// }
