export interface Game {
  id: number;
  name: string;
  likes: number;
  reviews: Review[];
}

export interface Review {
  id: number;
  title: string;
  description: string;
  likes: number;
}
