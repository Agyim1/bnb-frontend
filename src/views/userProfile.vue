<template>
  <div class="profile-container">
    <h1>{{$store.state.user.isAdmin ? "Admin" : "User"}} Profile</h1>
    <div class="user-info">
      <p><strong>Username:</strong> {{ userProfile.username }}</p>
      <p><strong>Email:</strong> {{ userProfile.email }}</p>
      <button class="Btn" @click="toogleResetPasswordDiv" v-show="!isResetPasswordDialogue">Reset Password</button>
      <button class="Btn editProfileBtn" @click="toggleEditModel">Edit Details</button> 
      <div class='resetPass-div' v-show="isResetPasswordDialogue">
        <form v-on:submit.prevent>
          <div class="form-group">
            <label for="comment">Old Password:</label>
            <input type="password" class='pass-field' v-model="resetPassword.oldPassword" required />
        </div>
        <div class="form-group">
            <label for="comment">New Password:</label>
            <input type="password" class='pass-field' v-model="resetPassword.newPassword" required />
        </div>
        <div class="form-group">
            <label for="comment">Repeat Password:</label>
            <input type="password" class='pass-field' v-model="resetPassword.rNewPassword" required />
        </div>
        <input class="Btn" type="submit" @click="handleResetPassword" value="Reset Password"/>
        <button @click="toogleResetPasswordDiv" type="button" class="cancelBtn">Cancel</button>
        </form>
      </div>
    </div>
    <bookings-table :bookings="userProfile.bookings" title="User's Bookings" @delete-booking="handleDeleteBooking"></bookings-table>
    <add-campsite-form v-show="$store.state.user.isAdmin"  @campsite-added="handleNewCampsite"></add-campsite-form>
    <campsite-table v-show="$store.state.user.isAdmin" :campsites="campsites" @delete-campsite="handleDeleteCampsite"></campsite-table>
    <EditUserModal
      v-if="showEditModal"
      :username="userProfile.username"
      :email="userProfile.email"
      @confirm="handleUserUpdate"
      @close="toggleEditModel"
    />
  </div>
</template>
  
<script>
import axios from 'axios';
import BookingsTable from '../components/BookingTable.vue';
import AddCampsiteForm from '../components/AddCampsite.vue';
import CampsiteTable from '../components/CampsiteTable.vue';
import EditUserModal from '../components/EditUserDetails.vue';


export default {
  components: {
    BookingsTable,
    AddCampsiteForm,
    CampsiteTable,
    EditUserModal
  },
  data() {
    return {
      userProfile: {
        username: '',
        email: '',
        bookings: []
      },
      campsites: [],
      isResetPasswordDialogue: false,
      showEditModal: false,
      resetPassword: {
        oldPassword: '',
        newPassword: '',
        rNewPassword: ''
      }
    };
  },
  mounted() {
    this.fetchUserProfile(); //fetch user profiles
    this.fetchCampsites(); //fetch campsites
  },
  methods: {
    toogleResetPasswordDiv(){
      this.isResetPasswordDialogue = !this.isResetPasswordDialogue; //toggle for reset button
    },
    handleNewCampsite(newCampsite) {
      this.campsites.push(newCampsite); //push new campsite in table
      alert("Campsite added successfuly!")
    },
    handleDeleteCampsite(campsiteId) {
      axios.delete(`/api/campsites/${campsiteId}`)
        .then(() => {
          this.campsites = this.campsites.filter(c => c.campsiteID !== campsiteId); //filter all campsite where the deleted campsite is not present
        })
        .catch(error => {
          console.error("Error deleting campsite:", error);
        });
    },
    fetchUserProfile() {
      const userId = this.$route.params.id;
      axios.get(`/api/user/${userId}`)
        .then(response => {
            this.userProfile = response.data;
        })
        .catch(error => {
            console.error("Error fetching user profile:", error);
        });
      
      // Check if user is admin and fetch all bookings if so
      if(this.$store.state.user.isAdmin){
        axios.get('/api/bookings')
          .then(response => {
            this.userProfile.bookings = response.data;
          })
          .catch(error => {
            console.error("Error fetching bookings:", error);
          });
      }
    },
    fetchCampsites() {
      if (this.$store.state.user.isAdmin) { //if user is admin fetch all the campsites
        axios.get('/api/campsites')
          .then(response => {
            this.campsites = response.data;
          })
          .catch(error => {
            console.error("Error fetching campsites:", error);
          });
      }
    },
    handleDeleteBooking(bookingId) {
        axios.delete(`/api/bookings/${bookingId}`)
          .then(() => {
              this.userProfile.bookings = this.userProfile.bookings.filter(b => b.bookingID !== bookingId); //delete booking
          })
          .catch(error => {
              console.error("Error deleting booking:", error);
          });
    },
    handleResetPassword(){
      if(this.resetPassword.newPassword != this.resetPassword.rNewPassword){ //if both new password is not same display error
        alert("The new and repeat password must be same.");
        return;
      }
      var data = {
        oldPassword: this.resetPassword.oldPassword,
        newPassword: this.resetPassword.newPassword
      }

      //reset the form
      this.resetPassword.oldPassword = "";
      this.resetPassword.newPassword = "";
      this.resetPassword.rNewPassword = "";

      axios.patch(`/api/user/resetPassword/${this.$store.state.user.userID}`,data)
      .then(() => {
        alert("Your password change successfuly!!");
      })
      .catch(error =>{
        if(error.response.status == 401){ //if server return 401 then the old password does not matched
          alert("Your old password does not matched with the orignal password.");
        }
        else{
          alert("Can not change password at this time, please try again later.");
          console.log(error);
        }
      })
    },
    toggleEditModel(){
      this.showEditModal = !this.showEditModal
    },
    handleUserUpdate(user){
      var userDetails = {
        Username:user.username,
        userID: this.$store.state.user.userID,
        Password: user.password,
        Email:""
      }
      axios.post('/api/user', userDetails)
      .then(()=>{
        alert("User details are updated sucessfuly!")
        this.userProfile.username = user.username;
        var tempUser = this.$store.state.user;
        tempUser.username = user.username;
        this.$store.dispatch('update',tempUser)
      })
      .catch((res)=>{
        if(res.response.status == 401){
          alert("Wrong Password!!");
        }
        else{
          alert("Can not edit the username, please try again later!");
        }
      })
    }
  }
}
</script>

  
<style scoped>
  .profile-container {
    max-width: 90%;
    min-height: 100vh;
    margin: 20px auto;
    padding: 20px;
    box-shadow: 0 4px 8px 4px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    background-color: #fafafa;
  }
  
  h1 {
    color: #333;
    text-align: center;
  }
  
  .user-info {
    background-color: #f4f4f4;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  
  .user-info p {
    font-size: 16px;
    color: #000000;
    line-height: 1.5;
  }
  
  .bookings-table {
    width: 100%;
  }

  .campsite-table {
    width: 100%;
  }

  .Btn {
    background-color: #02c776;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
  }

  .cancelBtn {
    background-color: #ff3535;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
    margin-left:20px;
  }

  .pass-field {
    width: 200px;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: block;
  }

  .resetPass-div{
    margin-top: 20px;
  }

  .editProfileBtn{
    margin-left: 10px;
  }
</style>
