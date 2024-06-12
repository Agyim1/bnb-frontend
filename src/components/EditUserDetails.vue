<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Edit User Details</h2>
      <form @submit.prevent="confirmEdit">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="localUsername">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="localEmail" disabled>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password">
        </div>
        <div class="button-group">
          <button type="submit" class="btn confirm-btn">Confirm</button>
          <button type="button" class="btn close-btn" @click="closeModal">Close</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    username: String,
    email: String
  },
  data() {
    return {
      localUsername: '', 
      localEmail: '',     
      password: '' 
    };
  },
  mounted() {
    this.localUsername = this.username;
    this.localEmail = this.email;
  },
  methods: {
    confirmEdit() {
      this.$emit('confirm', {
        username: this.localUsername,
        email: this.localEmail,
        password: this.password
      });
      this.closeModal();
    },
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 999;
}

.modal-content {
  background-color: #fafafa;
  padding: 35px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 4px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input[type="text"], input[type="email"], input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  color: white;
}

.confirm-btn {
  background-color: #4CAF50;
  margin-right: 10px; /* Adds spacing between the buttons */
}

.close-btn {
  background-color: #ff3535; /* Red color for the close button */
}
</style>
