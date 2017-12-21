<template>
  <!--HTML goes in here-->
  <div id="page">
    <div id="wrapper">
      <main class="landing">
        <img id="logo" src="~@/assets/logo.svg" alt="reflectos">
      </main>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { UR } from '#/UR/Component'
  import { MC } from '@drartemi/mc.js' // ToDo : Import MCJS properly (actually MC is undefined)
  // import { UR } from 'reflectos-sdk'
  import Component from 'vue-class-component'

  @Component({
    name: 'LandingPage',
    components: {
    }
  })
  export default class LandingPage extends UR.Component(Vue) {
    // Source code goes in here
    name: string = 'landing-page';

    mounted () : void {
      this.hello()
    }
  }
</script>

<style>
  /* CSS goes in here */
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Roboto', sans-serif; }

  #page-component {
    width: 100vw;
    height: 100vh;
    display: block;
  }

  #wrapper {
    background:
      radial-gradient(
        ellipse at center center,
        rgba(21, 21, 28, 1) 10%,
        rgba(40, 40, 51, .9) 300%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    width: 420px;
    margin: auto;
    animation-duration: 4s;
    animation-name: fade;
    animation-timing-function: ease-in;
  }

  main.landing {
    display: flex;
    justify-content: space-between;
    height: 100%;
    animation-name: pulse;
    animation-duration: 2s;
    animation-delay: 2s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    vertical-align: middle;
  }

  .loader {
    display: table;
    margin: auto auto;
    height: 50px;
  }

  .loader > h3 {
    display: table-cell;
    text-align: center;
    font-size: 23px;
    font-weight: 100;
    color: #fff;
    opacity: 0;
    animation-name: flash;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    vertical-align: middle;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    30% {
      transform: scale(1.1);
    }
    60%, 100% {
      transform: scale(1);
    }
  }

  @keyframes flash {
    0% {opacity: 0;}
    50%, 100% {opacity: 0;}
    25%, 75% {opacity: 1;}
  }

  @keyframes fade {
    0% {opacity: 0;}
    50% {opacity: 0;}
    100% {opacity: 1;}
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-30px);}
    60% {transform: translateY(-15px);}
  }

  @keyframes rubberBand {
    0% {transform: scale(1);}
    15% {transform: scaleX(1.25) scaleY(0.75);}
    20% {transform: scaleX(0.75) scaleY(1.25);}
    30% {transform: scaleX(1.15) scaleY(0.85);}
    50% {transform: scale(1);}
    100% {transform: scale(1);}
  }

  @keyframes flip {
    0% {transform: perspective(400px) translateZ(0) rotateY(0) scale(1);animation-timing-function: ease-out;}
    40% {transform: perspective(400px) translateZ(150px) rotateY(170deg) scale(1);animation-timing-function: ease-out;}
    50% {transform: perspective(400px) translateZ(150px) rotateY(190deg) scale(1);animation-timing-function: ease-in;}
    80% {transform: perspective(400px) translateZ(0) rotateY(360deg) scale(.95);animation-timing-function: ease-in;}
    100% {transform: perspective(400px) translateZ(0) rotateY(360deg) scale(1);animation-timing-function: ease-in;}
  }
</style>
