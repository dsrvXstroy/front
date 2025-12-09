import React, { useState } from "react";
import { registerNFT } from "../services/nftService";
import { NFTRegistration } from "../types/nft";
import styled from "styled-components";

const NFTRegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<NFTRegistration>({
    userAddress: "",
    imageLink: "",
    imageName: "",
    description: "",
    price: 0,
    tags: "",
    category: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerNFT(formData);
      alert("NFT가 성공적으로 등록되었습니다!");
      console.log("등록된 NFT:", response);
    } catch (error) {
      alert("NFT 등록에 실패했습니다.");
      console.error("등록 실패:", error);
    }
  };

  return (
    <Container>
      <Title>NFT 등록</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>이미지 링크 (IPFS)</Label>
          <Input
            type="text"
            name="imageLink"
            value={formData.imageLink}
            onChange={handleInputChange}
            placeholder="IPFS 이미지 링크를 입력하세요"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>이름</Label>
          <Input
            type="text"
            name="imageName"
            value={formData.imageName}
            onChange={handleInputChange}
            placeholder="NFT 이름을 입력하세요"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>설명</Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="NFT에 대한 설명을 입력하세요"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>가격 (ETH)</Label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="가격을 입력하세요"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>태그 (콤마로 구분)</Label>
          <Input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="태그를 콤마로 구분하여 입력하세요"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>카테고리</Label>
          <Input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="카테고리를 입력하세요"
            required
          />
        </FormGroup>

        <SubmitButton type="submit">NFT 등록하기</SubmitButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default NFTRegistrationPage;
