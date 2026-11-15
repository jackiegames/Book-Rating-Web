<script setup>
    
</script>

<template>
    <header>
        <div class="login-logo">
            <img src="/src/assets/book-logo.svg" class="book-logo" alt="Book logo">
            <h2>On the Shelf</h2>
        </div>
    </header>
<hr>
    <main>

        <div id="login">
            <div class="login-card">

                <h1>Welcome back.</h1>

                <p class="subtitle">Sign in to see your old reads!</p>
                <p class="description">For book worms and authors alike.</p>

                <form>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            class="form-control"
                            placeholder="Enter your email"
                        >
                    </div>

                    <div class="mb-3">
                        <label for="pass" class="form-label">Password:</label>
                        <input
                            type="password"
                            id="pass"
                            name="pass"
                            class="form-control"
                            placeholder="Enter your password"
                        >
                    </div>

                    <div class="login-actions">

                        <RouterLink to="/Dashboard" class="login-btn">
                            Log In
                        </RouterLink>

                        <a href="#" class="forgot-link">
                            Forgot Password?
                        </a>

                        <p class="create-text">
                            No Account?
                            <RouterLink to="/CreateAccount" class="create-link">
                                Create Account
                            </RouterLink>
                        </p>

                    </div>
                </form>
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

    .login-logo {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .login-logo img {
        width: 50px;
        height: 50px;
        object-fit: contain;
    }

    .login-logo h2 {
        color: var(--header-color);
        margin: 0;
        font-size: 24px;
    }

    #login {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 60vh;
        padding: 30px;
    }

    .login-card {
        background-color: var(--card-color);
        width: 70%;
        max-width: 430px;
        padding: 40px;
        border-radius: 16px;
        box-shadow: 0px 1px 5px rgb(121, 121, 130);
    }

    .login-card h1 {
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
        color: #49392F;
    }

    .form-control:focus {
        background-color: #FFFFFF;
        border-color: var(--header-color);
        box-shadow: 0 0 0 2px rgb(121, 121, 130);
    }

    .form-control::placeholder {
        color: var(--text-color);
    }


    .login-actions {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        gap: 10px;
    }

    .login-btn {
        background-color: var(--button-color);
        color: var(--card-color);
        text-decoration: none;
        padding: 12px;
        border-radius: 20px;
        font-weight: 600;
        text-align: center;
        width: 100%;
    }

    .login-btn:hover {
        transition: 0.5s ease;
        background-color: var(--button-color-ease);
        color: #FFFFFF;
    }


    .forgot-link {
        color: var(--button-color);
        text-decoration: none;
        font-size: 14px;
    }

    .forgot-link:hover {
        color: var(--header-color);
        text-decoration: underline;
    }

    .create-text {
        color: var(--header-color);
        font-size: 14px;
        margin: 0;
        text-align: center;
    }

    .create-link {
        color: var(--button-color);
        font-weight: 600;
        text-decoration: none;
    }

    .create-link:hover {
        color: var(--header-color);
        text-decoration: underline;
    }


    @media (max-width: 480px) {
        .login-card {
            padding: 25px;
        }

        .login-card h1 {
            font-size: 27px;
        }
    }   

</style>
