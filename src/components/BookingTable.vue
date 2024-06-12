<template>
  <div class="table-container">
    <h1>{{ title }}</h1>
    <table>
      <thead>
        <tr>
          <th v-if="showUserDetails">User Name</th>
          <th v-if="showUserDetails">User Email</th>
          <th>Campsite Name</th>
          <th>Location</th>
          <th>Total Price</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in bookings" :key="booking.bookingID">
          <td v-if="showUserDetails">{{ booking.userDetails.username }}</td>
          <td v-if="showUserDetails">{{ booking.userDetails.email }}</td>
          <td>{{ booking.campsite.name }}</td>
          <td>{{ booking.campsite.location }}</td>
          <td>€{{ calculateTotalCost(booking) }}</td>
          <td>{{ booking.startDate | formatDate }}</td>
          <td>{{ booking.endDate | formatDate }}</td>
          <td>
            <button class="delete-button" @click="deleteBooking(booking.bookingID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

  <script>
  export default {
    props: {
      bookings: Array, //all bookings
      title: { //title of the table
        type: String,
        default: 'Bookings'
      }
    },
    computed: {
      showUserDetails() {
        return this.bookings.some(booking => booking.userDetails); //if user details is present in atleat one show the user details
      }
    },
    methods: {
      calculateTotalCost(booking) {
        const start = new Date(booking.startDate);
        const end = new Date(booking.endDate);
        const days = (end - start) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
        return (booking.campsite.price * days).toFixed(2); // Return the total cost with 2 decimal places
      },
      deleteBooking(bookingId) {
        this.$emit('delete-booking', bookingId); //tell the parent data is deleted with the booking id
      }
    },
    filters: {
      formatDate(value) {
        if (!value) return '';
        return new Date(value).toLocaleDateString(); //format date and time is local date string format
      }
    }
  }
  </script>
  
  <style>
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