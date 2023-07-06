<script>
    import {
        Content,
        Grid,
        Row,
        Column,
        Button   
    } from "carbon-components-svelte";
</script>

<svelte:head>
    <title>Eido</title>
</svelte:head>

<Content>
    <Grid>
        <Row>
            <Column>
                <h1>Tutorials that <em>work</em></h1>
                <p><strong>Say goodbye to long tutorial videos and boring text
                    tutorials.</strong><br>Eido is a dynamic approch to tutorials which will make tutorials easy to understand and fun.</p>
                <Button href="/signup">Start now</Button>
                <Button href="/login" kind="secondary">Log in</Button>
            </Column>
        </Row>
    </Grid>
</Content>
