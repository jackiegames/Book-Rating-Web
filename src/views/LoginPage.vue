<script setup>

</script>

<template>
    <header>
    </header>
    <main>
        <img src=""> <!--Logo-->
        <hr>
        <div id="login" class="align-items-center justify-content-center d-flex flex-column min-vh-100"> <!--mt-5, for the outside margin-->
            <div> 
                <h1>Welcome back.</h1>

                <p>Sign in to see your old reads!</p>
                <p>For book worms and authors alike.</p>
                
                <form>
                    <div class="mb-3">

                        <label for="email" class="form-label">Email:</label>
                        <input type="email" id="email" name="email" class="form-control">

                    </div>
                    
                    <div class="mb-3">

                        <label for="pass" class="form-label">Password:</label>
                        <input type="password" id="pass" name="pass" class="form-control">

                    </div>
                    <div class="align-items-center justify-content-center d-flex flex-column">

                        <RouterLink to="/Dashboard" class="btn btn-primary">Log In</RouterLink> <!--Temporary button-->
                        <!--<button type="button" class="btn btn-primary">Log In</button> -->
                        <br>
                        
                        <a href="#" class="link-secondary">Forgot Password?</a>
                        <a href="#" class="link-primary">Create Account</a>

                    </div>
                </form>
            </div>
        </div>
        <hr>
    </main>
</template>

<style scoped>
</style>