import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const ScrollProgress = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(to right, #92847a, #c2b5a9);
  z-index: 1000;
`;

export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

export const IntroSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
`;

export const SliderSection = styled.div`
  width: 100%;
  min-height: 90vh;
  padding: 2rem 0 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 1rem;
`;

export const SectionTitle = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 400;
  color: #000000;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 2.8rem;
    margin-bottom: 1rem;
  }
`;

export const SubTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 300;
  color: #000000;
  letter-spacing: -0.01em;
  text-align: center;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const ScrollPrompt = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  opacity: 0.5;
  animation: fadeInOut 2s infinite;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;

  &:hover {
    opacity: 1;
    transform: translateY(5px);
  }

  @keyframes fadeInOut {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.7;
    }
  }
`;

export const ScrollIcon = styled.div`
  width: 30px;
  height: 50px;
  border: 2px solid #000;
  border-radius: 25px;
  position: relative;
  margin-bottom: 0.5rem;

  &::before {
    content: "";
    position: absolute;
    top: 10px;
    left: 50%;
    width: 4px;
    height: 8px;
    background: #000;
    margin-left: -2px;
    border-radius: 2px;
    animation: scrollDown 2s infinite;
  }

  @keyframes scrollDown {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateY(10px);
      opacity: 0.3;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const ScrollText = styled.p`
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  min-height: 70vh;
  margin-bottom: 1rem;

  /* API 데이터 동적 높이 대응 */
  @media (max-height: 600px) {
    min-height: 80vh;
  }
`;

export const SlidesWrapper = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Slide = styled(motion.div)`
  flex: 0 0 100%;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(300px, 0.8fr) 1.2fr;
  gap: 2rem;
  padding: 1rem 5% 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem 5% 2rem;
  }
`;

export const PerfumeImageWrapper = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
`;

export const ImageContainer = styled(motion.div)`
  width: 100%;
  max-width: 90%;
  aspect-ratio: 3/4;
  border-radius: 4px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  transition: all 0.5s ease;
  overflow: hidden;
  margin: 0 auto;

  &:hover {
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    max-width: 85%;
    aspect-ratio: 3/4;
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
  transition: transform 1.5s ease;
`;

export const PerfumeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem 2rem 1rem 0;
  overflow-y: auto;
  max-height: 70vh;
  position: relative;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    max-height: none;
  }
`;

export const ContentArea = styled.div`
  flex: 1;
  min-height: 180px;
  display: flex;
  flex-direction: column;
`;

export const MetaArea = styled.div`
  margin-top: auto;
`;

export const PerfumeName = styled(motion.h2)`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 3rem;
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

export const PerfumeSubtitle = styled(motion.h3)`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.2rem;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
  line-height: 1.5;
`;

export const PerfumeStory = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
  opacity: 0.9;
  margin-bottom: 2rem;
  white-space: pre-wrap;

  /* API 데이터 안전성 추가 */
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-height: 200px;
  overflow-y: auto;

  br + br {
    display: none;
  }

  br {
    line-height: 2;
  }

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
`;

export const PerfumePrice = styled(motion.div)`
  font-size: 1.4rem;
  font-weight: 400;
  color: #92847a;
  margin-bottom: 2rem;
`;

export const TagsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

export const Tag = styled(motion.span)`
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.05);
  color: #333;
  font-size: 0.9rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export const CreatorInfo = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

export const CreatorLabel = styled.span`
  color: #333;
  opacity: 0.7;
  margin-right: 0.5rem;
`;

export const CreatorAddress = styled.span`
  font-family: monospace;
  color: #92847a;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

export const Button = styled(motion(Link))`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 1rem 3rem;
  background: transparent;
  border: 1px solid #000;
  color: #000;
  font-size: 1rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: currentColor;
    transition: width 0.3s ease;
  }

  &:hover {
    background: #000;
    color: #fff;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const NavButton = styled.button<{
  $direction: "left" | "right";
  $disabled?: boolean;
}>`
  position: absolute;
  top: 45%;
  ${(props) => (props.$direction === "left" ? "left: 1rem;" : "right: 1rem;")}
  transform: translateY(-50%);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: ${(props) =>
    props.$disabled ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0.1)"};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  z-index: 10;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  
  @media (max-width: 768px) {
    top: auto;
    bottom: -2rem;
    ${(props) => (props.$direction === "left" ? "left: 30%;" : "right: 30%;")}
  }

  &:hover {
    background: ${(props) =>
      props.$disabled ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0.2)"};
    transform: ${(props) =>
      props.$disabled ? "translateY(-50%)" : "translateY(-50%) scale(1.1)"};
  }

  &::before {
    content: '';
    width: 0.8rem;
    height: 0.8rem;
    border-style: solid;
    border-width: 0 2px 2px 0;
    transform: ${(props) =>
      props.$direction === "left" ? "rotate(135deg)" : "rotate(-45deg)"};
    display: inline-block;
    margin-${(props) =>
      props.$direction === "left" ? "right" : "left"}: 0.2rem;
  }
`;

export const SlideIndicators = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-top: 2rem;
`;

export const Indicator = styled(motion.div)<{ $active: boolean }>`
  width: ${(props) => (props.$active ? "2rem" : "0.8rem")};
  height: 0.8rem;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.$active ? "#000" : "rgba(0, 0, 0, 0.2)"};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.$active ? "#000" : "rgba(0, 0, 0, 0.4)"};
    transform: scale(1.1);
  }
`;

export const MoreScentButton = styled(motion(Link))`
  padding: 1rem 3rem;
  background: transparent;
  border: 1px solid #000;
  color: #000;
  font-size: 1rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  margin: 4rem auto 0;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: currentColor;
    transition: width 0.3s ease;
  }

  &:hover {
    background: #000;
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &:hover::after {
    width: 100%;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;
