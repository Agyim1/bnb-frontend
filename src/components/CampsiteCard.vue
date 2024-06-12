<template>
    <div class="campsite-card" @click="$router.push(`/campsites/${campsite.campsiteID}`)">
      <img :src="fullImageUrl(campsite.imageUrl)" alt="Campsite Photo" class="campsite-image"/>
      <div class="campsite-info">
        <h3>{{ campsite.name }}</h3>
        <p>{{ campsite.description }}</p>
        <p><strong>Location:</strong> {{ campsite.location }}</p>
        <p><strong>Price:</strong> €{{ campsite.price }}</p>
        <p :class="campsite.available ? 'campsite-available': 'campsite-booked'">{{ campsite.available ? "Available" : "Booked" }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      campsite: {
        type: Object,
        required: true
      }
    },
    methods: {
        fullImageUrl(relativeUrl) { //make the relative url full with the backend address
          return `http://localhost:5043/${relativeUrl}`;
        }
    }
  }
  </script>
  
  <style scoped>
  .campsite-card {
    width: 300px;
    box-shadow: 0px 9px 15px 6px rgb(0,0,0,0.2);
    margin: 20px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
  }

  .campsite-card:hover{
    translate: 0px -20px;
  }
  
  .campsite-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .campsite-info {
    padding: 15px;
    background-color: #fff;
  }

  .campsite-booked{
    background-color: #ff6565;
    display: inline-block;
    border-radius: 10px;
    padding: 2px 12px;
    margin-top: 10px;
  }

  .campsite-available{
    background-color: #65ffa0;
    display: inline-block;
    border-radius: 10px;
    padding: 2px 12px;
    margin-top: 10px;
  }
  </style>
  