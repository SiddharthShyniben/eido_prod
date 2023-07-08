<script>
    import {FluidForm, TextInput, PasswordInput, Button} from "carbon-components-svelte";
    import {signInWithEmailAndPassword} from "firebase/auth";
    import {auth} from "../../firebase";
    import {goto} from '$app/navigation';

    let email, password;

    let email_invalid = false;
    let password_invalid = false;

    $: email_invalid = email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email);
    $: password_invalid = password && password.length < 8;

    async function submit() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            await goto('/home');
        } catch (error) {
            alert(`Error logging in: ${error.message}`)
            console.error(error);
        }
    }
</script>

<svelte:head>
    <title>Log in to Eido</title>
</svelte:head>

<FluidForm on:submit={submit}>
    <TextInput
        labelText="Email"
        placeholder="nix@the_gods.com" required
        bind:value={email}
        invalid={email_invalid}
        invalidText="You must provide a valid email"
    />
    <PasswordInput
        required
        type="password"
        labelText="Password"
        placeholder="••••••••••"
        bind:value={password}
        invalid={password_invalid}
        invalidText="Your password must be at least 8 characters long"
    />
    <Button disabled={!(email && password)} type="submit">Log in</Button>
</FluidForm>

<br><br>
<p><small><a href="/signup">Don't have an account? Sign up</a></small></p>
