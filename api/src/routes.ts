import { GameController } from './controller/GameController';
import { ReviewController } from './controller/ReviewController';

export const Routes = [
  //Games
  {
    method: 'get',
    route: '/games',
    controller: GameController,
    action: 'all'
  },
  {
    method: 'get',
    route: '/games/:id',
    controller: GameController,
    action: 'one'
  },
  {
    method: 'post',
    route: '/games',
    controller: GameController,
    action: 'save'
  },
  {
    method: 'delete',
    route: '/games/:id',
    controller: GameController,
    action: 'remove'
  },
  // Likes and Dislikes
  {
    method: 'post',
    route: '/like/:id',
    controller: GameController,
    action: 'like'
  },
  {
    method: 'post',
    route: '/dislike/:id',
    controller: GameController,
    action: 'dislike'
  },
  // Reviews
  {
    method: 'get',
    route: '/reviews',
    controller: ReviewController,
    action: 'all'
  },
  {
    method: 'get',
    route: '/reviews/:id',
    controller: ReviewController,
    action: 'one'
  },
  {
    method: 'post',
    route: '/reviews',
    controller: ReviewController,
    action: 'save'
  },
  {
    method: 'put',
    route: '/reviews/:id',
    controller: ReviewController,
    action: 'update'
  },
  {
    method: 'delete',
    route: '/reviews/:id',
    controller: ReviewController,
    action: 'remove'
  },
  // Review Likes and Dislikes
  {
    method: 'post',
    route: '/like-review/:id',
    controller: ReviewController,
    action: 'likeReview'
  },
  {
    method: 'post',
    route: '/dislike-review/:id',
    controller: ReviewController,
    action: 'dislikeReview'
  }
];
