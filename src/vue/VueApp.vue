<template>
  <div :class="$style.app">
    <h1>CSS Modules Vue & Webpack Demo</h1>

    <hr :class="$style.hr"/>

    <h2>Scoped Selectors</h2>
    <p>In CSS Modules, selectors are scoped by default.</p>
    <p>The following component uses two classes, <strong>.root</strong> and <strong>.text</strong>, both of which would typically be too vague in a larger project.</p>
    <p>CSS Module semantics ensure that these <strong>classes are locally scoped</strong> to the component and don't collide with other classes in the global scope.</p>
    <scoped-selectors />

    <p>The style import from ScopedSelectors.vue instant:</p>

    <div :class="$style.styletext">
      <strong>Locals in another new component:</strong><br/>
      {{ "" + JSON.stringify(instantStyle.$style, null, 4) }}
    </div>
<!--
    <div :class="$style.styletext">
      {{ JSON.stringify(importStyle, null, 4) }}
    </div>
-->

  </div>
</template>

<script>
  import Vue from 'vue';
  import ScopedSelectors from "./1-ScopedSelectors/ScopedSelectors.vue";
//  import ScopedRoot from "./1-ScopedSelectors/ScopedRoot.vue";
//  import scopedStyle from "./1-ScopedSelectors/ScopedSelectors.vue";
//  var Component = require("./1-ScopedSelectors/ScopedSelectors.vue");


  var VueApp = {
    name: "VueApp",
    data: function () {
      var scopedComponent = Vue.component("AnotherScoped", ScopedSelectors);
      var scopedInstant = new scopedComponent();
      console.log('scopedInstant=', scopedInstant)
      return {
        instantStyle: scopedInstant
      }
    }

/*
      importStyle: () => {
        console.log('scopedStyle= ', scopedStyle)
        return scopedStyle;
      }
*/
  }

  module.exports = VueApp
</script>

<style module>
  .app {
    text-size-adjust: none;
    font-family: helvetica, arial, sans-serif;
    line-height: 200%;
    padding: 6px 20px 30px;
    /*background: burlywood;*/
  }

  .hr {
    margin: 40px 0;
    height: 1px;
    border: 0;
    background: #ccc;
  }

  .styletext {
    margin: 30px 0;
    background: #cccccc;
  }
</style>
