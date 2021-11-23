<script>
  import { onMount } from 'svelte';
  import { peer, username, friendUsername } from './store.js';

  let inCall = false;
  let video = null;

  const startCall = () => {
    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        const call = peer.call($friendUsername, stream);
        call.on('stream', remoteStream => {
          inCall = true;
          video.srcObject = remoteStream;
        });
      });
  };

  peer.on('call', call => {
    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        call.answer(stream);
        call.on('stream', remoteStream => {
          inCall = true;
          video.srcObject = remoteStream;
        });
      });
  });
</script>

<main>
  <p>Your username is: {$username || 'currently generating btw okakoro is best'}</p>

  <div>
    <input bind:value={$friendUsername} placeholder="Enter friend's username" />
    <button on:click={startCall}>
      Call the dud
    </button>
  </div>
  <video bind:this={video} autoplay />
</main>

<style>
</style>
