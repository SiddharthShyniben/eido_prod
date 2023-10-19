
<script>
    import {user} from "../../stores";
    import {listRef} from "../../firebase";

    import {Loading, ClickableTile, Accordion, AccordionItem} from "carbon-components-svelte";
    import {listAll} from "firebase/storage";

    let loading = true;
    let currentUser;
    let tuts = [];
    let cat = {};

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
            category: t.name.split('---')[1].split('-')[1].slice(0, -3),
            fullPath: t.fullPath,
            routerLink: t.name.slice(0, -3)
        }))

        tuts.forEach(t => {
            cat[t.category] ??= []
            cat[t.category].push(t)
        })
    }
</script>

{#if loading}
    <Loading />
{:else}
    <h1><strong>Hi, {currentUser.displayName}</strong></h1>
    <p>Explore our tutorials:</p><br><br>

    {#if Object.keys(cat).length > 0}
        <Accordion align="start">
            {#each Object.entries(cat) as [category, tuts]}
                <AccordionItem title={category}>
                    {#each tuts as tut}
                        <ClickableTile href="/tutorials/{tut.routerLink}">
                            <strong>{tut.title}</strong>
                        </ClickableTile>
                    {/each}
                </AccordionItem>
            {/each}
        </Accordion>
    {:else}
        <Loading />
    {/if}
{/if}
