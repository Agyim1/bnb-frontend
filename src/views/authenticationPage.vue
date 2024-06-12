<template>
    <div class="page-container">
      <div class="auth-container">
      <h1>{{ isLogin ? 'Login' : 'Register' }}</h1>
      <p class="error-message">{{ message }}</p>
        <form @submit.prevent="isLogin ? login() : register()">
          <div>
            <label>Email:</label>
            <input type="email" v-model="email">
          </div>
          <div>
            <label>Password:</label>
            <input type="password" v-model="password">
          </div>
          <div v-if="!isLogin">
            <label>Username:</label>
            <input type="text" v-model="username">
          </div>
          <button type="submit" class="submit-btn">{{ isLogin ? 'Login' : 'Register' }}</button>
        </form>
      <button @click="toggleForm" class="toggle-btn">{{ isLogin ? 'Need an account? Register' : 'Already have an account? Login' }}</button>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import Router from '@/router';


export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      isLogin: true,
      message: ''
    };
  },
  mounted() {
   if (this.$store.state.user) {
     Router.push({ path: `/users/${this.$store.state.user.userID}` }); //if users is already logged in, redirect them to thier own profile page.
   }
  }
  ,
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin; //for toggling between register and login
    },
    login() {
      axios.post('/api/user/login', { // post email and password
        email: this.email,
        password: this.password
      })
      .then(response => {
        console.log('Login Success', response.data);
        this.$store.dispatch('update',response.data.user) //if success store the current logged in user in the store
        Router.push({path: `/users/${response.data.user.userID}` }) //redirect the user to profile page
      })
      .catch(error => {
        console.error('Login Failed', error.response.data);
        this.message = "Username or Passward is not correct!" //set the message that email and password is not correct
      });
  },
      register() {
        axios.post('/api/user/register', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(() => {
          alert("Registeration successful!!!")
        })
        .catch(error => {
          console.error('Registration Failed', error);
          this.message = "Failed to register user. Please try again later." //if failed
        });
      }
  }
}
</script>

<style scoped>
.page-container {
  height: 100vh;
  
  display: flex;
  justify-content: center; 
  align-items: center; 
  background-image: url('/public/Images/loginbg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.auth-container {
  width: 300px;
  background-color: #2e2e2e;
  color: white;
  border-radius: 9px;
  padding: 40px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
}
label, input, button {
  display: block;
  width: 100%;
  margin-top: 10px;
  height: 30px;
  border-radius: 3px;
}

.submit-btn{
  background-color: rgb(13, 188, 71);
  color:white;
  cursor: pointer;
}

.toggle-btn{
  background-color: rgb(112, 13, 188);
  color:white;
  cursor: pointer;
}

.error-message{
  color: red;
  margin-top: 10px;
}
</style>
