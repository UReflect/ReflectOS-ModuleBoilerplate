<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <router-view class="ur-global-view"></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({name: 'ReflectOS'})
  export default class ReflectOS extends Vue {
    name:string = 'reflect-os'
    transitionName:string = 'slide-up'

    mounted () {
    }
  }
</script>

<style>

  body {
    background-color: rgb(21, 21, 28);
    overflow: hidden !important;
  }
  /* CSS */
  .ur-global-view {
    position: absolute;
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }

  .slide-up-enter {
    transform: translate(0, 100%);
    opacity: 0;
  }

  .slide-up-leave-active {
    opacity: 0;
  }

</style>
