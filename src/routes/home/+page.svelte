
<script>
    import {user} from "../../stores";
    import {Loading, ClickableTile} from "carbon-components-svelte";

    let loading = true;

    let currentUser;
    user.subscribe(u => {
        if (u) {
            currentUser = u;
            loading = false;
        }
    })
</script>

{#if loading}
    <Loading />
{:else}
    <h1><strong>Hi, {currentUser.displayName}</strong></h1>
    <p>Explore our tutorials:</p>

    <ClickableTile href="https://www.carbondesignsystem.com/">
        Carbon Design System
    </ClickableTile>
    <ClickableTile href="https://www.carbondesignsystem.com/">
        Carbon Design System
    </ClickableTile>
    <ClickableTile href="https://www.carbondesignsystem.com/">
        Carbon Design System
    </ClickableTile>
{/if}
