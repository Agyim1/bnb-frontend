<template>
  <div class="campsite-container">
    <h1 class="container-heading">All Campsites</h1>
    <div class="container-search">
      <input placeholder="search" v-model="search"/>
      <button @click="fetchCampsites">Search</button>
    </div>
    <CampsiteCard
      v-for="campsite in campsites"
      :key="campsite.id"
      :campsite="campsite"
    />
  </div>
</template>

<script>
import axios from 'axios';
import CampsiteCard from '@/components/CampsiteCard.vue';

export default {
  components: {
    CampsiteCard
  },
  data() {
    return {
      search :"",
      campsites: []
    };
  },
  mounted() { 
    this.fetchCampsites(); //fetch campsite details
  },
  methods: {
    fetchCampsites() {
      var url = this.search ? `/api/campsites?search=${this.search}` : '/api/campsites';
      axios.get(url)
        .then(response => {
          this.campsites = response.data; //set the campsites details
        })
        .catch(error => {
          console.error("There was an error fetching the campsites:", error);
        });
    }
  } 
}
</script>

<style scoped>
.campsite-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;
  padding: 20px;
  gap: 20px;
}

.container-heading {
  text-align: center;
  margin-bottom: 30px; 
  width: 100%; 
}

.container-search{
  width: 100%;
  text-align: center;
}

.container-search input{
  width: 40%;
  border-radius: 4px;
  height: 35px;
  padding: 0px 10px;
}

.container-search button{
  padding: 8px 30px;
    margin-left: 10px;
    border-radius: 5px;
    background-color: #28c840;
    color: white;
    border-color: #34a334;
    cursor: pointer;
}
</style>
