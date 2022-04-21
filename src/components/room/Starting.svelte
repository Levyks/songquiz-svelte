<script lang="ts">
    import { onDestroy } from 'svelte';
    import { _ } from 'svelte-i18n';

    import CircularProgress from '@smui/circular-progress';
    import Card from '@smui/card';

    import { room } from '@/stores';

    const step = 100;
    const totalTime = $room.nextRoundStartsIn! * (1000 / step);

    let remainingTime = totalTime;

    let loading = false;
    let interval = setInterval(() => {
        if(remainingTime > 0) {
            remainingTime -= 1;
        } else {
            clearInterval(interval);
            loading = true;
        }
    }, step);

    onDestroy(() => {
        if(interval) clearInterval(interval);
    });

</script>

<Card variant="outlined" class="h-100 p-3 overflow-hidden d-flex flex-column justify-content-center">
    <div class="text-center">
        <h4 class="text-center m-4">{ $_('room.starting') }</h4>
        <CircularProgress 
            style="height: 64px; width: 64px;" 
            indeterminate={loading}
            progress={(totalTime - remainingTime) / totalTime}
        />
        <h3 class="text-center m-4">{Math.ceil(remainingTime/(1000 / step)) || 'Starting'}</h3>
    </div>
</Card>

<audio src="/assets/audio/countdown.mp3" volume={0.5} autoplay/>