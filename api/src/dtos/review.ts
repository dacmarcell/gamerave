export interface CreateReviewDto {
  title: string;
  description: string;
  gameName: string;
}

export interface UpdateReviewDto extends Partial<CreateReviewDto> {}
