import React, { useState, useEffect, useRef } from "react";
import * as S from "./ScentMarket.styles";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

// ==========================================
// 더미데이터용 이미지 import (API 연동 후 삭제 예정)
// ==========================================
import firstImg from "../assets/image/first.png";
import secondImg from "../assets/image/second.png";
import thirdImg from "../assets/image/third.png";
import fourthImg from "../assets/image/fourth.png";

// ==========================================
// API 응답 타입 정의 (백엔드 스펙 그대로)
// ==========================================
interface NFTData {
  idx: number; // long (숫자)
  userAddress: string;
  imageLink: string;
  imageName: string;
  description: string;
  price: number; // integer
  tags: string; // 쉼표로 구분된 문자열
  category: string;
  subtitle?: string; // 더미데이터용 (실제 API에는 없음)
}

// 페이드인 애니메이션 변수
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ==========================================
// 유틸리티 함수들
// ==========================================

// 지갑 주소를 줄여서 표시하는 함수
const formatAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

// 가격을 ETH 형태로 표시하는 함수
const formatPrice = (price: number) => {
  return `${(price / 100).toFixed(2)} ETH`;
};

// 태그 문자열을 배열로 변환하는 함수
const parseTags = (tags: string | string[] | undefined | null) => {
  // 안전성 검사: tags가 없거나 유효하지 않은 경우
  if (!tags) return [];

  // 이미 배열인 경우 그대로 반환
  if (Array.isArray(tags)) return tags;

  // 문자열인 경우 쉼표로 분리
  if (typeof tags === "string") {
    return tags.split(",").map((tag) => tag.trim());
  }

  // 그 외의 경우 빈 배열 반환
  return [];
};

// ==========================================
// 메인 ScentMarket 컴포넌트
// ==========================================
const ScentMarket: React.FC = () => {
  // ========== 상태 관리 ==========
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = usePrivy();
  const slidesRef = useRef<HTMLDivElement>(null);
  const sliderSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // 스크롤 프로그레스 추적
  useEffect(() => {
    const updateScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // ========== 데이터 로드 ==========
  useEffect(() => {
    // ========== 현재: 더미데이터 사용 (API 스펙 형태) ==========
    const mockNFTs: NFTData[] = [
      {
        idx: 1,
        imageName: "Her Aura Was Not Meant to Stay",
        description:
          "She left that night without closing the door.\nOnly her scent remained on the sheets. You may own this feeling—\nbut you'll never understand it. She lives only in my memory.",
        price: 35, // 0.35 ETH
        tags: "Midnight,Haunting,Bold,Mysterious",
        userAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        imageLink: firstImg,
        category: "perfume",
      },
      {
        idx: 2,
        imageName: "The Scent She Wore",
        subtitle:
          "And I remember her, not as my mother, but as a woman in love.",
        description:
          "She wore the same scent every day.\nI only saw my mother—never the woman she was.\nBut years later, wearing that perfume myself, I finally understood what she longed for.",
        price: 28, // 0.28 ETH
        tags: "Nostalgia,Tuberose,Maternal,Longing",
        userAddress: "0x831d35Cc6634C0532925a3b844Bc454e4438f22a",
        imageLink: secondImg,
        category: "perfume",
      },
      {
        idx: 3,
        imageName: "To My X",
        description: "I couldn't let you go,\nso I sealed you in a scent.",
        price: 42, // 0.42 ETH
        tags: "Forest,Woody,Moss,Heartache",
        userAddress: "0x453d35Cc6634C0532925a3b844Bc454e4438f86c",
        imageLink: thirdImg,
        category: "perfume",
      },
      {
        idx: 4,
        imageName: "The Scent We Left in the Dirt",
        subtitle:
          "Before we grew up. Before we were husbands. We were wild. There was a time",
        description:
          "when all we needed was a Jeep, two tents,\nand a bottle that smelled like smoke and pine.\nWe weren't fathers then—just boys chasing the edge of freedom,",
        price: 38, // 0.38 ETH
        tags: "Freedom,Earth,Forest,Untamed",
        userAddress: "0x642d35Cc6634C0532925a3b844Bc454e4438f52d",
        imageLink: fourthImg,
        category: "perfume",
      },
    ];

    setNfts(mockNFTs);

    // ========== API 연동시 사용할 코드 (주석 해제하면 바로 동작) ==========
    /*
    // API 설정 (백엔드 스펙 확정됨)
    const API_BASE_URL = process.env.NODE_ENV === 'production' 
      ? 'https://your-api-domain.com'  // 운영 서버 URL
      : 'http://localhost:8080';       // 개발 서버 URL
    
    const API_ENDPOINTS = {
      getAllNFTs: '/api/nfts',           // 전체 NFT 목록 조회
      getNFTById: '/api/nfts',           // 특정 NFT 조회 (/api/nfts/{idx})
    };
    
    const loadNFTs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.getAllNFTs}`);
        const data: NFTData[] = await response.json();
        setNfts(data);
        console.log('✅ API 연동 성공:', data);
      } catch (error) {
        console.error('❌ API 연동 실패:', error);
        // 에러 시 더미데이터 사용
        setNfts(mockNFTs);
      }
    };
    
    loadNFTs();
    */
  }, []);

  // 스크롤 핸들러 - 슬라이더 섹션으로 스크롤
  const scrollToSlider = () => {
    sliderSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 슬라이드 변경 핸들러
  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < nfts.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  // 태그 클릭 핸들러
  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
    console.log(`🏷️ 선택된 태그: ${tag}`);

    // TODO: 나중에 태그 필터링 로직 추가
  };

  if (nfts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <S.Section>
      <S.ScrollProgress style={{ width: `${scrollProgress}%` }} />

      <S.IntroSection>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <S.SectionTitle variants={item}>SCENTED STORIES</S.SectionTitle>
          <S.SubTitle variants={item}>Own the scent, own the story.</S.SubTitle>
          <S.ScrollPrompt
            onClick={scrollToSlider}
            variants={item}
            whileHover={{ y: 5, opacity: 1 }}
          >
            <S.ScrollIcon />
            <S.ScrollText>Scroll to explore</S.ScrollText>
          </S.ScrollPrompt>
        </motion.div>
      </S.IntroSection>

      <S.SliderSection ref={sliderSectionRef}>
        <S.Container>
          <S.SliderContainer>
            <S.SlidesWrapper
              ref={slidesRef}
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {nfts.map((nft) => (
                <S.Slide key={nft.idx}>
                  <S.PerfumeImageWrapper
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <S.ImageContainer
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <S.StyledImage src={nft.imageLink} alt={nft.imageName} />
                    </S.ImageContainer>
                  </S.PerfumeImageWrapper>

                  <S.PerfumeInfo>
                    <S.ContentArea>
                      <S.PerfumeName
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {nft.imageName}
                      </S.PerfumeName>

                      {nft.subtitle && (
                        <S.PerfumeSubtitle
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          {nft.subtitle}
                        </S.PerfumeSubtitle>
                      )}

                      <S.PerfumeStory
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {nft.description}
                      </S.PerfumeStory>
                    </S.ContentArea>

                    <S.MetaArea>
                      <S.PerfumePrice
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {formatPrice(nft.price)}
                      </S.PerfumePrice>

                      <S.TagsContainer
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        {parseTags(nft.tags).map((tag, idx) => (
                          <S.Tag
                            key={idx}
                            onClick={() => handleTagClick(tag)}
                            whileHover={{
                              y: -3,
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                            }}
                            whileTap={{ y: 0 }}
                            style={{
                              backgroundColor:
                                activeTag === tag
                                  ? "rgba(0, 0, 0, 0.2)"
                                  : "rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            #{tag}
                          </S.Tag>
                        ))}
                      </S.TagsContainer>

                      <S.CreatorInfo
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <S.CreatorLabel>Creator:</S.CreatorLabel>
                        <S.CreatorAddress>
                          {user?.wallet?.address
                            ? formatAddress(user.wallet.address)
                            : formatAddress(nft.userAddress)}
                        </S.CreatorAddress>
                      </S.CreatorInfo>

                      <S.Button
                        to={`/marketplace/${nft.idx}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{
                          backgroundColor: "#000",
                          color: "#fff",
                          y: -5,
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        Collect This Scent
                      </S.Button>
                    </S.MetaArea>
                  </S.PerfumeInfo>
                </S.Slide>
              ))}
            </S.SlidesWrapper>

            <S.NavButton
              $direction="left"
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              $disabled={currentSlide === 0}
            />
            <S.NavButton
              $direction="right"
              onClick={handleNextSlide}
              disabled={currentSlide === nfts.length - 1}
              $disabled={currentSlide === nfts.length - 1}
            />
          </S.SliderContainer>

          <S.SlideIndicators>
            {nfts.map((_, index) => (
              <S.Indicator
                key={index}
                $active={currentSlide === index}
                onClick={() => handleIndicatorClick(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </S.SlideIndicators>

          <S.ButtonContainer>
            <S.MoreScentButton
              to="/scents/all"
              whileHover={{
                y: -5,
                backgroundColor: "#000",
                color: "#fff",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ y: 0 }}
            >
              MORE SCENTS
            </S.MoreScentButton>
          </S.ButtonContainer>
        </S.Container>
      </S.SliderSection>
    </S.Section>
  );
};

export default ScentMarket;
