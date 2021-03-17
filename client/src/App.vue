<template>
  <div id="app" class="background-wallpaper">
    <router-view/>
    <Audio />
  </div>
</template>

<script>
import Audio from './components/Audio'

export default {
    components: {
      Audio
    }
}
</script>

<style>
@import './assets/styles/variables.css';
@import './assets/styles/theme-elements.css';
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

#app {
    font-family: var(--font-family);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--text-color-dark);
    overflow: hidden;
}

h1 {
  font-weight: bolder !important;
  text-transform: uppercase;
  color: var(--text-color-black);
}

.background-wallpaper {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--text-color-dark);
    background-image: url("https://wallpapercave.com/wp/wp1933949.png");
    background-size: cover;
    background-repeat: no-repeat;
}

input:focus {
  outline: none !important;
}

</style>
