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
    <v-card flat>
      <v-container>
        <v-row justify="center">
          <v-col cols="auto">
            Add Emoji
          </v-col>
        </v-row>
        <v-form ref="emojiForm">
          <v-row justify="center" no-gutters>
            <v-col cols="10">
              <v-text-field
                label="Command"
                v-model.trim="form.command"
                clearable id="add-emoji-command"
                :rules="rulesCommand"
                counter="20"
              ></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-text-field
                label="Source"
                v-model.trim="form.src"
                clearable id="add-emoji-source"
                :rules="rulesSrc"
              ></v-text-field>
            </v-col>
            <v-col cols="12" id="add-emoji-type" class="emoji-preview">
              Type: {{ emojiType }}
            </v-col>
            <v-col cols="12" class="emoji-preview">
              <span>Preview: </span>
              <img :src="form.src" width="25px" v-if="emojiType == 'img'" />
              <span v-if="emojiType == 'dec'" class="normal-emoji">{{ form.src }}</span>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <icon-btn
                color="error" icon="mdi-close" @click="show = false"
                id="add-emoji-cancel"
              >
                Cancel
              </icon-btn>
            </v-col>
            <v-col cols="auto">
              <icon-btn
                color="success" icon="mdi-check" @click="addEmoji()"
                id="add-emoji-confirm"
              >
                Confirm
              </icon-btn>
            </v-col>
          </v-row>
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
          this.$socket.emit('ADD_EMOJI', emoji)
          this.resetForm()
          this.show = false
      isDuplicate: (value) ->
        for item in this.$store.state.emoji.emojiList
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

  .emoji-preview {
    text-align: center;
  }
</style>