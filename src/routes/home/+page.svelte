
<script>
    import {
        Content,
        Grid,
        Row,
        Column
    } from "carbon-components-svelte";

    import {user} from "../../stores";

    let currentUser;
    user.subscribe(u => {
        currentUser = u;
    })
</script>

<Content>
    <Grid>
        <Row>
            <Column>
                {JSON.stringify(currentUser)}
            </Column>
        </Row>
    </Grid>
</Content>
