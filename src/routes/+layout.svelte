<style>
    @import "carbon-components-svelte/css/all.css";

    :global(h1) {
        margin-bottom: var(--cds-spacing-04);
    }

    :global(p) {
        margin-bottom: var(--cds-spacing-05);
    }

    :global(.bx--form-item) {
        margin-bottom: var(--cds-spacing-05);
    }
</style>
<script>
    import {
        Header,
        HeaderNav,
        HeaderNavItem,
        SkipToContent,
        Theme,
        Content,
        Grid,
        Row,
        Column
    } from "carbon-components-svelte";
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
</script>

<Theme theme="g100" />

<Header platformName="Eido">
    <svelte:fragment slot="skip-to-content">
        <SkipToContent />
    </svelte:fragment>
    <HeaderNav>
        {#if currentUser}
            <HeaderNavItem text="Hello, {currentUser.displayName}"/>
            <HeaderNavItem href="/logout" text="Log out"/> <!-- TODO -->
        {/if}
    </HeaderNav>
</Header>
<Content>
    <Grid>
        <Row>
            <Column>
                <slot />
            </Column>
        </Row>
    </Grid>
</Content>
