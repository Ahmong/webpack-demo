<template>
  <div>ScopedRoot</div>
</template>

<script>
  var ScopedRoot = {
    name: "ScopedRoot"
  }

  module.exports = ScopedRoot
</script>

<style module>
  .root {
    border-width: 2px;
    border-style: solid;
    border-color: #777;
    padding: 0 20px;
    margin: 6px 6px;
    max-width: 400px;
  }

  .root .rootMore {
    color: gold;
  }
</style>

<style module="module_A">
  .yan-root {
    color: brown;
  }
</style>
