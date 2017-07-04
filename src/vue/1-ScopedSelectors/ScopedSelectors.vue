<template>
  <div :class="$style.output">
    <div :class="$style.fileName">Output</div>
    <div :class="$style.root">
      <p :class="$style.text">Scoped Selectors</p>
    </div>
    <p :class="$style.text + ' ' + $style.composed">Outside class root</p>
    <div :class="$style.root">
      <p :class="$style.text + ' ' + $style.composed">
        <strong> In class root again. Locals in living component:</strong> <br/>
        {{ JSON.stringify($style, null, 4) }}
      </p>
    </div>
  </div>
</template>

<script>
  import ScopedRoot from "./ScopedRoot.vue";
//  console.log('ScopedRoot=', ScopedRoot)

  var ScopedSelectors = {
    name: "ScopedSelectors"
  }

  module.exports = ScopedSelectors
</script>

<style module lang="less" src="./ScopedSelector.less">
</style>
