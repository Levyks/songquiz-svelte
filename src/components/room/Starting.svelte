<script lang="ts">
    import { onDestroy } from 'svelte';

    import CircularProgress from '@smui/circular-progress';
    import Card from '@smui/card';

    import { room } from '@/stores';
    import { playAudio } from '@/helpers';  

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

    const audio = playAudio('/assets/audio/countdown.mp3', 0.5);

    onDestroy(() => {
        if(interval) clearInterval(interval);
        if(!audio.ended) audio.pause();
    });

</script>

<Card variant="outlined" class="h-100 p-3 overflow-hidden d-flex flex-column justify-content-center">
    <div class="text-center">
        <h4 class="text-center m-4">The game is about to start</h4>
        <CircularProgress 
            style="height: 64px; width: 64px;" 
            indeterminate={loading}
            progress={(totalTime - remainingTime) / totalTime}
        />
        <h3 class="text-center m-4">{Math.ceil(remainingTime/(1000 / step)) || 'Starting'}</h3>
    </div>
</Card>