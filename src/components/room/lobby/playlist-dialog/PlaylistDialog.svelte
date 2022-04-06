<script lang="ts">

  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label as ButtonLabel } from '@smui/button';
  import Tab, { Label as TabLabel } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import PlaylistInfo from './PlaylistInfo.svelte';

  import UrlTab from './UrlTab.svelte';
  import LoginWithSpotify from './LoginWithSpotify.svelte';

  export let open: boolean;
  
  let activeTab: string = 'URL';

  const tabs = {
    'URL': UrlTab,
    'Login With Spotify': LoginWithSpotify
  }

</script>

<Dialog 
  bind:open
  surface$style="width: 720px; max-width: calc(100vw - 32px);"
>
  <Title>Manage Playlist</Title>
  <Content>

    <PlaylistInfo/>

    <TabBar tabs={Object.keys(tabs)} let:tab bind:active={activeTab}>
      <Tab {tab}>
        <TabLabel>{tab}</TabLabel>
      </Tab>
    </TabBar>

    <svelte:component this={tabs[activeTab]}/>

  </Content>
  <Actions>
    <Button on:click={() => open = false}>
      <ButtonLabel>Close</ButtonLabel>
    </Button>
  </Actions>
</Dialog>