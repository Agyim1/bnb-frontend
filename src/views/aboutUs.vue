<template>
    <div class="about-container">
      <div class="half image-side"></div>
      <div class="half text-side">
        <div class="text-content">
          <h1>About Us</h1>
          <p>
            Welcome to Campsite Booker, the premier destination for discovering and booking the best campsites around the globe. 
            Whether you're looking to unwind under the stars or seek out an adventure, we're here to connect you with the perfect 
            outdoor experience.
          </p>
          <p>
            Our mission is to make outdoor experiences accessible to everyone, with a user-friendly platform that simplifies the 
            booking process. Explore our wide range of campsites and get ready for your next outdoor adventure with us!
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutUs'
  }
  </script>
  
  <style scoped>
  .about-container {
    display: block;
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
  .half {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
  }
  .image-side {
    left: 0;
    background: url('/public/Images/aboutus.jpg') no-repeat center center;
    background-size: cover;
  }
  .text-side {
    right: 0;
    background: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text-content {
    max-width: 90%;
    text-align: center;
    margin-top: 20px;
    padding: 20px;
  }

  .text-content h1 {
    margin-bottom: 39px;
  }

  .text-content p {
    font-size: 23px;
  }
  </style>
  