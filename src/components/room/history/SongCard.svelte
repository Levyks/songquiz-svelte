<script lang="ts">
    import Card, { PrimaryAction } from '@smui/card';

    export let song: {
        image: string;
        name: string;
        artist: string;
    }

</script>

<Card class="m-2" variant="outlined">
    <PrimaryAction>
        <a href="/alouu" target="_blank" style="color: inherit;">
            <div class="content">
                <img src={song.image} class="cover" alt="Song's cover"/>
                <span class="name">{song.name}</span>
                <span class="artist">{song.artist}</span>
            </div>
        </a>
    </PrimaryAction>
</Card>

<style lang="scss">

    .content {
        display: grid;
        grid-gap: .5rem;
        grid-template-columns: 96px auto;
        grid-template-areas:
            "cover name"
            "cover artist";
    }

    .cover {
        width: 100%;
        height: auto;
        object-fit: cover;
        grid-area: cover;
    }

    .name {
        font-size: 1.2rem;
        align-self: end;
        grid-area: name;
    }

    .artist {
        font-size: 0.8rem;
        align-self: start;
        grid-area: artist;
    }
</style>