<script lang="ts">  
    import { Icon } from '@smui/common';

    import PlayerIcon from '@/components/misc/PlayerIcon.svelte';
    import type { Player } from '@/typings/room';
    import { room, isLeader as isPlayerLeader } from '@/stores';
    import PlayerLeaderMenu from './PlayerLeaderMenu.svelte';

    export let player: Player;

    let isLeader: boolean;
    $: isLeader = player.nickname === $room.leader

</script>

<div class="item d-flex align-items-center" class:leader={isLeader}>

    <PlayerIcon {player} size={40}/>

    <span class="ms-2">{player.nickname}</span>

    {#if isLeader}
        <Icon class="material-icons ms-1">security</Icon>
    {/if}

    <span class="ms-auto" title="Score">
        {player.score} pt.
    </span>

    {#if $isPlayerLeader}
        <PlayerLeaderMenu {player}/>
    {/if}

</div>


<style lang="scss">

    .item {
        margin: 8px 0;
    }

    .leader {
        color: var(--mdc-theme-primary);
        font-weight: bold;
    }

</style>