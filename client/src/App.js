import React, { useState } from 'react';
import './App.css';

import { useWeb3Network } from '@openzeppelin/network/react';
import Counter from './components/Counter.js';

function App() {
  const web3Context = useWeb3Network('http://pool0.eth-fork.io:8545');
  
  // load Counter json artifact
  let counterJSON = undefined;
  try {
    // see https://github.com/OpenZeppelin/solidity-loader
    counterJSON = require('../../contracts/Counter.sol');
  } catch (e) {
    console.log(e);
  }

  // load Counter instance
  const [counterInstance, setCounterInstance] = useState(undefined);
  let deployedNetwork = undefined;
  if (!counterInstance && web3Context && counterJSON && counterJSON.networks && web3Context.networkId) {
    deployedNetwork = counterJSON.networks[web3Context.networkId.toString()];
    if (deployedNetwork) {
      setCounterInstance(new web3Context.lib.eth.Contract(counterJSON.abi, deployedNetwork.address));
    }
  }

  return (
    <div className="App">
      <div>
        <h1>OpenZeppelin Solidity Hot Loader</h1>
        <div>
          <Counter {...web3Context} JSON={counterJSON} instance={counterInstance} deployedNetwork={deployedNetwork} />
        </div>
      </div>
    </div>
  );
}

export default App;
