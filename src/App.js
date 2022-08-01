import logo from './logo.svg';
import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
  darkTheme,
  lightTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import TestingWagmi from './components/TestingWagmi';
import PurposeSetter from './components/PurposeSetter';


const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.rinkeby],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})



function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider  chains={chains} theme={lightTheme({
        borderRadius:'medium',
        accentColor: '#7e9ba3',
        accentColorForeground: 'black',
        overlayBlur:'small'
      }
      )}>
    <div className='main'>
    <header className='title'><b>Wagmi Test</b></header>
    <div className='logIn'>
      <ConnectButton accountStatus="address"/>
    </div>
    <TestingWagmi/>
    <div><PurposeSetter/></div>
    
    </div>
    <div>
      
    </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
