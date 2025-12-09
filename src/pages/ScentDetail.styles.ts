import styled from "styled-components";
import { Link } from "react-router-dom";

// 섹션 컴포넌트
export const Section = styled.section<{ $bgColor?: string }>`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 2rem;
  background-color: ${(props) => props.$bgColor || "#ffffff"};
  overflow: hidden;
  transition: background-color 0.5s ease;
`;

export const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

export const SectionTitle = styled.h1<{ $dark?: boolean }>`
  font-size: 4rem;
  font-weight: 400;
  color: ${(props) => (props.$dark ? "#ffffff" : "#000000")};
  letter-spacing: -0.03em;
  margin-bottom: 8rem;
  text-align: center;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 2.8rem;
    margin-bottom: 5rem;
  }
`;

// 향기 카드 컴포넌트
export const PerfumeCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  padding: 3rem 1rem;
  background: #ffffff;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 0;
  }
`;

export const PerfumeImageWrapper = styled.div`
  padding: 2.5rem;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  transition: all 0.5s ease;
  position: relative;
  max-width: 500px;
  margin: 0 auto;

  &:hover {
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.15);
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  position: relative;
  z-index: 1;
  background-color: #ffffff;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.02);
    pointer-events: none;
    transition: background-color 0.5s ease;
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0);
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
  transition: transform 1.5s ease;

  ${ImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

export const ImageTitle = styled.h2`
  position: absolute;
  top: 20%;
  left: 0;
  width: 100%;
  text-align: center;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2.5rem;
  font-weight: 400;
  color: #000;
  z-index: 2;
  letter-spacing: -0.03em;
`;

export const ImageSubtitle = styled.p`
  position: absolute;
  top: calc(20% + 3rem);
  left: 0;
  width: 100%;
  text-align: center;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.1rem;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.6);
  z-index: 2;
  letter-spacing: -0.01em;
`;

export const PerfumeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0;
`;

export const PerfumeName = styled.h2`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2.8rem;
  font-weight: 400;
  color: #000;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  line-height: 1.2;

  /* API 데이터 안전성 추가 */
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }

  /* 매우 긴 제목 대응 */
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const PerfumeSubtitle = styled.h3`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.3rem;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 2.5rem;
  letter-spacing: -0.01em;

  /* API 데이터 안전성 추가 */
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

export const PerfumeStory = styled.p`
  font-size: 1.2rem;
  line-height: 1.9;
  color: #333;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  white-space: normal;

  /* API 데이터 안전성 추가 */
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-height: 300px;
  overflow-y: auto;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-height: 250px;
  }
`;

export const PerfumePrice = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: #92847a;
  margin-bottom: 2rem;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

export const Tag = styled.span`
  padding: 0.7rem 1.4rem;
  background: rgba(0, 0, 0, 0.05);
  color: #333;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
`;

export const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 2.5rem;
`;

export const CreatorLabel = styled.span`
  font-size: 0.95rem;
  color: #333;
  opacity: 0.7;
  margin-right: 1rem;
`;

export const CreatorAddress = styled.span`
  font-weight: 500;
  color: #333;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const Button = styled(Link)`
  display: inline-block;
  padding: 1rem 3rem;
  background: transparent;
  border: 1px solid #000;
  color: #000;
  font-size: 1rem;
  letter-spacing: 1px;
  transition: all 0.4s ease;
  text-transform: uppercase;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

// 파생 상품 컴포넌트
export const DerivativesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin: 4rem auto;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const DerivativeCard = styled.div`
  background: #111;
  overflow: hidden;
  position: relative;
  transition: transform 0.5s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  }
`;

export const DerivativeImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #111;
  padding: 1rem;
  box-sizing: border-box;

  img {
    width: 100%;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
    transition: transform 0.5s ease;
  }

  ${DerivativeCard}:hover & img {
    transform: scale(1.05);
  }
`;

export const DerivativeInfo = styled.div`
  padding: 1.2rem;
  width: 100%;
  text-align: center;
  background-color: #111;

  h4 {
    font-size: 1.2rem;
    font-weight: 400;
    color: #fff;
    margin-bottom: 0.5rem;

    /* API 데이터 안전성 추가 */
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.3;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
  p {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);

    /* API 데이터 안전성 추가 */
    word-wrap: break-word;
    overflow-wrap: break-word;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

// 추천 향기 컴포넌트
export const RecommendationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const RecommendationCard = styled.div`
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    transition: background 0.4s ease;
    z-index: 1;
  }

  &:hover:after {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const RecommendationImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.8s ease;
  }

  ${RecommendationCard}:hover & img {
    transform: scale(1.05);
  }
`;

export const RecommendationOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 1.5rem;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 2;

  h4 {
    font-size: 1.3rem;
    font-weight: 400;
    color: #000;
    margin-bottom: 0.8rem;

    /* API 데이터 안전성 추가 */
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.3;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  p {
    font-size: 0.95rem;
    color: #333;
    opacity: 0.9;

    /* API 데이터 안전성 추가 */
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      -webkit-line-clamp: 2;
    }
  }
`;
