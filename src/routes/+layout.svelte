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
        // HeaderNav,
        // HeaderNavItem,
        // HeaderNavMenu,
        SkipToContent,
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
<slot />
