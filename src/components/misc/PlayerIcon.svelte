<script lang="ts">
    import { getTextColor, getHtmlColor } from '@/helpers';
    import type { Player } from '@/typings/state';

    export let player: Player

    export let size: number;
    export let style: string = '';

</script>

<div 
    style={`
        background-color: ${getHtmlColor(player.color)}; 
        color: ${getHtmlColor(getTextColor(player.color))};
        width: ${size}px;
        height: ${size}px;
        line-height: ${size}px;
        font-size: ${size / 2}px;
        ${style}
    `}    
>
    <span>{player.nickname.substring(0, 1)}</span>
</div>

<style lang="scss">

    div {
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