<div id="introduction-screen">
    <GameLogo animated={true}></GameLogo>
    <div class="entrance-prompt">
        {#if screenState === 0}
                <DefaultButton text={"Register"} onclick={setScreenRegister}></DefaultButton>
                <DefaultButton text={"Login"} onclick={setScreenLogin}></DefaultButton>
                <DefaultButton text={"Play As Guest"} style="textunderlined" onclick={startGameAsGuest}></DefaultButton>
            {:else if screenState === 1 || screenState === 2}
                <FormGroup label={"Email"} id={"email"} bind:value={email}></FormGroup>
                <FormGroup label={"Password"} id={"password"} bind:value={password}></FormGroup>

                {#if screenState === 1}
                    <div class="button-group">
                        <DefaultButton text={"Back"} onclick={setScreenDefault} disabled={isLoading}></DefaultButton>
                        <DefaultButton text={"Register"} onclick={register} isLoading={isLoading} disabled={!emailValid || !passwordValid}></DefaultButton>
                    </div>
                {:else if screenState === 2}
                    <div class="button-group">
                        <DefaultButton text={"Back"} onclick={setScreenDefault} disabled={isLoading}></DefaultButton>
                        <DefaultButton text={"Login"} onclick={login} isLoading={isLoading} disabled={!emailValid || !passwordValid}></DefaultButton>
                    </div>
                {/if}
        {/if}
    </div>
</div>

<script lang="ts">
	import { firestore } from "../../utils/firebase";
    import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { doc, getDoc, setDoc } from "firebase/firestore"; 
    import DefaultButton from "../generics/DefaultButton.svelte";
	import FormGroup from "../generics/FormGroup.svelte";
	import GameLogo from "../generics/GameLogo.svelte";
	import type { FormError } from "../../types/forms";
	import { gameState } from "../../store";
	import { createPopupNotification, createPushNotification } from "../../utils/notification";

    let email: string;
    let password: string;

    let emailValid = false;
    let passwordValid = false;

    let isLoading = false;
    let formError: FormError;
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
        email = "";
        password = "";
    }

    function setScreenLogin() {
        screenState = 2;
        email = "";
        password = "";
    }

    function setScreenDefault() {
        screenState = 0;
        email = "";
        password = "";
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

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            isLoading = false;
            // Signed in
            const user = userCredential.user;
            startGame();
        })
        .catch((error) => {
            isLoading = false;
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    async function login() {
        isLoading = true;
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                isLoading = false;
                // Signed in 
                const user = userCredential.user;
                startGame();
            })
            .catch((error) => {
                isLoading = false;
                const errorCode = error.code;
                const errorMessage = error.message;
        });
    }

    async function startGame() {
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
        // opacity: 0;
        // animation: 3s 5s loadingScreenOpacity forwards;
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