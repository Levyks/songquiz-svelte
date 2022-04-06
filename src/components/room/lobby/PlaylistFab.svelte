<script lang="ts">

    import Fab from '@smui/fab';
    import { Wrapper } from '@smui/tooltip';

    import { _ } from 'svelte-i18n';

    import PlaylistTooltip from './PlaylistTooltip.svelte';

    import { room } from '@/stores';
    import { platforms } from '@/services/playlist.service';

    import type { Platform } from '@/typings/main';

    let platform: Platform;
    $: platform = platforms[$room.playlist.type];

</script>

<Wrapper rich>
    <Fab href={ $room.playlist.url } target="_blank" class="mx-3 my-1" style="min-height:48px;height:auto;" extended>
        <span class="me-2">{ $room.playlist.name }</span>
        {#if platform}
            <img src={platform.logo} alt={$_('playlist.logoAlt', { values: { platform: platform.label } })} class="logo"/>
        {/if}
    </Fab> 
    <PlaylistTooltip playlist={$room.playlist}/>
</Wrapper>

<style lang="scss">
    .logo {
        height: 24px;
    }
</style>