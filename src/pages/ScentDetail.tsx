import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import * as S from "./ScentDetail.styles";

// ==========================================
// 더미데이터용 이미지 import (API 연동 후 삭제 예정)
// ==========================================
import firstImg from "../assets/image/first.png";
import secondImg from "../assets/image/second.png";
import thirdImg from "../assets/image/third.png";
import fourthImg from "../assets/image/fourth.png";
import f11Img from "../assets/image/f11.png";
import f22Img from "../assets/image/f22.png";
import f33Img from "../assets/image/f33.png";
import diffuserImg from "../assets/image/diffuser.png";
import soapImg from "../assets/image/soap.png";
import roomsprayImg from "../assets/image/roomspray.png";
import candleImg from "../assets/image/candle.png";

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

// 파생상품 타입 (별도 관리)
interface Derivative {
  id: string;
  name: string;
  type: string;
  image: string;
}

// 추천 향기 타입
interface Recommendation {
  id: string;
  name: string;
  description: string;
  image: string;
}

// NFT에 파생상품 추가한 확장 타입
interface NFTWithDerivatives extends NFTData {
  derivatives: Derivative[];
}

// 유틸리티 함수들
const formatAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

const formatPrice = (price: number) => {
  return `${(price / 100).toFixed(2)} ETH`;
};

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

// 메인 ScentDetail 컴포넌트
const ScentDetail: React.FC = () => {
  const [perfume, setPerfume] = useState<NFTWithDerivatives | null>(null);
  const { id } = useParams<{ id: string }>();
  const { user } = usePrivy();

  console.log("Detail page ID:", id); // 디버깅용 로그

  // 초기 데이터 로드
  useEffect(() => {
    // 실제 id값을 사용 (없으면 "1"로 기본값 지정)
    const perfumeId = id || "1";

    // ========== 현재: 더미데이터 사용 (API 스펙 형태) ==========
    let mockPerfume: NFTWithDerivatives;

    if (perfumeId === "2") {
      // 두 번째 향수 데이터 (The Scent She Wore)
      mockPerfume = {
        idx: 2,
        imageName: "The Scent She Wore",
        subtitle:
          "And I remember her, not as my mother, but as a woman in love.",
        description:
          "She wore the same scent every day. I only saw my mother—never the woman she was. But years later, wearing that perfume myself, I finally understood what she longed for.",
        price: 28, // 0.28 ETH
        tags: "Nostalgia,Tuberose,Maternal,Longing",
        userAddress: "0x831d35Cc6634C0532925a3b844Bc454e4438f22a",
        imageLink: secondImg,
        category: "perfume",
        derivatives: [
          {
            id: "d1",
            name: "Maternal Memory",
            type: "Diffuser",
            image: diffuserImg,
          },
          {
            id: "d2",
            name: "Maternal Memory",
            type: "Soap",
            image: soapImg,
          },
          {
            id: "d3",
            name: "Maternal Memory",
            type: "Room Spray",
            image: roomsprayImg,
          },
          {
            id: "d4",
            name: "Maternal Memory",
            type: "Candle",
            image: candleImg,
          },
        ],
      };
    } else if (perfumeId === "4") {
      // 네 번째 향수 데이터 (The Scent We Left in the Dirt)
      mockPerfume = {
        idx: 4,
        imageName: "The Scent We Left in the Dirt",
        subtitle:
          "Before we grew up. Before we were husbands. We were wild.\nThere was a time",
        description:
          "when all we needed was a Jeep, two tents, and a bottle that smelled like smoke and pine. We weren't fathers then—just boys chasing the edge of freedom,",
        price: 38, // 0.38 ETH
        tags: "Freedom,Earth,Forest,Untamed",
        userAddress: "0x642d35Cc6634C0532925a3b844Bc454e4438f52d",
        imageLink: fourthImg,
        category: "perfume",
        derivatives: [
          {
            id: "d1",
            name: "Dirt Memory",
            type: "Diffuser",
            image: diffuserImg,
          },
          {
            id: "d2",
            name: "Dirt Memory",
            type: "Soap",
            image: soapImg,
          },
          {
            id: "d3",
            name: "Dirt Memory",
            type: "Room Spray",
            image: roomsprayImg,
          },
          {
            id: "d4",
            name: "Dirt Memory",
            type: "Candle",
            image: candleImg,
          },
        ],
      };
    } else if (perfumeId === "3") {
      // 세 번째 향수 데이터 (To My X)
      mockPerfume = {
        idx: 3,
        imageName: "To My X",
        description: "I couldn't let you go, so I sealed you in a scent.",
        price: 42, // 0.42 ETH
        tags: "Forest,Woody,Moss,Heartache",
        userAddress: "0x453d35Cc6634C0532925a3b844Bc454e4438f86c",
        imageLink: thirdImg,
        category: "perfume",
        derivatives: [
          {
            id: "d1",
            name: "X Memory",
            type: "Diffuser",
            image: diffuserImg,
          },
          {
            id: "d2",
            name: "X Memory",
            type: "Soap",
            image: soapImg,
          },
          {
            id: "d3",
            name: "X Memory",
            type: "Room Spray",
            image: roomsprayImg,
          },
          {
            id: "d4",
            name: "X Memory",
            type: "Candle",
            image: candleImg,
          },
        ],
      };
    } else {
      // 첫 번째 향수 데이터 (Her Aura Was Not Meant to Stay)
      mockPerfume = {
        idx: 1,
        imageName: "Her Aura Was Not Meant to Stay",
        description:
          "She left that night without closing the door. Only her scent remained on the sheets. You may own this feeling—but you'll never understand it. She lives only in my memory.",
        price: 35, // 0.35 ETH
        tags: "Midnight,Haunting,Bold,Mysterious",
        userAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        imageLink: firstImg,
        category: "perfume",
        derivatives: [
          {
            id: "d1",
            name: "Aura Memory",
            type: "Diffuser",
            image: diffuserImg,
          },
          {
            id: "d2",
            name: "Aura Memory",
            type: "Soap",
            image: soapImg,
          },
          {
            id: "d3",
            name: "Aura Memory",
            type: "Room Spray",
            image: roomsprayImg,
          },
          {
            id: "d4",
            name: "Aura Memory",
            type: "Candle",
            image: candleImg,
          },
        ],
      };
    }

    setPerfume(mockPerfume);

    // ========== API 연동시 사용할 코드 (주석 해제하면 바로 동작) ==========
    /*
    // API 설정 (백엔드 스펙 확정됨)
    const API_BASE_URL = process.env.NODE_ENV === 'production' 
      ? 'https://your-api-domain.com'  // 운영 서버 URL
      : 'http://localhost:8080';       // 개발 서버 URL
    
    const loadNFTDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/nfts/${perfumeId}`);
        const data: NFTData = await response.json();
        
        // API 데이터에 더미 파생상품 추가 (나중에 실제 API로 교체)
        const nftWithDerivatives: NFTWithDerivatives = {
          ...data,
          derivatives: mockPerfume.derivatives // 임시로 더미 파생상품 사용
        };
        
        setPerfume(nftWithDerivatives);
        console.log('✅ NFT 상세 API 연동 성공:', data);
      } catch (error) {
        console.error('❌ NFT 상세 API 연동 실패:', error);
        // 에러 시 더미데이터 사용
        setPerfume(mockPerfume);
      }
    };
    
    loadNFTDetail();
    */
  }, [id]);

  // 추천 향기 데이터 - id에 따라 다른 추천 향기 표시
  const getRecommendations = () => {
    // 실제 id값을 사용 (없으면 "1"로 기본값 지정)
    const perfumeId = id || "1";

    if (perfumeId === "2") {
      // The Scent She Wore 향수에 대한 추천
      return [
        {
          id: "r1",
          name: "Memoir",
          description: "A nostalgic floral scent capturing childhood memories",
          image: f11Img,
        },
        {
          id: "r2",
          name: "Maternal Embrace",
          description: "Warm and comforting notes of vanilla and amber",
          image: f22Img,
        },
        {
          id: "r3",
          name: "Time Capsule",
          description: "A delicate blend of tuberose and powder notes",
          image: f33Img,
        },
      ];
    } else if (perfumeId === "4") {
      // The Scent We Left in the Dirt 향수에 대한 추천
      return [
        {
          id: "r1",
          name: "Wild Spirit",
          description: "A free-spirited woody scent for the adventurous soul",
          image: f11Img,
        },
        {
          id: "r2",
          name: "Earthy Romance",
          description: "Notes of wet soil and moss in a romantic blend",
          image: f22Img,
        },
        {
          id: "r3",
          name: "Wanderlust",
          description:
            "An adventurous scent capturing the journey of a wandering soul",
          image: f33Img,
        },
      ];
    } else if (perfumeId === "3") {
      // To My X 향수에 대한 추천
      return [
        {
          id: "r1",
          name: "Forest Whisper",
          description:
            "A mysterious blend of moss and tree bark from deep forest",
          image: f11Img,
        },
        {
          id: "r2",
          name: "Rainy Memory",
          description:
            "The fresh scent of forest after rain with notes of longing",
          image: f22Img,
        },
        {
          id: "r3",
          name: "Emotional Woods",
          description: "A woody fragrance expressing emotional memories",
          image: f33Img,
        },
      ];
    } else {
      // Her Aura Was Not Meant to Stay 향수에 대한 추천
      return [
        {
          id: "r1",
          name: "Velvet Orchid",
          description: "A mysterious scent shimmering like a deep-sea jewel",
          image: f11Img,
        },
        {
          id: "r2",
          name: "Cedar Noir",
          description: "A calm and deep woody scent from the forest depths",
          image: f22Img,
        },
        {
          id: "r3",
          name: "Sunset Bloom",
          description: "A warm and sweet floral scent like a red sunset",
          image: f33Img,
        },
      ];
    }
  };

  if (!perfume) {
    return <div>Loading...</div>;
  }

  const recommendations = getRecommendations();

  return (
    <>
      {/* 향기 상세 정보 섹션 - 흰색 배경 */}
      <S.Section $bgColor="#ffffff">
        <S.Container>
          <S.SectionTitle>SCENT PROFILE</S.SectionTitle>

          <S.PerfumeCard>
            <S.PerfumeImageWrapper>
              <S.ImageContainer>
                <S.StyledImage
                  src={perfume.imageLink}
                  alt={perfume.imageName}
                />
              </S.ImageContainer>
            </S.PerfumeImageWrapper>

            <S.PerfumeInfo>
              <S.PerfumeName>{perfume.imageName}</S.PerfumeName>
              {perfume.subtitle && (
                <S.PerfumeSubtitle>{perfume.subtitle}</S.PerfumeSubtitle>
              )}
              <S.PerfumeStory
                style={{
                  fontStyle: "italic",
                  lineHeight: "1.9",
                  fontSize: "1.15rem",
                  color: "#444",
                }}
              >
                {perfume.description}
              </S.PerfumeStory>
              <S.PerfumePrice>{formatPrice(perfume.price)}</S.PerfumePrice>

              <S.TagsContainer>
                {parseTags(perfume.tags).map((tag, index) => (
                  <S.Tag key={index}>#{tag}</S.Tag>
                ))}
              </S.TagsContainer>

              <S.CreatorInfo>
                <S.CreatorLabel>Creator:</S.CreatorLabel>
                <S.CreatorAddress>
                  {user?.wallet?.address
                    ? formatAddress(user.wallet.address)
                    : formatAddress(perfume.userAddress)}
                </S.CreatorAddress>
              </S.CreatorInfo>

              <S.ButtonContainer>
                <S.Button to="#" style={{ background: "#000", color: "#fff" }}>
                  Buy Now
                </S.Button>
                <S.BackButton to="/scentmarket">Back to Market</S.BackButton>
              </S.ButtonContainer>
            </S.PerfumeInfo>
          </S.PerfumeCard>
        </S.Container>
      </S.Section>

      {/* 파생 상품 섹션 - 검정색 배경 */}
      <S.Section
        $bgColor="#000000"
        style={{
          backgroundColor: "#000000",
          position: "relative",
          padding: "5rem 0 6rem 0",
        }}
      >
        <S.Container style={{ padding: "0 1rem" }}>
          <S.SectionTitle $dark style={{ marginBottom: "3rem" }}>
            COLLECTION DERIVATIVES
          </S.SectionTitle>

          <S.DerivativesGrid>
            {perfume.derivatives.map((derivative) => (
              <S.DerivativeCard key={derivative.id}>
                <S.DerivativeImage>
                  <img src={derivative.image} alt={derivative.name} />
                </S.DerivativeImage>
                <S.DerivativeInfo>
                  <h4>{derivative.name}</h4>
                  <p>{derivative.type}</p>
                </S.DerivativeInfo>
              </S.DerivativeCard>
            ))}
          </S.DerivativesGrid>
        </S.Container>
      </S.Section>

      {/* 추천 향기 섹션 - 흰색 배경 */}
      <S.Section
        $bgColor="#ffffff"
        style={{ backgroundColor: "#ffffff", padding: "6rem 0 8rem 0" }}
      >
        <S.Container style={{ padding: "0 1rem" }}>
          <S.SectionTitle>YOU MAY ALSO LIKE</S.SectionTitle>

          <S.RecommendationsGrid>
            {recommendations.map((recommendation) => (
              <S.RecommendationCard key={recommendation.id}>
                <S.RecommendationImage>
                  <img src={recommendation.image} alt={recommendation.name} />
                </S.RecommendationImage>
                <S.RecommendationOverlay>
                  <h4>{recommendation.name}</h4>
                  <p>{recommendation.description}</p>
                </S.RecommendationOverlay>
              </S.RecommendationCard>
            ))}
          </S.RecommendationsGrid>
        </S.Container>
      </S.Section>
    </>
  );
};

export default ScentDetail;
