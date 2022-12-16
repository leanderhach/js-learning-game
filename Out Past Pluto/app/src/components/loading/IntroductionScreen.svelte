<div id="introduction-screen">
    <GameLogo animated={true}></GameLogo>
    <div class="entrance-prompt">
        {#if screenState === 0}
                <DefaultButton text={"Register"} on:click={() => setScreenRegister()}></DefaultButton>
                <DefaultButton text={"Login"} on:click={() => setScreenLogin()}></DefaultButton>
                <DefaultButton text={"Play As Guest"} style="textunderlined" on:click={() => startGameAsGuest()}></DefaultButton>
            {:else if screenState === 1 || screenState === 2}
                <FormGroup label={"Email"} id={"email"} bind:value={email}></FormGroup>
                <FormGroup label={"Password"} id={"password"} type="password" bind:value={password} formError={formError}></FormGroup>

                {#if screenState === 1}
                    <div class="button-group">
                        <DefaultButton text={"Back"} on:click={() => setScreenDefault()} disabled={isLoading}></DefaultButton>
                        <DefaultButton text={"Register"} on:click={() => register()} isLoading={isLoading} disabled={!emailValid || !passwordValid}></DefaultButton>
                    </div>
                {:else if screenState === 2}
                    <div class="button-group">
                        <DefaultButton text={"Back"} on:click={() => setScreenDefault()} disabled={isLoading}></DefaultButton>
                        <DefaultButton text={"Login"} on:click={() => login()} isLoading={isLoading} disabled={!emailValid || !passwordValid}></DefaultButton>
                    </div>
                {/if}
        {/if}
    </div>
</div>

<script lang="ts">
    import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import DefaultButton from "../generics/DefaultButton.svelte";
	import FormGroup from "../generics/FormGroup.svelte";
	import GameLogo from "../generics/GameLogo.svelte";
	import type { FormError } from "../../types/forms";
	import { gameState, userStore } from "../../store";
	import { createPopupNotification } from "../../utils/notification";
	import { app } from "../../utils/firebase";

    let email: string;
    let password: string;

    let emailValid = false;
    let passwordValid = false;

    let isLoading = false;
    let formError: FormError | null;
    let screenState = 0;

    $: email, checkEmail();
    $: password, checkPassword();

    function checkEmail() {
        console.log(email)
        if(email && email.length > 2 && email.includes("@")) {
            emailValid = true;
        } else {
            emailValid = false;
        }
    }

    function checkPassword() {
        if(password && password.length >= 6) {
            passwordValid = true;
        } else {
            passwordValid = false;
        }
    }

    function setScreenRegister() {
        screenState = 1;
    }

    function setScreenLogin() {
        screenState = 2;
    }

    function setScreenDefault() {
        screenState = 0;
        email = "";
        password = "";
        formError = null;
    }

    function startGameAsGuest() {
        createPopupNotification({
            title: "Are You Sure",
            message: "You won't be able to save games or join multiplayer sessions",
            buttons: [
                {
                    text: "Back",
                    action: "close"
                },
                {
                    text: "Continue",
                    action: startGame,
                }
            ]
        })

    }

    async function register() {
        isLoading = true;

        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            isLoading = false;
            // Signed in
            const user = userCredential.user;
            userStore.set(user);
            startGame();
        })
        .catch((error) => {
            isLoading = false;
            formError = {
                hasError: true,
                errorText: error.message
            }
        });
    }

    async function login() {
        isLoading = true;
        const auth = getAuth(app);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                isLoading = false;
                // Signed in 
                const user = userCredential.user;
                userStore.set(user);
                startGame();
            })
            .catch((error) => {
                isLoading = false;
                formError = {
                    hasError: true,
                    errorText: error.message
                }
        });
    }

    async function startGame() {
        console.log("starting game")
        gameState.set(1);
    }

</script>


<style lang="scss">
    #introduction-screen {
        position: absolute;
        height: 100%;
        width:100%;
        background-color: #000000;
        top: 0;
        left: 0;
        font-family: 'Inter', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .entrance-prompt {
        margin-top: 5em;
        display: flex;
        flex-direction: column;
        opacity: 0;
        animation: 0s 0s loadingScreenOpacity forwards;

        > .button:nth-child(1) {
            margin-top: 2em;
        }
    }

    @keyframes loadingScreenOpacity {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>