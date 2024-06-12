<template>
  <div class="form-container">
    <h1>Add New Campsite</h1>
    <form @submit.prevent="submitForm" class="campsite-form">
      <div class="input-group">
        <input type="text" v-model="campsite.name" placeholder="Campsite Name" required>
      </div>
      <div class="input-group">
        <textarea v-model="campsite.description" placeholder="Description" rows="4"></textarea>
      </div>
      <div class="input-group">
        <input type="text" v-model="campsite.location" placeholder="Location" required>
      </div>
      <div class="input-group">
        <input type="number" v-model="campsite.price" placeholder="Price" required min="0">
      </div>
      <div class="input-group">
        <input type="text" v-model="campsite.type" placeholder="Type" required>
      </div>
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="campsite.available"> Available
        </label>
      </div>
      <div class="input-group">
        <input type="file" @change="handleFileUpload" ref="file" required>
      </div>
      <button type="submit" class="submit-button">Add Campsite</button>
    </form>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'AddCampsiteForm',
  data() {
    return {
      campsite: { //campsite details from the form
        name: '',
        description: '',
        location: '',
        price: 0,
        type: '',
        available: false,
        imageUrl: null
      }
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]; //get the file from the form
      this.campsite.imageUrl = URL.createObjectURL(file); //create a url for the file
    },
    submitForm() {
      //extract data from the form
      const formData = new FormData();
      formData.append('name', this.campsite.name);
      formData.append('description', this.campsite.description);
      formData.append('location', this.campsite.location);
      formData.append('price', this.campsite.price);
      formData.append('type', this.campsite.type);
      formData.append('available', this.campsite.available);
      formData.append('image', this.$refs.file.files[0]);

      axios.post('/api/campsites', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' //set the header for the form data
        }
      })
      .then((response) => {
        this.$emit('campsite-added', response.data); //tell the parent that campsite data is added with the data
        //clear all the form
        this.campsite.description = "";
        this.campsite.name = "";
        this.campsite.imageUrl = "";
        this.campsite.price = "";
        this.campsite.type = "";
        this.campsite.available = false;
        this.campsite.location = "";
      })
      .catch(error => {
        console.error('Error:', error.response.data); //if something not working tell the user
        alert("Can not add campsite at this time!!");
      });
    }
  }
}
</script>

<style scoped>
.form-container {
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #ffffff;
}

.campsite-form h1 {
  color: #333;
  text-align: center;
}

.input-group, .checkbox-group {
  margin-bottom: 15px;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical;
}

input[type="checkbox"] {
  margin-right: 5px;
}

.submit-button {
  width: 250px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>