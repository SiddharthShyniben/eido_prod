<script>
  import {
    FluidForm,
    TextInput,
    PasswordInput,
    Button,
    Loading,
    Column,
  } from "carbon-components-svelte";
  import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
  import { auth } from "../../firebase";
  import { user } from "../../stores";

  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";

  let loading = true;

  let username, email, password;

  let email_invalid = false;
  let username_invalid = false;
  let password_invalid = false;

  $: email_invalid = email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email);
  $: username_invalid = username && username.length < 3;
  $: password_invalid = password && password.length < 8;

  user.subscribe((u) => {
    if (u && browser) goto("/home");
    loading = false;
  });

  async function submit() {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user.user, { displayName: username });
      await goto("/home");
    } catch (error) {
      alert(`Error creating user: ${error.message}`);
      console.error(error);
    }
  }
</script>

<svelte:head>
  <title>Sign up for Eido</title>
</svelte:head>

<Grid>
  <Row>
    <Column>
      {#if loading}
        <Loading />
      {/if}

      <h1>Sign up</h1>
      <FluidForm on:submit={submit}>
        <TextInput
          labelText="Username"
          placeholder="nix_on_the_gods"
          required
          bind:value={username}
          invalid={username_invalid}
          invalidText="Your username must be at least 3 characters long"
        />
        <TextInput
          labelText="Email"
          placeholder="nix@the_gods.com"
          required
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
        <Button disabled={!(email && password)} type="submit">Sign up</Button>
      </FluidForm>

      <br /><br />
      <p><small><a href="/login">Already have an account? Log in</a></small></p>
    </Column>
  </Row>
</Grid>
