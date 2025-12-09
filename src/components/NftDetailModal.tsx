import React, { useState } from "react";
import "../styles/NftDetailModal.css";

interface NFTModalProps {
    nft: any;
    onClose: () => void;
    owner: string;
}

const NFTModal: React.FC<NFTModalProps> = ({ nft, onClose, owner }) => {
    if (!nft) return null;
    const [liked, setLiked] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        tags: "",
    });

    const shortenAddress = (addr: string) => addr.slice(0, 6) + "..." + addr.slice(-4);

    const handleCopy = () => {
        navigator.clipboard.writeText(owner);
        alert("Address copied!");
    };

    const handleTouch = () => {
        setLiked((prev) => !prev);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted NFT:", formData);
        alert("Your story is spreading on-chain");
    };

    return (
        <div className="nft-modal-overlay" onClick={onClose}>
            <div className="nft-modal-wrapper" onClick={(e) => e.stopPropagation()}>

                <div className="nft-modal-container">
                    <div className="nft-modal-image-wrapper">
                        <img src={nft.metadata.image} alt={nft.metadata.name} className="nft-modal-image" />
                    </div>

                    <div className="nft-modal-info">
                        <div className="nft-modal-header">
                            <h1 className="nft-modal-title">{nft.metadata.name}</h1>
                            <button className="nft-modal-close" onClick={onClose}>✖</button>
                        </div>

                        <div className="nft-modal-owner-row">
                            <p className="nft-modal-owner">
                                Owned by <span className="owner-address">{shortenAddress(owner)}</span>
                            </p>
                            <div className="nft-owner-icons">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="25" fill="white" className="bi bi-globe" viewBox="0 0 16 16">
                                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="25" fill="white" className="bi bi-copy" viewBox="0 0 16 16" onClick={handleCopy}>
                                    <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                                </svg>
                                {liked ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="25" fill="currentColor" className="bi bi-suit-heart" viewBox="0 0 16 16" onClick={handleTouch}>
                                        <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                                    </svg>

                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="25" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16" onClick={handleTouch}>
                                        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1" />
                                    </svg>
                                )}
                            </div>
                        </div>

                        <div className="nft-modal-description">
                            <h3>Description</h3>
                            <p>{nft.metadata.description || "No description available."}</p>
                        </div>

                        <div className="nft-modal-tabs">
                            <div className="nft-tab">Register</div>
                        </div>

                        <form className="nft-register-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price (IP)</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    step="0.01"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="tags">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <button type="submit" className="submit-button">Spread</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NFTModal;
