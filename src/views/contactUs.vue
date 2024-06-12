<template>
  <div class="contact-us-container">
    <div class="header-image"></div> <!-- Using background-image for better control -->
    <div class="details-map-container">
      <div class="contact-details">
        <h1>Contact Us</h1>
        <p><strong>Dreamland Retreat</strong></p>
        <p><i class="fas fa-map-marker-alt"></i> 123 Camp Lane, Natureville, Earth</p>
        <p><i class="fas fa-phone"></i> (123) 456-7890</p>
        <p><i class="fas fa-envelope"></i> contact@campbooking.com</p>
      </div>
      <div class="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11547.22314453864!2d4.42253121663005!3d51.22578200071459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3f68ebfc3887d%3A0x3eaf448482a88ab8!2sAntwerp%2C%20Belgium!5e0!3m2!1sen!2sit!4v1716721495365!5m2!1sen!2sit"
          width="600"
          height="450"
          frameborder="0"
          style="border:0;"
          aria-hidden="false"
          tabindex="0">
        </iframe>
      </div>
    </div>
    <div class="contact-form">
  <h2>Write us a message...</h2>
  <form @submit.prevent="">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" placeholder="Enter your name">
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" placeholder="Enter your email">
    </div>
    <div class="form-group">
      <label for="message">Message:</label>
      <textarea id="message" placeholder="Your message"></textarea>
    </div>
    <button type="submit">Send</button>
  </form>
</div>
  </div>
</template>

  
<style scoped>
.contact-us-container {
  text-align: center;
}

.header-image {
  background-image: url('../../public/Images/loginbg.jpg');
  height: 500px;
  background-position: center;
  background-size: cover;
}

.details-map-container {
  display: flex;
  justify-content: space-around; /* Adjusted for better spacing */
  align-items: center; /* Keeps content vertically centered */
  margin-bottom: 20px;
}

.contact-details, .map-container {
  flex: 1; /* Each takes half of the container */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Center content horizontally in each half */
  padding: 20px; /* Padding around content */
}

.contact-details h1{
    margin-bottom: 25px;
}

.map-container {
  max-width: 600px; /* Constraint to match the iframe width */
  height: 450px; /* Height to match iframe */
}

.contact-form {
  width: 700px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0px 0px 8px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 30px;
}

.contact-form h2 {
  font-size: 24px; /* Larger font size for the heading */
  font-weight: bold; /* Makes the heading bold */
  color: #333; /* Dark grey color for better visibility */
  margin-bottom: 20px; /* Space below the heading */
}

.form-group {
  margin-bottom: 20px; /* Increased space between form groups */
  text-align: left; /* Aligns labels and text to the left */
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%; /* Ensures input takes full width of the form */
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px; /* Space above the button */
}

</style>
