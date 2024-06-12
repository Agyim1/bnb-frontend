<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
    <footer class="site-footer">
      <p>&copy; 2024 Camp Booking. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.site-footer {
  background-color: #444;
  color: white;
  text-align: center;
  padding: 20px 0;
  font-size: 16px;
}
</style>
