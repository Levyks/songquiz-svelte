<script lang="ts">  

    import { Item, Graphic, Text} from '@smui/list';
    import { Icon } from '@smui/common';

    import { getRandomBackgroundAndTextColor } from '@/helpers';

    export let player: {
        name: string;
        score: number;
        isLeader: boolean;
    }

    const [backgroundColor, textColor] = getRandomBackgroundAndTextColor();

    console.log(backgroundColor, textColor);

</script>

<Item activated={player.isLeader}>
    <Graphic>
        <div class="avatar" style="background-color: {backgroundColor}; color: {textColor}">
            <span>{player.name.substring(0, 1)}</span>
        </div>
    </Graphic>
    <Text>{player.name}</Text>
    {#if player.isLeader}
        <Icon class="material-icons ms-1">security</Icon>
    {/if}
    <Text class="ms-auto" title="Score">
        {player.score}
    </Text>
</Item>


<style lang="scss">

    .avatar {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        font-size: 20px;
        font-weight: bold;
        color: white;
    }

</style>