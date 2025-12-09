import React, { useState, useEffect } from "react";
import "../styles/MyStudio.css";
import { internalTabs } from "../constants/myPageTabs";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaHeart,
  FaLock,
  FaUnlock,
  FaShoppingCart,
  FaEye,
  FaPlus,
  FaTag,
  FaImage,
  FaDollarSign,
  FaList,
} from "react-icons/fa";

// NFT 데이터 인터페이스
interface NFTData {
  idx: number;
  userAddress: string;
  imageLink: string;
  imageName: string;
  description: string;
  price: number;
  tags: string;
  category: string;
  createdAt?: string;
  isListed?: boolean;
  isPrivate?: boolean;
  isPurchased?: boolean;
  isFavorite?: boolean;
  likes?: number;
}

// 사용자 프로필 인터페이스
interface UserProfile {
  nickname: string;
  profileUrl: string;
  bio: string;
  walletAddress: string;
  stats: {
    made: number;
    purchased: number;
    likes: number;
    ipValue: number;
  };
}

// NFT 등록 폼 인터페이스
interface NFTFormData {
  imageLink: string;
  imageName: string;
  description: string;
  price: number;
  tags: string;
  category: string;
}

const MyStudio: React.FC = () => {
  // 상태 관리
  const [activeTab, setActiveTab] = useState<string>("creations");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNFT, setSelectedNFT] = useState<NFTData | null>(null);
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [showNFTForm, setShowNFTForm] = useState(false);
  const [nftFormData, setNftFormData] = useState<NFTFormData>({
    imageLink: "",
    imageName: "",
    description: "",
    price: 0,
    tags: "",
    category: "",
  });

  // Intersection Observer hooks
  const [profileRef, profileInView] = useInView({ triggerOnce: true });
  const [statsRef, statsInView] = useInView({ triggerOnce: true });

  // 임시 데이터 로드 (실제 API 연동 전까지 사용)
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const walletAddress = "0xAb...456d"; // 실제로는 Web3 로그인 후 동적으로 할당

    // === [임시 데이터 구간] ===
    // 아래 임시 데이터는 개발/디자인 테스트용입니다.
    // 실제 API 연동 시 이 블록만 주석 처리하면 됩니다.
    const USE_MOCK = true; // false로 바꾸면 실제 API 사용
    if (USE_MOCK) {
      setUserProfile({
        nickname: "홍길동",
        profileUrl: "https://i.imgur.com/QCNbOAo.png",
        bio: "향수를 사랑하는 사람",
        walletAddress: walletAddress,
        stats: { made: 3, purchased: 5, likes: 47, ipValue: 1200 },
      });
      setNfts([
        {
          idx: 1,
          userAddress: walletAddress,
          imageLink:
            "https://ipfs.io/ipfs/QmTUAmdsBo3DTztp8dMYQQg2bz8DN2kkGWigUNJgvXkVo7",
          imageName: "Dawn Whisper",
          description: "A mysterious scent that captures the essence of dawn",
          price: 25,
          tags: "mysterious, dawn, fresh",
          category: "floral",
          createdAt: "2024-03-01",
          isListed: false,
          isPrivate: false,
          isPurchased: false,
          isFavorite: true,
          likes: 12,
        },
        // ... 더 많은 임시 데이터
      ]);
      setIsLoading(false);
      return;
    }
    // === [임시 데이터 구간 끝] ===

    // === [실제 API 연동 구간] ===
    const loadData = async () => {
      try {
        const profileRes = await fetch(`/api/user/${walletAddress}`);
        const profileData = await profileRes.json();
        const nftsRes = await fetch(`/api/nft?userAddress=${walletAddress}`);
        const nftsData = await nftsRes.json();
        setUserProfile(profileData);
        setNfts(nftsData);
      } catch (error) {
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
    // === [실제 API 연동 구간 끝] ===
  }, []);

  // NFT 등록 핸들러
  const handleNFTSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // === [임시 데이터 구간] ===
    // 실제 API 연동 시 이 블록만 주석 처리하면 됩니다.
    console.log("NFT 등록 데이터:", nftFormData);
    setShowNFTForm(false);
    return;
    // === [임시 데이터 구간 끝] ===

    // === [실제 API 연동 구간] ===
    // try {
    //   const res = await fetch('/api/nft', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(nftFormData)
    //   });
    //   const data = await res.json();
    //   if (data.success) {
    //     setNfts(prev => [...prev, data.nft]);
    //     setShowNFTForm(false);
    //   } else {
    //     setError('NFT 등록에 실패했습니다.');
    //   }
    // } catch (error) {
    //   setError('NFT 등록에 실패했습니다.');
    // }
    // === [실제 API 연동 구간 끝] ===
  };

  // NFT 상태 변경 핸들러
  const handleNFTStatusChange = async (
    nftId: number,
    action: "list" | "unlist" | "makePrivate" | "makePublic"
  ) => {
    // === [임시 데이터 구간] ===
    // 실제 API 연동 시 이 블록만 주석 처리하면 됩니다.
    console.log("NFT 상태 변경:", { nftId, action });
    return;
    // === [임시 데이터 구간 끝] ===

    // === [실제 API 연동 구간] ===
    // try {
    //   const res = await fetch(`/api/nft/${nftId}/status`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ action })
    //   });
    //   const data = await res.json();
    //   if (data.success) {
    //     setNfts(prev => prev.map(nft => nft.idx === nftId ? data.nft : nft));
    //   } else {
    //     setError('NFT 상태 변경에 실패했습니다.');
    //   }
    // } catch (error) {
    //   setError('NFT 상태 변경에 실패했습니다.');
    // }
    // === [실제 API 연동 구간 끝] ===
  };

  // NFT 좋아요 토글 핸들러
  const handleLikeToggle = async (nftId: number) => {
    // === [임시 데이터 구간] ===
    // 실제 API 연동 시 이 블록만 주석 처리하면 됩니다.
    console.log("좋아요 토글:", nftId);
    return;
    // === [임시 데이터 구간 끝] ===

    // === [실제 API 연동 구간] ===
    // try {
    //   const res = await fetch(`/api/nft/${nftId}/like`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ userAddress: userProfile?.walletAddress })
    //   });
    //   const data = await res.json();
    //   if (data.success) {
    //     setNfts(prev => prev.map(nft =>
    //       nft.idx === nftId ? { ...nft, likes: data.likes, isFavorite: data.isFavorite } : nft
    //     ));
    //   } else {
    //     setError('좋아요 상태 변경에 실패했습니다.');
    //   }
    // } catch (error) {
    //   setError('좋아요 상태 변경에 실패했습니다.');
    // }
    // === [실제 API 연동 구간 끝] ===
  };

  // 프로필 저장 핸들러 (Settings 탭에서 사용)
  const handleSaveProfile = async () => {
    if (!userProfile) return;
    // === [임시 데이터 구간] ===
    // 실제 API 연동 시 이 블록만 주석 처리하면 됩니다.
    alert("프로필이 성공적으로 저장되었습니다.");
    return;
    // === [임시 데이터 구간 끝] ===

    // === [실제 API 연동 구간] ===
    // try {
    //   const res = await fetch(`/api/user/${userProfile.walletAddress}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(userProfile)
    //   });
    //   const data = await res.json();
    //   if (data.success) {
    //     alert('프로필이 성공적으로 저장되었습니다.');
    //   } else {
    //     alert('프로필 저장에 실패했습니다.');
    //   }
    // } catch (error) {
    //   alert('프로필 저장에 실패했습니다.');
    // }
    // === [실제 API 연동 구간 끝] ===
  };

  // 탭 변경 시 상세보기 모달 닫기
  useEffect(() => {
    setSelectedNFT(null);
  }, [activeTab]);

  if (isLoading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!userProfile) {
    return <div className="error">프로필 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <motion.div
      className="mystudio-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="studio-spacing" />

      <motion.div
        ref={profileRef}
        className="profile-wrapper"
        initial={{ y: 50, opacity: 0 }}
        animate={profileInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="profile-left">
          <motion.img
            src={userProfile.profileUrl}
            alt="Profile"
            className="profile-avatar"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
        <div className="profile-right">
          <motion.h1
            className="nickname"
            initial={{ x: -20, opacity: 0 }}
            animate={profileInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {userProfile.nickname}
          </motion.h1>
          <motion.p
            className="wallet"
            initial={{ x: -20, opacity: 0 }}
            animate={profileInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {userProfile.walletAddress}
          </motion.p>

          <motion.div
            ref={statsRef}
            className="summary-cards-inline"
            initial={{ y: 20, opacity: 0 }}
            animate={statsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {Object.entries(userProfile.stats).map(([key, value], index) => (
              <motion.div
                key={key}
                className={`summary-card ${
                  key === "ipValue" ? "highlight" : ""
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  delay: index * 0.1,
                }}
              >
                <span className="summary-label">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <span className="summary-value">
                  {value}
                  {key === "ipValue" ? " ETH" : ""}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="tab-menu"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {internalTabs.map((tab) => (
          <motion.button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* NFT 등록 버튼 */}
      {activeTab === "creations" && (
        <motion.button
          className="create-nft-btn"
          onClick={() => setShowNFTForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus /> New NFT
        </motion.button>
      )}

      {/* NFT 등록 폼 모달 */}
      <AnimatePresence>
        {showNFTForm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="nft-form-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2>Create New NFT</h2>
              <form onSubmit={handleNFTSubmit}>
                <div className="form-group">
                  <label>
                    <FaImage /> Image Link (IPFS)
                  </label>
                  <input
                    type="text"
                    value={nftFormData.imageLink}
                    onChange={(e) =>
                      setNftFormData({
                        ...nftFormData,
                        imageLink: e.target.value,
                      })
                    }
                    placeholder="Enter IPFS image link"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaList /> Name
                  </label>
                  <input
                    type="text"
                    value={nftFormData.imageName}
                    onChange={(e) =>
                      setNftFormData({
                        ...nftFormData,
                        imageName: e.target.value,
                      })
                    }
                    placeholder="Enter NFT name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={nftFormData.description}
                    onChange={(e) =>
                      setNftFormData({
                        ...nftFormData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter NFT description"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaDollarSign /> Price (ETH)
                  </label>
                  <input
                    type="number"
                    value={nftFormData.price}
                    onChange={(e) =>
                      setNftFormData({
                        ...nftFormData,
                        price: Number(e.target.value),
                      })
                    }
                    placeholder="Enter price in ETH"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaTag /> Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={nftFormData.tags}
                    onChange={(e) =>
                      setNftFormData({ ...nftFormData, tags: e.target.value })
                    }
                    placeholder="Enter tags (e.g., mysterious, dawn, fresh)"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={nftFormData.category}
                    onChange={(e) =>
                      setNftFormData({
                        ...nftFormData,
                        category: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="floral">Floral</option>
                    <option value="woody">Woody</option>
                    <option value="citrus">Citrus</option>
                    <option value="oriental">Oriental</option>
                    <option value="fresh">Fresh</option>
                  </select>
                </div>

                <div className="form-actions">
                  <motion.button
                    type="submit"
                    className="submit-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create NFT
                  </motion.button>
                  <motion.button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowNFTForm(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NFT 목록 */}
      <AnimatePresence mode="wait">
        {activeTab === "creations" && (
          <motion.div
            className="nft-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {nfts.map((nft, index) => (
              <motion.div
                key={nft.idx}
                className="nft-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedNFT(nft)}
              >
                <motion.img
                  src={nft.imageLink}
                  alt={nft.imageName}
                  className="nft-thumbnail"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <div className="nft-info">
                  <h3 className="nft-title">{nft.imageName}</h3>
                  <p className="nft-description">{nft.description}</p>
                  <div className="nft-meta">
                    <motion.span
                      className="likes"
                      whileHover={{ scale: 1.2 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeToggle(nft.idx);
                      }}
                    >
                      <FaHeart className={nft.isFavorite ? "favorite" : ""} />
                      {nft.likes}
                    </motion.span>
                    <span className="price">{nft.price} ETH</span>
                  </div>
                  <div className="nft-tags">
                    {nft.tags.split(",").map((tag, i) => (
                      <span key={i} className="tag">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="nft-actions">
                  <motion.button
                    className="action-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNFT(nft);
                    }}
                  >
                    <FaEye /> View
                  </motion.button>
                  {!nft.isListed && (
                    <motion.button
                      className="action-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNFTStatusChange(nft.idx, "list");
                      }}
                    >
                      <FaShoppingCart /> Sell
                    </motion.button>
                  )}
                  <motion.button
                    className="action-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNFTStatusChange(
                        nft.idx,
                        nft.isPrivate ? "makePublic" : "makePrivate"
                      );
                    }}
                  >
                    {nft.isPrivate ? <FaUnlock /> : <FaLock />}
                    {nft.isPrivate ? "Make Public" : "Make Private"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* NFT 상세보기 모달 */}
      <AnimatePresence>
        {selectedNFT && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNFT(null)}
          >
            <motion.div
              className="nft-detail-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: 420,
                width: "95%",
                padding: "2rem",
                borderRadius: "1rem",
                background: "#232026",
                color: "#f4f4f4",
                boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
              }}
            >
              {/* 상단 바: 제목 + X 버튼 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "1.4rem",
                    color: "#c2a878",
                    fontWeight: 700,
                  }}
                >
                  {selectedNFT.imageName}
                </h2>
                <button
                  className="close-btn"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#c2a878",
                    fontSize: "2rem",
                    cursor: "pointer",
                    zIndex: 10,
                    marginLeft: "1rem",
                  }}
                  onClick={() => setSelectedNFT(null)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <img
                src={selectedNFT.imageLink}
                alt={selectedNFT.imageName}
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  borderRadius: "0.75rem",
                  marginBottom: "1.2rem",
                  background: "#19171c",
                }}
              />
              <div
                style={{ borderTop: "1px solid #3a2f36", paddingTop: "1.2rem" }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#b8b8b8",
                    fontSize: "1rem",
                    marginBottom: "0.7rem",
                  }}
                >
                  {selectedNFT.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.2rem",
                    marginBottom: "0.7rem",
                  }}
                >
                  <span style={{ color: "#e67e22", fontWeight: 600 }}>
                    {selectedNFT.price} ETH
                  </span>
                  <span
                    style={{
                      color: "#ef4444",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    ❤ {selectedNFT.likes}
                  </span>
                  <span style={{ color: "#b8b8b8", fontSize: "0.95rem" }}>
                    {selectedNFT.category}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    marginBottom: "0.7rem",
                  }}
                >
                  {selectedNFT.tags.split(",").map((tag, i) => (
                    <span
                      key={i}
                      className="tag"
                      style={{
                        background: "#292429",
                        color: "#c2a878",
                        borderRadius: "1rem",
                        padding: "0.15rem 0.7rem",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                      }}
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    color: "#b8b8b8",
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                  }}
                >
                  Created: {selectedNFT.createdAt}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings 탭: 프로필 수정 폼 */}
      {activeTab === "settings" && userProfile && (
        <motion.div
          className="settings-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
            <label>Nickname</label>
            <input
              type="text"
              value={userProfile.nickname}
              onChange={(e) =>
                setUserProfile({ ...userProfile, nickname: e.target.value })
              }
              placeholder="Enter your nickname"
            />
          </motion.div>

          <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
            <label>Profile Image URL</label>
            <input
              type="text"
              value={userProfile.profileUrl}
              onChange={(e) =>
                setUserProfile({ ...userProfile, profileUrl: e.target.value })
              }
              placeholder="Paste image URL"
            />
          </motion.div>

          <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
            <label>Bio</label>
            <textarea
              value={userProfile.bio}
              onChange={(e) =>
                setUserProfile({ ...userProfile, bio: e.target.value })
              }
              placeholder="Tell us about yourself"
            />
          </motion.div>

          <motion.div className="form-group" whileHover={{ scale: 1.02 }}>
            <label>Wallet Address</label>
            <input
              type="text"
              value={userProfile.walletAddress}
              readOnly
              style={{
                background: "#292429",
                color: "#b8b8b8",
                cursor: "not-allowed",
              }}
            />
          </motion.div>

          <motion.button
            className="save-btn"
            onClick={handleSaveProfile}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save Changes
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyStudio;
