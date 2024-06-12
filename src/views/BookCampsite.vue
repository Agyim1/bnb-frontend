<template>
  <div class="campsite-container">
    <div class="campsite-image">
      <img :src="fullImageUrl(campsite.imageUrl)" alt="Campsite image" />
    </div>
    <div class="campsite-details">
      <h1>{{ campsite.name }}</h1>
      <p>{{ campsite.description }}</p>
      <p><strong>Location:</strong> {{ campsite.location }}</p>
      <p><strong>Price per night:</strong> €{{ campsite.price }}</p>
      <p><strong>Type:</strong> {{ campsite.type }}</p>
      <p :class="campsite.available ? 'campsite-available':'campsite-booked'"> {{ campsite.available ? 'Available' : 'Booked' }}</p>
      <div class="booking-section" v-show="showBooking">
        <h2>Book this campsite</h2>
        <input type="date" v-model="booking.startDate" required>
        <input type="date" v-model="booking.endDate" required>
        <p v-if="totalCost !== null"><strong>Total cost:</strong> €{{ totalCost }}</p>
        <button @click="submitBooking" :disabled="!isBookingValid">Book Campsite</button>
      </div>
      <div class="review-section" v-show="$store.state.user">
        <h2>Add a Review</h2>
        <form @submit.prevent="submitReview" class="review-form">
          <div class="form-group">
            <label for="rating">Rating:</label>
            <select id="rating" v-model="newReview.rating" required>
              <option disabled value="">Please select one</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div class="form-group">
            <label for="comment">Comment:</label>
            <textarea id="comment" v-model="newReview.comment" required></textarea>
          </div>
          <button type="submit" class="submit-btn">Submit Review</button>
        </form>
      </div>
      <ReviewsView :reviews="reviews"></ReviewsView>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ReviewsView from '@/components/ReviewsView.vue'

export default {
  components:{
    ReviewsView
  },
  data() {
    return {
      campsite: {},
      reviews: [],
      newReview: {
        rating: '',
        comment: ''
      },
      booking: {
        startDate: '',
        endDate: ''
      }
    };
  },
  computed: {
    isBookingValid() {
      const today = new Date().toISOString().split('T')[0];
      return this.booking.startDate >= today && this.booking.endDate > this.booking.startDate; //check the enter date if the start date is less then end date
    },
    totalCost() {
      if (this.isBookingValid) {
        const start = new Date(this.booking.startDate); //start date of the booking
        const end = new Date(this.booking.endDate); //end date of the booking
        const days = (end - start) / (1000 * 60 * 60 * 24); // convert milliseconds to days
        return this.campsite.price * days; //calculate total price
      }
      return null;
    },
    showBooking(){
      return (this.$store.state.user && this.campsite.available) //show booking button if the user is logged in and campsite is available
    }
  },
  mounted() {
    this.fetchCampsiteDetails(); //on mount fetch the campsite details
  },
  methods: {
    fetchCampsiteDetails() {
      const campsiteId = this.$route.params.id;
      axios.get(`/api/campsites/${campsiteId}`)
        .then(response => {
          this.campsite = response.data;
          this.reviews = response.data.reviews; //reviews are part of the campsite response
        })
        .catch(error => {
          console.error("There was an error fetching the campsite details:", error);
        });
    },
    submitBooking() {
      const bookingData = { //booking details
        campsiteId: this.$route.params.id,
        userId: this.$store.state.user.userID,
        startDate: new Date(this.booking.startDate).toISOString(),
        endDate: new Date(this.booking.endDate).toISOString()
      };
      axios.post('/api/bookings', bookingData)
        .then(response => {
          alert('Booking successful!');
          console.log(response.data);
          this.campsite.available = false;
        })
        .catch(error => {
          console.error('Error making booking:', error.response.data);
        });
    },
    submitReview() {
      const reviewData = { //review details
        campsiteId: this.$route.params.id,
        userId: this.$store.state.user.userID,
        rating: this.newReview.rating,
        comment: this.newReview.comment,
        CreatedAt: new Date().toISOString()
      };
      axios.post('/api/reviews', reviewData)
        .then(response => {
          //clear the form details
          this.reviews.push(response.data);
          this.newReview.rating = '';
          this.newReview.comment = '';
          alert('Review submitted successfully!');
        })
        .catch(error => {
          console.error('Error submitting review:', error);
          alert('Error submitting review. Please try again.');
        });
    },
    fullImageUrl(relativeUrl) {
      return relativeUrl ? `http://localhost:5043/${relativeUrl}` : '';
    }
  }
}
</script>

<style scoped>
.campsite-container {
  display: flex;
}

.campsite-image {
  position: fixed;
  width: 50vw; 
  height: 100vh; 
  left: 0; 
  top: 0; 
  z-index: -1; 
}

.campsite-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

.campsite-details {
  margin-left: 50vw; 
  width: 50vw; 
  background: #fff; 
  padding: 20px; 
  box-sizing: border-box; 
  min-height: 100vh;
}

.booking-section, .review-section {
  margin-top: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

input[type="date"], select, textarea {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #ccc;
}

.review-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 10px;
}

.submit-btn {
  width: auto;
  align-self: center;
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

