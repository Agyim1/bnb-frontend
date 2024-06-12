<template>
    <div>
      <bookings-table
        :bookings="bookings"
        @delete-booking="handleDeleteBooking"
        title="All Bookings"
      ></bookings-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import BookingsTable from '../components/BookingTable.vue';
  
  export default {
    components: {
      BookingsTable
    },
    data() {
      return {
        bookings: []
      };
    },
    mounted() {
      this.fetchBookings(); //on mount fetch all bookings
    },
    methods: {
      fetchBookings() {
        axios.get('/api/bookings') //get all the bookings
          .then(response => {
            this.bookings = response.data; //set the data of the booking
          })
          .catch(error => {
            console.error("Error fetching bookings:", error);
          });
      },
      handleDeleteBooking(bookingId) {
        axios.delete(`/api/bookings/${bookingId}`) //call delete booking function
            .then(() => {
              // Filter out the booking after successful deletion
              this.bookings = this.bookings.filter(b => b.bookingID !== bookingId);
            })
            .catch(error => {
              console.error("Error deleting booking:", error);
            });
        },
    }
  }
  </script>
  