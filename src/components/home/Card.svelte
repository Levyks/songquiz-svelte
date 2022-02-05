<script lang="ts">

    import Card from '@smui/card';
    import Accordion, { Panel, Header, Content} from '@smui-extra/accordion';

    import JoinRoomPanel from './JoinRoomPanel.svelte';
    import CreateRoomPanel from './CreateRoomPanel.svelte';


    const url = new URL(window.location.href);

    let username: string = '';
    let roomCode: string = url.searchParams.get('join') || '';
    let roomCodeProvided: boolean = !!roomCode;

</script>

<Card padded variant="outlined">
    <div class="flex-center mb-3">
        <img src="/favicon.png" class="logo" alt="SongQuiz">
        <h2 class="title">SongQuiz</h2>
    </div>
    <Accordion class="mb-3">
        <Panel>
            <Header>Create a room</Header>
            <Content>
                <CreateRoomPanel bind:username/>
            </Content>
        </Panel>
        <Panel open={roomCodeProvided}>
            <Header>Join a room</Header>
            <Content>
                <JoinRoomPanel bind:username bind:roomCode/>
            </Content>
        </Panel>
    </Accordion>
    <div class="flex-center">
        <a href="https://levyks.com/about-me" target="_blank">About me</a>
    </div>
</Card>

<style lang="scss">
    .logo {
        height: 64px;
    }

    .title {
        margin: 20px;
    }
</style>