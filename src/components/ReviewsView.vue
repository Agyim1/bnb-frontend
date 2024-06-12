<template>
    <div class="review-container">
      <ul class="review-list">
        <li v-for="review in reviews" :key="review.reviewID" class="review-card">
          <div class="review-rating"><span class="rating-title">Rating:</span> {{ review.rating }}</div>
          <div class="review-comment"><span class="comment-title">Comment:</span> {{ review.comment }}</div>
          <div class="review-user"><span class="user-title">User:</span> {{ review.user.username }}</div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ReviewComponent',
    props: {
      reviews: Array
    }
  };
  </script>
  
  <style scoped>
  .review-container {
    margin: 20px;
    overflow-y: auto;
  }
  
  .review-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .review-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease-in-out;
  }
  
  .review-card:hover {
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  }
  
  .review-rating, .review-comment, .review-user {
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
  }
  
  .rating-title, .comment-title, .user-title {
    font-weight: bold;
  }
  </style>