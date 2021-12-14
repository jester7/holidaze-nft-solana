import React, { useEffect, useState } from "react";
import CandyMachine from "./CandyMachine";
import "./App.css";

const TWITTER_HANDLE = "JovanJester";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [hasPhantomWallet, setHasPhantomWallet] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [mints, setMints] = useState([]);
  const [isLoadingMints, setIsLoadingMints] = useState(false);
  const [currentNFTName, setCurrentNFTName] =useState(null);
  const [currentNFTUri, setCurrentNFTUri] =useState("https://www.arweave.net/ORjoSwgukTT1dlBYax-Ox_DtAGB8rOfqPxM6lZQaRKY?ext=png");

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
      <h2 className="main-heading">Connect your wallet to get started</h2>
      {hasPhantomWallet && (
        <button
          className="cta-button connect-wallet-button"
          onClick={connectWallet}
        >
          Connect to Phantom Solana Wallet
        </button>
      )}
      {!hasPhantomWallet && (
        <p>
          You need to download the{" "}
          <a rel="noreferrer" target="_blank" href="https://phantom.app">
            Phantom Solana Wallet
          </a>{" "}
          first.
        </p>
      )}
    </div>
  );

  const switchToSection = (section) => {
    setCurrentSection(section);
  };

  const renderInGlobe = (nft) => {
    setCurrentNFTName(nft.name);
    setCurrentNFTUri(nft.uri);
  }

  /* this function is a hack to compensate for some metaplex candy machine errors 
  that occurred silently when uploading assets to arweave */
  const renderItems = (mint) => {
    console.log("render items mint.uri.length", mint.uri.length);
    if (mint.uri.length < 10) {
      return null;
    } else {
      return (<div className="nft-item" key={mint.name} onClick={()=>renderInGlobe(mint)}>
      <img src={mint.uri} alt={`Minted NFT ${mint.name}`} />
    </div>);
    }
    
  };

  const renderMintedItems = () => (
    <div className="nft-container">
      {mints.map((mint) => renderItems(mint)
      )}
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
            <div className="snow-globe-inner">
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
            <div className="snow-globe-rear"></div>
            <img className="nft-display" alt={currentNFTName} src={currentNFTUri} />
            <div className="label">{currentNFTName}</div>
          </div>
        </div>
        <div className="main-container">
          <ul className="navbar section">
            <li
              id="home"
              className={
                currentSection === "home"
                  ? "navbar-item home selected"
                  : "navbar-item home"
              }
            >
              {" "}
              <a href="#home" onClick={() => switchToSection("home")}>
                Home
              </a>{" "}
            </li>
            <li
              id="collection"
              className={
                currentSection === "collection"
                  ? "navbar-item collection selected"
                  : "navbar-item collection"
              }
            >
              {" "}
              <a
                href="#collection"
                onClick={() => switchToSection("collection")}
              >
                Collection
              </a>{" "}
            </li>
            <li
              id="traits"
              className={
                currentSection === "traits"
                  ? "navbar-item traits selected"
                  : "navbar-item traits"
              }
            >
              {" "}
              <a href="#traits" onClick={() => switchToSection("traits")}>
                Traits
              </a>{" "}
            </li>
            <li className="navbar-item twitter icon">
              {" "}
              <a
                className="icon"
                rel="noreferrer"
                target="_blank"
                href={TWITTER_LINK}
              >
                JovanJester
              </a>{" "}
            </li>
            <li className="navbar-item github icon">
              {" "}
              <a
                className="icon"
                rel="noreferrer"
                target="_blank"
                href="https://github.com/jester7/holidaze-nft-solana"
              >
                GitHub
              </a>{" "}
            </li>
          </ul>
          <div
            className={
              currentSection === "home"
                ? "home section visible"
                : "home section hidden"
            }
          >
            <h2 className="main-heading">Home</h2>
            <p>
              The <span className="holidaze">HoliDaze NFT Collection</span> features an adorable, yet occasionally confused
              cast of snowmen&mdash;gingerbread figures and elves could join
              them in the future.
            </p>
            <p>
              These NFTs make the perfect stocking/wallet stuffers. Right
              clicking is <em>highly</em> discouraged.
            </p>
            <p>Mint yours today!</p>
          </div>
          <div
            className={
              currentSection === "collection"
                ? "collection section visible"
                : "collection section hidden"
            }
          >
            <h2 className="main-heading">Collection</h2>
            <p>
              These are all the beautiful Snowmen NFTs from the collection that
              have been minted. <em>Left click</em> on them to see them in their
              full glory inside the snow globe.
            </p>
            {isLoadingMints && (
              <div className="loading-indicator">
                <span className="label">Loading minted NFTs</span>
              </div>
            )}
            {mints.length > 0 && renderMintedItems()}
          </div>
          <div
            className={
              currentSection === "traits"
                ? "traits section visible"
                : "traits section hidden"
            }
          >
            <h2 className="main-heading">Traits</h2>
            <p>
              Legends tell of some mythical black snowmen made with the mixture
              of snow and ashes from a remote Antarctic volcano.
            </p>
            <p>There are many wonderful traits in this collection.</p>
          </div>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && (
            <CandyMachine
              walletAddress={window.solana}
              updateMints={setMints}
              updateIsLoadingMints={setIsLoadingMints}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
