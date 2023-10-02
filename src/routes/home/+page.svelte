
<script>
    import {user} from "../../stores";
    import {listRef} from "../../firebase";

    import {Loading, ClickableTile} from "carbon-components-svelte";
    import {listAll} from "firebase/storage";

    let loading = true;
    let currentUser;
    let tuts = [];

    user.subscribe(u => {
        if (u) {
            currentUser = u;
            loading = false;
            main();
        } else {
            // if (browser) goto('/login');
        }
    });

    async function main() {
        const tutorials = await listAll(listRef);
        tuts = tutorials.items.map(t => ({
            title: t.name.split('---')[1].split('-')[0],
            fullPath: t.fullPath
        }))
    }
</script>

{#if loading}
    <Loading />
{:else}
    <h1><strong>Hi, {currentUser.displayName}</strong></h1>
    <p>Explore our tutorials:</p>

    {#if tuts.length > 0}
        {#each tuts as tut}
            <ClickableTile href="/tutorials/{tut.fullPath.slice(4, -3)}">
                <strong>{tut.title}</strong>
            </ClickableTile>
        {/each}
    {:else}
        <Loading />
    {/if}
{/if}
