import React, { useEffect, useState } from "react";
import CandyMachine from "./CandyMachine";
import "./App.css";

const TWITTER_HANDLE = "JovanJester";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [hasPhantomWallet, setHasPhantomWallet] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  // const [machineStats, setMachineStats] = useState(null);
  const [mints, setMints] = useState([]);
  const [isLoadingMints, setIsLoadingMints] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          setHasPhantomWallet(true);
          console.log("Phantom wallet found! wagmi!");
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        setHasPhantomWallet(false); // No solana phantom wallet found
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <div className="section not-connected">
      <h2 className="main-heading">Connect your Solana wallet to get started</h2>
      {hasPhantomWallet && <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Phantom Wallet
    </button>}
    {!hasPhantomWallet && <p>You need to download the <a rel="noreferrer" target="_blank" href="https://phantom.app">Phantom Solana Wallet</a> first.</p>}
    </div>
  );

  const switchToSection = (section) => {
    setCurrentSection(section);
  };

  // const renderMissingWalletContainer = () => (
  //   <div className="section no-wallet error">
  //     <h2 className="main-heading">NO wallet found</h2>
  //   </div>
  // );


const renderMintedItems = () => (
  <div className="nft-container">
      {mints.map((mint) => (
        <div className="nft-item" key={mint}>
          <img src={mint} alt={`Minted NFT ${mint}`} />
        </div>
      ))}
  </div>
);

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">
            <span className="holidaze-wrapper">
              <span className="holidaze candycane start">Holi</span>
              <span className="holidaze candycane end">Daze</span>
            </span>
            <span className="subheader">NFT Collection</span>
          </p>
          <div className="snow-globe">
            <div className="falling-snow">
              <span className="snowflake">❄</span>
              <span className="snowflake">❄</span>
              <span className="snowflake">❄</span>
              <span className="snowflake">❄</span>
              <span className="snowflake">❄</span>
              <span className="snowflake">❄</span>
              <span className="snowflake">❄</span>
              <span className="snowflake">❄</span>
              <span className="snowflake">❄</span>
              <span className="snowflake">❄</span>
            </div>
      </div>
        </div>
        <div className="main-container">
          <ul className="navbar section">
            <li id="home" className={currentSection === "home" ? "navbar-item home selected" : "navbar-item home"}> <a href="#home" onClick={() => switchToSection("home")}>Home</a> </li>
            <li id="collection" className={currentSection === "collection" ? "navbar-item collection selected" : "navbar-item collection"}> <a href="#collection" onClick={() => switchToSection("collection")}>Collection</a> </li>
            <li id="traits" className={currentSection === "traits" ? "navbar-item traits selected" : "navbar-item traits"}> <a href="#traits" onClick={() => switchToSection("traits")}>Traits</a> </li>
            <li className="navbar-item twitter icon"> <a className="icon" rel="noreferrer" target="_blank" href={TWITTER_LINK}>JovanJester</a> </li>
            <li className="navbar-item github icon"> <a className="icon" href="#github">GitHub</a> </li>

          </ul>
          <div className={currentSection === "home" ? "home section visible" : "home section hidden"}><h2 className="main-heading">Home</h2>
          <p>The <span className="holidaze">HoliDaze NFT Collection</span> features an adorable, yet occasionally confused cast of snowmen, gingerbread figures, and elves.</p>
          <p>These NFTs make the perfect stocking/wallet stuffers.</p>
          <p>Right clicking is highly discouraged. Mint yours today!</p>
          {walletAddress && <CandyMachine walletAddress={window.solana} updateMints={setMints} updateIsLoadingMints={setIsLoadingMints} />}
          </div>
          <div className={currentSection === "collection" ? "collection section visible" : "collection section hidden"}><h2 className="main-heading">Collection</h2>
          <p>Here are all the NFTs from the collection that have already been minted.</p>
          {isLoadingMints && <div className="loading-indicator"><span className="label">Loading minted NFTs</span></div>}
          {mints.length > 0 && renderMintedItems()}
      
          </div>
          <div className={currentSection === "traits" ? "traits section visible" : "traits section hidden"}><h2 className="main-heading">Traits</h2>
          <p>There are many wonderful traits in this collection.</p>          
          </div>
          {!walletAddress && renderNotConnectedContainer()}

          
        </div>
      </div>
    </div>
  );
};

export default App;
