export interface CreateReviewDto {
  title: string;
  description: string;
  gameName?: string;
  gameId?: number;
  userId: number;
}

export interface UpdateReviewDto extends Partial<CreateReviewDto> {}
