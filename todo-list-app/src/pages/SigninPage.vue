<template>
  <div class="sign-in">
    <div class="form-container">
      <h2>Sign In</h2>
      <form @submit.prevent="handleSignIn">
        <div class="form-group">
          <label for="email">Email <span class="required">*</span></label>
          <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
          />
        </div>
        <div class="form-group">
          <label for="password">Password <span class="required">*</span></label>
          <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              required
          />
        </div>
        <div class="button-group">
          <button type="submit" class="submit-button">Sign In</button>
        </div>
      </form>
      <div class="register-link">
        <p>Don't have an account?
          <router-link to="/signup">SignUp here</router-link>
          .
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {signin} from "@/services/authService";

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleSignIn() {
      try {
        const response = await signin(this.email, this.password);
        if (response.token) {
          this.$router.push('/tasks'); // Redirect to tasks page
        } else {
          console.error('Sign-in failed: Invalid response from server.');
        }
      } catch (error) {
        console.error(`Sign-in failed: ${error.message || 'An unexpected error occurred.'}`);
      }
    },
  },
};
</script>

<style scoped>
.sign-in {
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

/* Button Group */
.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.submit-button {
  flex: 1;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #007bff;
  color: white;
}

.submit-button:hover {
  background-color: #0056b3;
}

.register-link {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #555;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
