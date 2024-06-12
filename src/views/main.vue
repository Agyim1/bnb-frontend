<template>
 <div>
   <div class="service-section">
     <div class="content">
       <h1>Our Services</h1>
       <p>Explore our wide range of camping services tailored to make your outdoor experiences memorable and hassle-free!</p>
     </div>
   </div>
   <div class="center-text">
     <h1>Top Campsites</h1>
   </div>
   <div class="campsite-container">
     <CampsiteCard
       v-for="campsite in campsites"
       :key="campsite.id"
       :campsite="campsite"
     />
   </div>
   <div class="services-info">
     <div>
       <h1>Explore Our Camping Services</h1>
       <ul>
         <li>We provide great security, ensuring a safe and enjoyable experience for all campers.</li>
         <li>Our campsites are equipped with modern amenities to enhance your comfort in the wilderness.</li>
         <li>24/7 customer support to help you with any inquiries or issues during your stay.</li>
         <li>Guided tours and activities to make your camping adventure more exciting and memorable.</li>
       </ul>
     </div>
   </div>
   <div class="welcome-message">
     <h2>We Love to Host You</h2>
   </div>
 </div>
</template>
  
  <script>
  import axios from 'axios';
  import CampsiteCard from '@/components/CampsiteCard.vue';
  
  export default {
    name: 'MainView',
    components: {
      CampsiteCard //using campsite cards
    },
    data() {
      return {
        campsites: []
      };
    },
    mounted() { 
      this.fetchCampsites(); //fetch all campsite
    },
    methods: {
      fetchCampsites() {
        axios.get('/api/campsites')
          .then(response => {
            this.campsites = response.data.slice(0,4); //divide array into arrays of four elements
          })
          .catch(error => {
            console.error("There was an error fetching the campsites:", error);
          });
      }
    } 
  }
  </script>
  
  <style scoped>
  .center-text {
    text-align: center;
    margin: 40px 0;
  }
  
  .service-section {
    background: url('../../public/Images/camping_services.jpg') no-repeat center center; /* Adjust path as needed */
    background-size: cover;
    height: 550px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative; 
  }
  
  .service-section .content {
    z-index: 2; 
    text-align: center;
    padding: 20px;
    max-width: 800px;
  }
  
  .service-section::before {
    content: '';
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  .services-info {
    background-color: #222;
    color: white;
    padding: 40px;
    text-align: left;
  }
  
  .services-info h1 {
    margin-bottom: 20px;
  }
  
  .services-info ul {
    list-style-type: disc;
    padding-left: 40px;
  }
  
  
  .welcome-message {
    background-color: #f9f9f9;
    color: #333;
    text-align: center;
    padding: 40px 20px;
    margin-top: 40px;
  }
  
  .campsite-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
  }
  
  </style>
  