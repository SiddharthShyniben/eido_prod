<script>
    import {Button} from "carbon-components-svelte";
    import {user} from "../stores";
    import {goto} from "$app/navigation";

    user.subscribe(u => {
        if (u) goto('/home');
    })
</script>

<svelte:head>
    <title>Eido</title>
</svelte:head>

<h1>Tutorials that <em>work</em></h1>
<p>
    <strong>Say goodbye to long tutorial videos and boring text tutorials.</strong>
    <br>Eido is a dynamic approch to tutorials which will make tutorials easy to understand and fun.
</p>
<Button href="/signup">Start now</Button>
<Button href="/login" kind="secondary">Log in</Button>
