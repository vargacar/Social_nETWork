const router = require('express').Router();

const { 
  getAllThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

router
  .route('/:id')
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:id/reactions/:reactionId')
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;