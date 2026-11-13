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
    </header>
    <main>
        <img src=""> <!--Logo-->
        <hr>
        <div id="login" class="align-items-center justify-content-center d-flex flex-column min-vh-100"> <!--mt-5, for the outside margin-->
            <div> 
                <h1>Create Account Now</h1>

                <p>Make an account to keep track of all your reads.</p>
                <p>For book worms and authors alike.</p>
                
                <form @submit.prevent="submitUser">

                    <input v-model="username" minLength="1" maxLength="20" type="text" placeholder="username" required />
                    <div class="mb-3">

                        <label for="email" class="form-label">Email:</label>
                        <input v-model="email" required type="email" id="email" name="email" class="form-control">

                    </div>
                    
                    <div class="mb-3">

                        <label for="pass" class="form-label">Password:</label>
                        <input v-model="password" required type="password" minLength="6" maxLength="50" id="pass" name="pass" class="form-control">

                    </div>
                    <div class="align-items-center justify-content-center d-flex flex-column">
                        <button type ="submit"> Register</button>
                        <!--<RouterLink to="/Dashboard" class="btn btn-primary">Sign Up</RouterLink> Temporary button-->
                        <!--<button type="button" class="btn btn-primary">Log In</button> -->
                        <br>
                        <p v-if="message" class=success> {{ message }} </p>
                        <p v-if="error" class=error> {{ error }} </p>
                        <p>Have an account already?</p>
                        <RouterLink to="/CreateAccount" class="link-primary">Log In</RouterLink>
                        
                    </div>
                </form>
            </div>
        </div>
        <hr>
    </main>
</template>

<style scoped>
</style>