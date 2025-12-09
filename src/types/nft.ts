export interface NFTRegistration {
  userAddress: string;
  imageLink: string;
  imageName: string;
  description: string;
  price: number;
  tags: string;
  category: string;
}

export interface NFTRegistrationResponse {
  idx: number;
  userAddress: string;
  imageLink: string;
  imageName: string;
  description: string;
  price: number;
  tags: string;
  category: string;
}
