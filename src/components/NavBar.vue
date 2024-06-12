<template>
    <nav>
      <div class="logo">Dreamland Retreat</div>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/campsites">Campsites</router-link></li>
        <li><router-link to="/contactus">Contact Us</router-link></li>
        <li><router-link to="/aboutus">About Us</router-link></li>
      </ul>
      <div class="login">
        <router-link v-show="!$store.state.user" to="/login">Login</router-link>
        <router-link v-show="$store.state.user" :to="`/users/${$store.state.user ? $store.state.user.userID : ''}`">{{$store.state.user ? $store.state.user.username : ''}}</router-link>
        <a class="logout" v-show="$store.state.user" @click="logout">Logout</a>
      </div>
    </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('update',null) //update the store object of user to null
      if(this.$router.currentRoute.path !== '/' && this.$router.currentRoute.path !== '/home' ){ //if the current user is NOT on home page
        this.$router.push({path: '/' }); //redirect them on home page
      }
      
    }
  }
}
</script>

<style>
nav {
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    padding: 1rem;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    margin-right: 30px; 
}

.nav-links {
    list-style: none;
    display: flex;
    flex-grow: 1; 
}

.nav-links li {
    display: inline;
}

.nav-links li a {
    color: white;
    text-decoration: none;
    margin-right: 20px; 
    font-size: 16px;
}

.nav-links li a:hover {
    text-decoration: underline;
}

.login {
    margin-left: auto; 
}

.login a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    margin-left: 10px;
}

.logout{
    cursor: pointer;
}

.login a:hover {
    text-decoration: underline;
}
</style>