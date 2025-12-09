import { NFTRegistration, NFTRegistrationResponse } from "../types/nft";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

export const registerNFT = async (
  nftData: NFTRegistration
): Promise<NFTRegistrationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/nft/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nftData),
    });

    if (!response.ok) {
      throw new Error("NFT 등록에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("NFT 등록 중 오류 발생:", error);
    throw error;
  }
};
