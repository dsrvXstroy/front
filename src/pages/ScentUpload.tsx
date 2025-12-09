import { useEffect, useState } from "react";
import { usePrivy } from '@privy-io/react-auth';
import React from 'react';
import NFTModal from "components/NftDetailModal";
import '../styles/ScentUpload.css';

const ScentUpload: React.FC = () => {
  const { user } = usePrivy();
  const [nfts, setNfts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userAddress = user?.wallet?.address;
  const apikey = process.env.REACT_APP_ALCHEMY_API_KEY;

  // https://story-aeneid.g.alchemy.com/v2/IH0ZKrqp3vm-l-Rds6z9P9VBi32_IHGXF
  // Aeneid Testnet Alchemy endpoint
  const url = `https://story-aeneid.g.alchemy.com/v2/${apikey}/getNFTsForOwner?owner=${userAddress}&withMetadata=true&pageSize=100`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!userAddress) return;

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setNfts(data.ownedNfts || []);
      } catch (err) {
        console.error("Error fetching NFTs:", err);
      }
    };

    fetchNFTs();
  }, [userAddress, url]);

  const filteredNFTs = nfts.filter((nft) =>
    nft?.metadata?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (nft: any) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNFT(null);
  };

  return (
    <>
      {user?.wallet?.address && (
        <div className="scent-after-hero">
          <svg className="loading" version="1.1" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="1174.558px" height="190px" viewBox="-150 0 1274.558 120" enableBackground="new 0 0 1274.558 120" xmlSpace="preserve">
            <defs>
              <pattern id="water" width=".25" height="1.1" patternContentUnits="objectBoundingBox">
                <path fill="#fff" d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z" />
              </pattern>

              <text id="text" transform="matrix(1 0 0 1 -8.0684 116.7852)" fontSize="161.047">SCENT ONCHAIN</text>

              <mask id="text_mask">
                <use x="0" y="0" xlinkHref="#text" opacity="1" fill="#92847a" />
              </mask>
            </defs>

            <use x="0" y="0" xlinkHref="#text" fill="#92847a" />

            <rect className="water-fill" mask="url(#text_mask)" fill="url(#water)" x="-400" y="0" width="1600" height="120" />
          </svg>
        </div>
      )}
      <div className="scent-upload-section">
        {!user?.wallet?.address ? (
          <div className="scent-before-login">
            <h2>SPREAD YOUR STORY ONCHAIN</h2>
            <p>Please connect your wallet to view your NFTs.</p>
          </div>
        ) : (
          <div className="scent-after-login">
            <div className="nft-top-bar">
              <div className="nft-menu">
                <button>Galleries</button>
                <button>NFTs</button>
                <button>Listings</button>
                <button>Offers</button>
                <button>Portfolio</button>
                <button>Activity</button>
              </div>

              <div className="nft-search-container">
                <input
                  type="text"
                  placeholder="Search NFTs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="nft-search-input"
                />
              </div>
            </div>

            {filteredNFTs.length === 0 ? (
              <p>No NFTs found.</p>
            ) : (
              <div className="nft-upload-grid">
                {filteredNFTs.map((nft, index) => (
                  <div className="nft-upload-card" key={index} onClick={() => openModal(nft)}>
                    <img
                      src={nft?.metadata?.image}
                      alt={nft?.metadata?.name}
                      className="nft-upload-image"
                    />
                    <p className="nft-upload-name">{nft?.metadata?.name || 'Unnamed NFT'}</p>
                    <p className="nft-upload-check">OnStudio</p>
                  </div>
                ))}
              </div>

            )}
          </div>
        )}
      </div>
      {isModalOpen && (
        <NFTModal nft={selectedNFT} onClose={closeModal} owner={userAddress!} />
      )}
    </>
  );
};

export default ScentUpload;
