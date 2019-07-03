<template>
  <v-dialog width="500" v-model="show">
    <template v-slot:activator="{ on }">
      <icon-btn
        :activator="on" color="success"
        icon="mdi-plus" id="add-emoji-btn"
      >
        Add Emoji
      </icon-btn>
    </template>
    <v-card>
      <v-container grid-list-lg>
        <v-layout>
          <v-flex xs12 class="text-xs-center">
            Add Emoji
          </v-flex>
        </v-layout>
        <v-form ref="emojiForm">
          <v-layout justify-center wrap>
            <v-flex xs10>
              <v-text-field
                label="Command"
                v-model.trim="form.command"
                clearable id="add-emoji-command"
                :rules="rulesCommand"
                counter="20"
              ></v-text-field>
            </v-flex>
            <v-flex xs10>
              <v-text-field
                label="Source"
                v-model.trim="form.src"
                clearable id="add-emoji-source"
                :rules="rulesSrc"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 class="text-xs-center" id="add-emoji-type">
              Type: {{ emojiType }}
            </v-flex>
            <v-flex xs12 class="text-xs-center">
              <span>Preview: </span>
              <img :src="form.src" width="25px" v-if="emojiType == 'img'" />
              <span v-if="emojiType == 'dec'" class="normal-emoji">{{ form.src }}</span>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 class="text-xs-center">
              <icon-btn
                color="error" icon="mdi-close" @click="show = false"
                id="add-emoji-cancel"
              >Cancel</icon-btn>
              <icon-btn
                color="success" icon="mdi-check" @click="addEmoji()"
                id="add-emoji-confirm"
              >
                Confirm
              </icon-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="coffee">
  import IconBtn from '../components/buttons/IconBtn.vue'
  import NavBtn from '../components/buttons/NavBtn.vue'

  export default
    components: { IconBtn, NavBtn }
    data: () ->
      show: false
      form: {
        src: '',
        command: ''
      },
      rulesCommand: [
        (v) => !this.isDuplicate(v) || 'Duplicate command',
        (v) => this.isValidCommand(v) || 'Command only accepts: a-z, A-Z, 0-9',
        (v) => v.length <= 20 || 'Command must be between 1-20 characters'
      ],
      rulesSrc: [
        (v) => !!v || 'Source cannot be empty'
      ]
    computed:
      emojiType: () ->
        if this.form.src and this.form.src.match(/(.*)\.(png|jpg|jpeg|gif)$/)
          return 'img'
        return 'dec'
    methods:
      addEmoji: () ->
        valid = this.$refs.emojiForm.validate()
        if valid
          emoji = {
            command: this.form.command,
            src: this.form.src,
            type: this.emojiType
          }
          this.$store.commit('misc/ADD_EMOJI', emoji)
          this.$socket.emit('UPDATE_EMOJI_DATA', this.$store.state.misc.emojiList)
          this.resetForm()
          this.show = false
      isDuplicate: (value) ->
        for item in this.$store.state.misc.emojiList
          if value and item.command.toLowerCase() == value.toLowerCase()
            return true
        return false
      isValidCommand: (value) ->
        if /^[A-Za-z0-9]+$/.exec(value)
          return true
        return false
      resetForm: () ->
        this.form.src = ''
        this.form.command = ''
</script>


<style scoped>
  .normal-emoji {
    font-size: 16pt;
  }
</style>