import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #ffffff;
  padding: 6rem 0;
`;

export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.03em;

  /* API 데이터 안전성 추가 */
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

export const SubTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 300;
  color: #333;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  /* API 데이터 안전성 추가 */
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 90%;
    padding: 0 1rem;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0 1rem;
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  padding: 0.6rem 1.5rem;
  background: ${(props) => (props.$active ? "#000" : "transparent")};
  color: ${(props) => (props.$active ? "#fff" : "#000")};
  border: 1px solid #000;
  border-radius: 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  white-space: nowrap;

  &:hover {
    background: ${(props) => (props.$active ? "#000" : "rgba(0,0,0,0.1)")};
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1.2rem;
    font-size: 0.8rem;
  }
`;

export const Gallery = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;

  @media (max-width: 768px) {
    width: 95%;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const ScentCard = styled(motion.div)`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  background: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: fit-content;

  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

export const CardImageContainer = styled.div`
  width: 100%;
  height: 370px;
  overflow: hidden;
  position: relative;

  /* API 이미지 안전성 */
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    height: 320px;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  transition: transform 0.6s ease;

  /* 이미지 로드 실패 대응 */
  &:not([src]) {
    display: none;
  }

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
  }

  ${ScentCard}:hover & {
    transform: scale(1.05);
  }
`;

export const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.3;

  /* API 데이터 안전성 추가 */
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.6rem;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const CardPrice = styled.div`
  font-size: 1.1rem;
  color: #92847a;
  margin-bottom: 1rem;
  font-weight: 500;

  /* API 가격 데이터 안전성 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  min-height: 2rem;

  /* 태그가 없을 때도 레이아웃 유지 */
  &:empty {
    margin-bottom: 1rem;
  }
`;

export const CardTag = styled.span`
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  color: #333;

  /* 긴 태그명 대응 */
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ViewButton = styled(Link)`
  display: inline-block;
  padding: 0.7rem 0;
  width: 100%;
  background: transparent;
  border: 1px solid #000;
  color: #000;
  text-align: center;
  text-decoration: none;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    background: #000;
    color: #fff;
    transform: translateY(-2px);
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 5rem 0;
  grid-column: 1 / -1;
  color: #666;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    padding: 3rem 0;
    font-size: 1.1rem;
  }
`;

export const BackToTop = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s ease;
  z-index: 100;

  &:hover {
    opacity: 1;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: "";
    width: 0.8rem;
    height: 0.8rem;
    border-style: solid;
    border-width: 0 2px 2px 0;
    transform: rotate(-135deg);
    display: inline-block;
    margin-top: 0.3rem;
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
  }
`;
