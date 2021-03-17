<template>
    <div class="music-player">
    <audio
      ref="audio"
      src="../assets/audio/epicaudio.mp3"
      type="audio/mp3"
      preload
      loop
      muted
      id="audio"
    ></audio>
    <div @click="toggleSound()" class="toggle-sound paused">
        <b-icon class="corner" icon="play-fill" font-scale="1" />
        </div>
    </div>
</template>

<script>
export default {
    methods: {
    toggleSound() {
        let audio = this.$refs.audio;
        if (audio.paused && document.querySelector(".toggle-sound").classList.contains("paused")) {
          audio.play();
          document.querySelector(".toggle-sound").classList.remove("paused");
        } else {
          audio.pause();
          document.querySelector(".toggle-sound").classList.add("paused");
        }
      }
    }, 
}
</script>

<style>
    .toggle-sound {
        position: absolute;
        padding: 5px;
        top: 0;
        right: 0;
        color: var(--mdark);
    }

    .toggle-sound:hover {
        color: var(--mid-dark);
    }
</style>