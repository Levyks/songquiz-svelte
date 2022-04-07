<script lang="ts">
    import { _ } from 'svelte-i18n';

    import List, { Item, Text } from '@smui/list';
    import Menu from '@smui/menu';
    import IconButton from '@smui/icon-button';   
    
    import type { Player } from '@/typings/state';

    export let player: Player;
    
    let menuOpen: boolean = false;
    let menuClosedRecently: boolean = false;

    $: handleMenuOpenChange(menuOpen);

    function handleMenuOpenChange(_) {
        player.color;
        if (!menuOpen && !menuClosedRecently) {
            menuClosedRecently = true;
            window.requestAnimationFrame(() => {
                menuClosedRecently = false;
            });
        }
    }

    function handleOpenMenuClick() {
        if(menuClosedRecently) return;
        menuOpen = true;
    }
</script>

<div class="menu-wrapper">
    <IconButton 
        class="ms-1 material-icons"
        on:click={handleOpenMenuClick}
    >more_vert</IconButton>
    <Menu 
        bind:open={menuOpen}
        anchorCorner="BOTTOM_LEFT"
    >
        <List>
            <Item on:SMUI:action={() => {}}>
                <Text>{ $_('players.kick') }</Text>
            </Item>
            <Item on:SMUI:action={() => {}}>
                <Text>{ $_('players.makeLeader') }</Text>
            </Item>
        </List>
    </Menu>
</div>