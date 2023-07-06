<script>
    import {Content, Grid, Row, Column, FluidForm, TextInput, PasswordInput, Button} from "carbon-components-svelte";

    let email, password;

    let email_invalid = false;
    let password_invalid = false;

    $: email_invalid = email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email);
    $: password_invalid = password && password.length < 8;

    function submit() {
        alert(`${email}:${password}`)
    }
</script>

<svelte:head>
    <title>Log in to Eido</title>
</svelte:head>

<Content>
    <Grid>
        <Row>
            <Column>
                <h1>Log in</h1>
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
            </Column>
        </Row>
    </Grid>
</Content>
