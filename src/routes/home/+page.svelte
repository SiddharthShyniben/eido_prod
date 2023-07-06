
<script>
    import {user} from "../../stores";

    let currentUser;
    user.subscribe(u => {
        currentUser = u;
    })
</script>

{JSON.stringify(currentUser)}
