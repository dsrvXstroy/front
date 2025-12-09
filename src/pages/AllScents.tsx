import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as S from "./AllScents.styles";

//api 연결 후 삭제하기
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

type FilterType = "all" | "bottle" | "ai" | "collab";

const AllScents: React.FC = () => {
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // ========== 데이터 로드 ==========
  useEffect(() => {
    // ========== 현재: 더미데이터 사용 (API 스펙 형태) 삭제예정 ==========
    const mockNFTs: NFTData[] = [
      {
        idx: 1,
        imageName: "Her Aura Was Not Meant to Stay",
        description:
          "She left that night without closing the door. Only her scent remained on the sheets. You may own this feeling— but you'll never understand it. She lives only in my memory.",
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
          "She wore the same scent every day. I only saw my mother—never the woman she was. But years later, wearing that perfume myself, I finally understood what she longed for.",
        price: 28, // 0.28 ETH
        tags: "Nostalgia,Tuberose,Maternal,Longing",
        userAddress: "0x831d35Cc6634C0532925a3b844Bc454e4438f22a",
        imageLink: secondImg,
        category: "perfume",
      },
      {
        idx: 3,
        imageName: "To My X",
        description: "I couldn't let you go, so I sealed you in a scent.",
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
          "when all we needed was a Jeep, two tents, and a bottle that smelled like smoke and pine. We weren't fathers then—just boys chasing the edge of freedom,",
        price: 38, // 0.38 ETH
        tags: "Freedom,Earth,Forest,Untamed",
        userAddress: "0x642d35Cc6634C0532925a3b844Bc454e4438f52d",
        imageLink: fourthImg,
        category: "perfume",
      },
      // 추가 샘플 데이터 - API 형태로 변환
      {
        idx: 5,
        imageName: "Echoes of Autumn",
        description: "Memories pressed between pages of fallen leaves.",
        price: 32, // 0.32 ETH
        tags: "Amber,Nostalgia,Warmth",
        userAddress: "0x831d35Cc6634C0532925a3b844Bc454e4438f22a",
        imageLink: secondImg,
        category: "perfume",
      },
      {
        idx: 6,
        imageName: "Velvet Midnight",
        description: "The city sleeps, but secrets never do.",
        price: 41, // 0.41 ETH
        tags: "Dark,Mysterious,Urban",
        userAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        imageLink: firstImg,
        category: "perfume",
      },
      {
        idx: 7,
        imageName: "Lost in Translation",
        subtitle: "Words we never said, feelings never explained.",
        description: "Some emotions have no language, only scent.",
        price: 36, // 0.36 ETH
        tags: "Subtle,Complex,Emotional",
        userAddress: "0x453d35Cc6634C0532925a3b844Bc454e4438f86c",
        imageLink: thirdImg,
        category: "perfume",
      },
      {
        idx: 8,
        imageName: "Wanderlust",
        description: "The smell of distant places calling your name.",
        price: 39, // 0.39 ETH
        tags: "Adventure,Freedom,Journey",
        userAddress: "0x642d35Cc6634C0532925a3b844Bc454e4438f52d",
        imageLink: fourthImg,
        category: "perfume",
      },
      {
        idx: 9,
        imageName: "Ephemeral",
        subtitle: "Beauty in the fleeting moment",
        description:
          "Like cherry blossoms caught in the spring breeze, gone too soon.",
        price: 33, // 0.33 ETH
        tags: "Floral,Delicate,Spring",
        userAddress: "0x831d35Cc6634C0532925a3b844Bc454e4438f22a",
        imageLink: secondImg,
        category: "perfume",
      },
      {
        idx: 10,
        imageName: "Solitude",
        description: "The comfort found in being alone with your thoughts.",
        price: 37, // 0.37 ETH
        tags: "Peaceful,Introspective,Calm",
        userAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        imageLink: firstImg,
        category: "perfume",
      },
      {
        idx: 11,
        imageName: "Vintage Dreams",
        description:
          "Memories stored in old leather and sun-faded photographs.",
        price: 40, // 0.40 ETH
        tags: "Vintage,Leather,Memory",
        userAddress: "0x453d35Cc6634C0532925a3b844Bc454e4438f86c",
        imageLink: thirdImg,
        category: "perfume",
      },
      {
        idx: 12,
        imageName: "After Rain",
        subtitle: "The world renewed",
        description:
          "The scent of earth after rain, promises of new beginnings.",
        price: 34, // 0.34 ETH
        tags: "Fresh,Earthy,Renewal",
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
    
    const loadNFTs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/nfts`);
        const data: NFTData[] = await response.json();
        setNfts(data);
        console.log('✅ AllScents API 연동 성공:', data);
      } catch (error) {
        console.error('❌ AllScents API 연동 실패:', error);
        // 에러 시 빈 배열로 설정
        setNfts([]);
      }
    };
    
    loadNFTs();
    */

    // 스크롤 이벤트 리스너 추가
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 필터링된 NFT 목록
  const filteredNFTs = nfts.filter((nft) => {
    if (filter === "all") return true;
    // TODO: 실제 필터링 로직 구현 (카테고리나 태그 기반)
    // 예시: return nft.category === filter;
    return true;
  });

  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <S.PageContainer>
      <S.PageHeader>
        <S.Title>Digital Scent Collection</S.Title>
        <S.SubTitle>
          Explore our full collection of digital scents, each with its own
          unique story and emotional journey.
        </S.SubTitle>
      </S.PageHeader>

      <S.FilterBar>
        <S.FilterButton
          $active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All Scents
        </S.FilterButton>
        <S.FilterButton
          $active={filter === "bottle"}
          onClick={() => setFilter("bottle")}
        >
          Bottled Scents
        </S.FilterButton>
        <S.FilterButton
          $active={filter === "ai"}
          onClick={() => setFilter("ai")}
        >
          AI Generated
        </S.FilterButton>
        <S.FilterButton
          $active={filter === "collab"}
          onClick={() => setFilter("collab")}
        >
          Collaborations
        </S.FilterButton>
      </S.FilterBar>

      <S.Gallery>
        {filteredNFTs.length > 0 ? (
          filteredNFTs.map((nft) => (
            <S.ScentCard
              key={nft.idx}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <S.CardImageContainer>
                <S.CardImage
                  src={nft.imageLink}
                  alt={nft.imageName}
                  onError={(e) => {
                    // 이미지 로드 실패 시 처리
                    e.currentTarget.style.display = "none";
                  }}
                />
              </S.CardImageContainer>
              <S.CardContent>
                <S.CardTitle>{nft.imageName}</S.CardTitle>
                <S.CardPrice>{formatPrice(nft.price)}</S.CardPrice>
                <S.CardTags>
                  {parseTags(nft.tags)
                    .slice(0, 3)
                    .map((tag, index) => (
                      <S.CardTag key={index}>#{tag}</S.CardTag>
                    ))}
                </S.CardTags>
                <S.ViewButton to={`/marketplace/${nft.idx}`}>
                  View Details
                </S.ViewButton>
              </S.CardContent>
            </S.ScentCard>
          ))
        ) : (
          <S.NoResults>No scents found matching your criteria.</S.NoResults>
        )}
      </S.Gallery>

      {showBackToTop && <S.BackToTop onClick={scrollToTop} />}
    </S.PageContainer>
  );
};

export default AllScents;
