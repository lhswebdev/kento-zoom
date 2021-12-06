<script>
  import { peer, username, friendUsername } from './store.js';

  let inCall = false;
  let video = null;

  const startCall = () => {
    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const call = peer.call($friendUsername, stream);
        call.on('stream', (remoteStream) => {
          inCall = true;
          video.srcObject = remoteStream;
        });
      });
  };

  peer.on('call', (call) => {
    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          inCall = true;
          video.srcObject = remoteStream;
        });
      });
  });
</script>

<main>
  <div id="floating">
    <p>
      Your username is:
      <input value={$username || 'currently generating btw okakoro is best'} />
    </p>
    <div>
      <input
        bind:value={$friendUsername}
        placeholder="Enter friend's username"
      />
      <button on:click={startCall}> Call the dud </button>
    </div>
  </div>
  <div id="video-container">
    {#if inCall}
      <video id="user-video" bind:this={video} autoplay />
    {:else}
      <div id="waiting-screen" class="animated">
        Waiting for call...
      </div>
    {/if}
  </div>
</main>

<style>
#user-video {
  width: 100%;
  height: 100%;
}
#waiting-screen {
  width: min(100vw, 100vh);
  height: min(100vw, 100vh);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 3rem;
  border-radius: 1rem;
}
#video-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: black;
}
#floating {
  position: fixed;
  top: 0.25rem;
  right: 0.25rem;
  z-index: 100;
  background-color: rgba(50, 50, 50, 0.9);
  border-radius: 0.5rem;
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* https://www.gradient-animator.com/ */
.animated {
  background: linear-gradient(270deg, #00f7ff, #d900ff);
  background-size: 400% 400%;

  -webkit-animation: AnimationName 30s ease infinite;
  -moz-animation: AnimationName 30s ease infinite;
  animation: AnimationName 30s ease infinite;
}

@-webkit-keyframes AnimationName {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}
@keyframes AnimationName {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}
</style>
