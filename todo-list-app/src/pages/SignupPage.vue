<template>
  <div class="sign-up">
    <div class="form-container">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignUp">
        <div class="form-group" :class="{ 'has-error': errors.first_name }">
          <label for="first_name">First Name <span class="required">*</span></label>
          <input
              id="first_name"
              v-model="first_name"
              type="text"
              placeholder="Enter your first name"
              required
          />
          <p v-if="errors.first_name" class="error-message">{{ errors.first_name }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error': errors.last_name }">
          <label for="last_name">Last Name <span class="required">*</span></label>
          <input
              id="last_name"
              v-model="last_name"
              type="text"
              placeholder="Enter your last name"
              required
          />
          <p v-if="errors.last_name" class="error-message">{{ errors.last_name }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error': errors.email }">
          <label for="email">Email <span class="required">*</span></label>
          <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
          />
          <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error': errors.password }">
          <label for="password">Password <span class="required">*</span></label>
          <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              required
          />
          <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error': errors.confirmPassword }">
          <label for="confirm_password">Confirm Password <span class="required">*</span></label>
          <input
              id="confirm_password"
              v-model="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              required
          />
          <p v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</p>
        </div>
        <div class="button-group">
          <button type="submit" class="submit-button">Sign Up</button>
          <button type="button" class="reset-button" @click="resetForm">Reset</button>
        </div>
      </form>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p class="sign-in-link">
        Already have an account?
        <router-link to="/signin">Sign in here</router-link>
        .
      </p>
    </div>
  </div>
</template>


<script>
import {signup} from "@/services/authService";

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleSignUp() {
      this.successMessage = "";
      this.errorMessage = "";
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match!";
        return;
      }
      try {
        await signup(this.email, this.password, this.first_name, this.last_name);
        this.successMessage = "Sign-up successful! Redirecting to sign-in page...";
        setTimeout(() => {
          this.$router.push("/signin"); // Redirect to sign-in after success
        }, 2000); // Delay for user to see success message
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      }
    },
    resetForm() {
      this.first_name = "";
      this.last_name = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.successMessage = "";
      this.errorMessage = "";
      this.errors = {};
    },
  },
};
</script>

<style scoped>
.sign-up {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6f9;
  font-family: 'Poppins', sans-serif;
}

.form-container {
  background: #fff;
  padding: 30px 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group.has-error input {
  border-color: #dc3545;
}

.required {
  color: #dc3545;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.submit-button,
.reset-button {
  flex: 1;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button {
  background-color: #007bff;
  color: white;
}

.submit-button:hover {
  background-color: #0056b3;
}

.reset-button {
  background-color: #ff4d4d;
  color: white;
}

.reset-button:hover {
  background-color: #cc0000;
}

.success-message,
.error-message {
  margin-top: 15px;
  font-size: 0.9rem;
}

.success-message {
  color: #28a745;
}

.error-message {
  color: #dc3545;
}

.sign-in-link {
  margin-top: 15px;
  font-size: 0.9rem;
  color: #555;
}

.sign-in-link a {
  color: #007bff;
  text-decoration: none;
}

.sign-in-link a:hover {
  text-decoration: underline;
}
</style>
