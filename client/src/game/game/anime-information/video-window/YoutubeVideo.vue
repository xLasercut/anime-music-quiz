<template>
  <youtube
    @ready="ready($event)" :video-id="videoId()"
    player-width="95%" player-height="95%" :player-vars="playerVars"
    :style="{ height: '95%' }"
  />
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
      timeout: null
    sockets:
      RESET: () ->
        clearInterval(this.timeout)
        this.endLoad()
    computed:
      playerVars: () ->
        return {
          fs: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          playsinline: 1
        }
    methods:
      ready: (event) ->
        this.player = event.target
      getId: (url) ->
        return this.$youtube.getIdFromURL(url)
      videoId: () ->
        if this.$store.state.game.currentSong.src and this.$store.state.game.currentSong.src.includes('youtube')
          return this.getId(this.$store.state.game.currentSong.src)
        return ''
      getStartPosition: () ->
        maxStart = Math.floor(this.videoDuration - this.$store.state.game.settings.guessTime)
        if maxStart > 0
          return Math.floor(this.start * maxStart)
        return 0
      load: () ->
        this.timeout = setInterval( () =>
          if this.getId(this.$store.state.game.currentSong.src) == this.getId(this.player.getVideoUrl())
            this.startLoad()
            duration = this.player.getDuration()
            if duration != 0
              this.endLoad()
              this.videoDuration = duration
              this.$emit('loaded')
              clearInterval(this.timeout)
        , 500)
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