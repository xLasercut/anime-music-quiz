<template>
  <el-row>
    <el-dialog
      :visible.sync="show"
      title="Settings"
      :close-on-click-modal="false"
      @open="socket.emit('SYNC_SETTINGS')"
    >
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form label-position="top">
            <el-form-item label="Number of Songs">
              <el-slider v-model.number="form['songNumber']"></el-slider>
            </el-form-item>
            <el-form-item label="Guess Time">
              <el-slider v-model.number="form['guessTime']"></el-slider>
            </el-form-item>
            <el-form-item label="Type">
              <el-checkbox-group v-model="form['type']">
                <el-checkbox label="opening">Opening</el-checkbox>
                <el-checkbox label="insert" disabled>Insert</el-checkbox>
                <el-checkbox label="ending">Ending</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="show = false">Cancel</el-button>
              <el-button type="success" @click="updateSettings()">Confirm</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        required: true
      }
    },
    watch: {
      show(val) {
        this.$emit('input', val)
      },
      value(val) {
        this.show = val
      }
    },
    data() {
      return {
        show: this.value,
        form: {
          songNumber: 20,
          guessTime: 25,
          type: ['opening', 'ending']
        },
        socket: this.$store.state.socket
      }
    },
    methods: {
      updateSettings() {
        this.socket.emit('UPDATE_SERVER_SETTINGS', this.form)
        this.show = false
      }
    },
    mounted() {
      if (this.socket) {
        this.socket.on('UPDATE_CLIENT_SETTINGS', (settings) => {
          this.form = settings
        })
      }
    }
  }
</script>

<style scoped>

</style>