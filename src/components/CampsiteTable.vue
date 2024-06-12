<template>
    <div class="table-container">
      <h1>{{ title }}</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Type</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="campsite in campsites" :key="campsite.id">
            <td>{{ campsite.name }}</td>
            <td>{{ campsite.location }}</td>
            <td>€{{ campsite.price.toFixed(2) }}</td>
            <td>{{ campsite.type }}</td>
            <td>{{ campsite.available ? 'Yes' : 'No' }}</td>
            <td>
              <button class="delete-button" @click="deleteCampsite(campsite.campsiteID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      campsites: Array,
      title: {
        type: String,
        default: 'Campsites'
      }
    },
    methods: {
      deleteCampsite(campsiteId) {
        this.$emit('delete-campsite', campsiteId); //tell the parent data is deleted
      }
    }
  }
  </script>
  
  <style scoped>
  .table-container {
    max-width: 100%;
    margin: 20px auto;
    overflow-x: auto;
    background: white;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-radius: 8px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }
  
  th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
    vertical-align: middle;
  }
  
  th {
    background-color: #2f2f2f;
    color: #cfcfcf;
  }
  
  tbody tr:hover {
    background-color: #f0f0f0;
  }
  
  .delete-button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  </style>
  