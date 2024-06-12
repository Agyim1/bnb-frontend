import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/views/authenticationPage.vue';
import CampsitesView from '@/views/campSite.vue';
import BookCampsite from '@/views/BookCampsite.vue'
import AllBookings from '@/views/allBookings.vue'
import UserProfile from '@/views/userProfile.vue'
import MainView from '@/views/main.vue';
import AboutUs from '@/views/aboutUs.vue'
import ContactUs from '@/views/contactUs.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',  // Enabling HTML5 history mode
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MainView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/campsites',
      name: 'Campsites',
      component: CampsitesView
    },
    {
      path: '/campsites/:id',
      name: 'CampsiteDetails',
      component: BookCampsite,
      props: true
    },
    {
      path: '/bookings',
      name: 'BookingTable',
      component: AllBookings,
      props: true
    },
    {
      path: '/users/:id',
      name: 'UserProfile',
      component: UserProfile,
      props: true
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: AboutUs
    },
    {
      path: '/contactus',
      name: 'contactus',
      component: ContactUs
    }
  ]
});
