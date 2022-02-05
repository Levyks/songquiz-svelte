<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Card from '@smui/card';
    import Fab from '@smui/fab';
</script>

<div class="d-flex align-items-center justify-content-between">
    <span>Playlist:</span>
    <div class="d-flex flex-wrap justify-content-center align-items-center">
        <Fab href="#" class="mx-3 my-1" extended>
            <span class="me-2">
                Top 50 Brasil
            </span>
            <img src="/assets/img/logos/spotify-full.png" alt="Spotify logo" class="logo"/>
        </Fab>   
        <Button class="my-1">
            <Label>Manage Playlist</Label>
        </Button>
    </div>
</div>

<style lang="scss">
    .logo {
        height: 24px;
    }
</style>