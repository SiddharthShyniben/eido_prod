<style>
    @import "carbon-components-svelte/css/all.css";

    h1 {
        margin-bottom: var(--cds-spacing-04);
    }

    p {
        margin-bottom: var(--cds-spacing-05);
    }
</style>
<script>
    import {
        Header,
        // HeaderNav,
        // HeaderNavItem,
        // HeaderNavMenu,
        SkipToContent,
        Content,
        Grid,
        Row,
        Column,
        Button,
        Theme
    } from "carbon-components-svelte";
</script>

<Theme theme="g100" />

<Header platformName="Eido">
    <svelte:fragment slot="skip-to-content">
        <SkipToContent />
    </svelte:fragment>
    <!--
        <HeaderNav>
        <HeaderNavItem href="/" text="Link 1" />
        <HeaderNavItem href="/" text="Link 2" />
        <HeaderNavItem href="/" text="Link 3" />
        <HeaderNavMenu text="Menu">
        <HeaderNavItem href="/" text="Link 1" />
        <HeaderNavItem href="/" text="Link 2" />
        <HeaderNavItem href="/" text="Link 3" />
        </HeaderNavMenu>
        </HeaderNav>
    -->
</Header>

<Content>
    <Grid>
        <Row>
            <Column>
                <h1>Tutorials that <em>work</em></h1>
                <p><strong>Say goodbye to long tutorial videos and boring text
                    tutorials.</strong><br>Eido is a dynamic approch to tutorials which will make tutorials easy to understand and fun.</p>
                <Button href="/sign-up">Start now</Button>
            </Column>
        </Row>
    </Grid>
</Content>
