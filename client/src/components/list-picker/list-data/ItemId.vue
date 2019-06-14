<template>
  <a @click="toggle()">{{outputId()}}</a>
</template>

<script lang="coffee">
  export default
    props: [ 'id' ]
    data: () ->
      show: false
    methods:
      toggle: () ->
        console.log(this.show)
        this.show = !this.show
      outputId: () ->
        if this.show
          return this.id
        return "#{this.id.substr(0, 5)}..."
</script>