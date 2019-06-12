<template>
  <youtube @ready="ready($event)" ref="youtube" :video-id="videoId()" player-width="100%" player-height="100%">
  </youtube>
</template>

<script lang="coffee">
  export default
    props: [ 'start', 'volume' ]
    watch:
      volume: (val) ->
        this.player.setVolume(val)
    data: () ->
      player: null
      videoDuration: 0
      playing: false
    methods:
      ready: (event) ->
        console.log(event.target)
        this.player = event.target
      getId: (url) ->
        return this.$youtube.getIdFromURL(url)
      videoId: () ->
        if this.$store.state.game.currentSong.src
          return this.getId(this.$store.state.game.currentSong.src)
      getStartPosition: () ->
        position = 0
        maxStart = Math.floor(this.videoDuration - this.$store.state.game.settings.guessTime)
        if maxStart > 0
          position = Math.floor(this.start * maxStart)
        return position
      load: () ->
        timeout = setInterval( () =>
          if this.getId(this.$store.state.game.currentSong.src) == this.getId(this.player.getVideoUrl())
            this.startLoad()
            duration = this.player.getDuration()
            if duration != 0
              this.endLoad()
              this.videoDuration = duration
              this.$emit('loaded')
              clearInterval(timeout)
        , 1)
      startLoad: () ->
        if !this.playing
          this.player.mute()
          this.player.playVideo()
          this.playing = true
      endLoad: () ->
        this.player.pauseVideo()
        this.player.unMute()
        this.playing = false
      setPosition: () ->
        this.player.seekTo(this.getStartPosition(), true)
      play: () ->
        this.player.playVideo()
      pause: () ->
        this.player.pauseVideo()

</script>