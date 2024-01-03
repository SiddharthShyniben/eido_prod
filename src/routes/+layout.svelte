<style>
    @import "carbon-components-svelte/css/all.css";
    @import "carbon-components-svelte/css/g100.css";

    :global(h1) {
        margin-bottom: var(--cds-spacing-04);
    }

    :global(p) {
        margin-bottom: var(--cds-spacing-05);
    }

    :global(.bx--form-item) {
        margin-bottom: var(--cds-spacing-05);
    }

    :global(.bx--tile) {
        margin-bottom: var(--cds-spacing-05);
    }
</style>
<script>
    import {
        Header,
        HeaderAction,
        HeaderPanelLink,
        HeaderPanelLinks,
        HeaderPanelDivider,
        HeaderUtilities,
        SkipToContent,
        Content,
        Grid,
        Row,
        Column
    } from "carbon-components-svelte";
    import UserAvatarFilledAlt from "carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte";
    import {onAuthStateChanged} from "firebase/auth";
    import {onMount} from "svelte";
    import {auth} from "../firebase";
    import {user} from "../stores";

    let currentUser;

    user.subscribe(user => {
        currentUser = user;
    })

    onMount(() => {
        onAuthStateChanged(
            auth,
            u => {
                user.update(() => u)
            },
            error => {
                user.update(() => null);
                console.log(error);
            }
        )
    })

    let userSidebarOpen = false;

    async function logout() {
        await signOut(auth);
        await goto('/');
    }
</script>

<Header platformName="Eido">
    <svelte:fragment slot="skip-to-content">
        <SkipToContent />
    </svelte:fragment>
    <HeaderUtilities>
        {#if currentUser}
            <HeaderAction
                bind:isOpen={userSidebarOpen}
                icon={UserAvatarFilledAlt}
                closeIcon={UserAvatarFilledAlt}
            >
                <HeaderPanelLinks>
                    <HeaderPanelDivider>{currentUser.displayName}</HeaderPanelDivider>
                    <HeaderPanelLink on:click={logout}>Log out</HeaderPanelLink>
                </HeaderPanelLinks>
            </HeaderAction>
        {/if}
    </HeaderUtilities>
</Header>
<Content>
    <slot />
</Content>
