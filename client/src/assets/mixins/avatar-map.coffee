map = {
  'zero_2': 'https://i.imgur.com/qQ0Fkkx.png',
  'initial_d': 'https://i.imgur.com/fk44rTD.png',
  'misaka': 'https://i.imgur.com/eZ6FZcr.png',
  'eva_unit_1': 'https://i.imgur.com/aqld5ou.png',
  'taj': 'https://i.imgur.com/XzjhzbO.png',
  'alphonse': 'https://i.imgur.com/PerwiGF.png',
  'horo': 'https://i.imgur.com/oOiDAFl.png',
  'madoka': 'https://i.imgur.com/iGPVIAN.png',
  'lelouch': 'https://i.imgur.com/mB0IKty.png',
  'miyu': 'https://i.imgur.com/Jvi0FoN.png',
  'rawr': 'https://i.imgur.com/t03jCAX.png'
}

export default
  methods:
    imageSrc: (avatar) ->
      if avatar of map
        return map[avatar]
      return 'img/avatar/dead_link.jpg'