<script setup>
    import { ref } from "vue";
    import axios from "axios";
    import { useRouter } from 'vue-router';

    const username = ref("");
    const email = ref("");
    const password = ref("");

    const message = ref("");
    const error = ref("");

    const registerUser = async () =>{
        message.value = "";
        error.value = "";

        try{
            const response = await axios.post("http://localhost:4000/api/v1/users/register",
            {
                username: username.value,
                email: email.value,
                password: password.value
            });


            message.value = response.data.message;

            username.value = "";
            email.value = "";
            password.value = "";

        } catch (error){
            error.value = error.response?.data?.message || "Something went wrong with your registration";
            throw error;
        }
    }
    const router = useRouter();
    const submitUser = async () =>{
        try{
            await registerUser();
            router.push('/Dashboard');
        } catch (error){
            console.error('Account creation failed:', error);
        }
    }

</script>

<template>
    <header>
        <div class="logo">
            <img src="/src/assets/book-logo.svg" class="logo" alt="Book logo">
            <h2>On the Shelf</h2>
        </div>
    </header>
    <hr>
    <main>
        <div id="account">
            <div class="account-card">
                <div> 
                    <h1>Create Account Now</h1>

                    <p class="subtitle">Make an account to keep track of all your reads.</p>
                    <p class="description">For book worms and authors alike.</p>
                    
                    <form @submit.prevent="submitUser">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username:</label>
                            <input 
                                class="form-control"
                                v-model="username" 
                                minLength="1" 
                                maxLength="20" 
                                type="text" 
                                placeholder="Enter your username" 
                                required 
                            />
                        </div>
                        <div class="mb-3">

                            <label for="email" class="form-label">Email:</label>
                            <input v-model="email" required type="email" id="email" name="email" class="form-control" placeholder="Enter your email">

                        </div>
                        
                        <div class="mb-3">

                            <label for="pass" class="form-label">Password:</label>
                            <input v-model="password" required type="password" minLength="6" maxLength="50" id="pass" name="pass" class="form-control" placeholder="Enter your password">

                        </div>
                        <div class="account-actions">
                            <button type ="submit" class="account-btn"> Register</button>
                            
                            <br>
                            <p v-if="message" class=success> {{ message }} </p>
                            <p v-if="error" class=error> {{ error }} </p>
                            <p class="login-text">
                            Have an account already?
                            <RouterLink to="/" class="login-link">
                                Log In
                            </RouterLink>
                        </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <hr>
    </main>
</template>

<style scoped>
    main {
        background-color: #F5F0E6;
        min-height: 100vh;
    }

    header {
        padding: 5px;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .logo img {
        width: 50px;
        height: 50px;
        object-fit: contain;
    }

    .logo h2 {
        color: var(--header-color);
        margin: 0;
        font-size: 24px;
    }

    #account {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
        padding: 30px;
    }

    .account-card {
        background-color: var(--card-color);
        width: 70%;
        max-width: 430px;
        padding: 40px;
        border-radius: 16px;
        box-shadow: 0px 1px 5px rgb(121, 121, 130);
    }

    .account-card h1 {
        color: var(--header-color);
        font-size: 30px;
        margin-bottom: 10px;
    }

    .subtitle {
        color: var(--button-color);
        font-size: 18px;
        margin-bottom: 5px;
    }

    .description {
        color: var(--text-color);
        font-size: 14px;
        margin-bottom: 25px;
    }


    .form-label {
        color: var(--header-color);
        font-weight: 500;
    }


    .form-control {
        background-color: var(--background-color);
        border-radius: 8px;
        padding: 12px;
        color: var(--text-color);
        width:100%;
        box-sizing: border-box;
    }

    .form-control:focus {
        background-color: #FFFFFF;
        border-color: var(--header-color);
        box-shadow: 0 0 0 2px rgb(121, 121, 130);
    }

    .form-control::placeholder {
        color: var(--text-color);
    }


    .account-actions {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    .account-btn {
        background-color: var(--button-color);
        color: var(--card-color);
        text-decoration: none;
        padding: 12px;
        border-radius: 20px;
        font-weight: 600;
        text-align: center;
        width: 100%;
        border:0px;
    }

    .account-btn:hover {
        transition: 0.5s ease;
        background-color: var(--button-color-ease);
        color: #FFFFFF;
    }

    .login-text {
        color: var(--header-color);
        font-size: 14px;
        margin: 0;
        text-align: center;
    }

    .login-link {
        color: var(--button-color);
        font-weight: 600;
        text-decoration: none;
    }

    .login-link:hover {
        color: var(--header-color);
        text-decoration: underline;
    }


    @media (max-width: 480px) {
        .account-card {
            padding: 25px;
        }

        .account-card h1 {
            font-size: 27px;
        }
    }
</style>