<template>
  <v-dialog :max-width="width" v-model="model" no-click-animation :persistent="persistent">
    <template v-slot:activator="{ on }">
      <nav-btn
        v-if="nav" :icon="icon" :id="id" v-bind="$attrs" v-show="showBtn"
        :activator="on" @click="$emit('click')"
      ></nav-btn>
      <icon-btn
        v-if="!nav" :icon="icon" :id="id" v-bind="$attrs" v-show="showBtn"
        :activator="on" @click="$emit('click')"
      >
        {{label}}
      </icon-btn>
    </template>
    <v-card>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import IconBtn from './IconBtn.vue'
import NavBtn from './NavBtn.vue'


@Component({
  components: { IconBtn, NavBtn }
})
export default class DialogBtn extends Vue {
  @Prop({ type: Boolean, default: false }) nav!: boolean
  @Prop(String) icon!: string
  @Prop(String) id!: string
  @Prop(String) width!: string
  @Prop(Boolean) value!: boolean
  @Prop({ type: Boolean, default: false }) persistent!: boolean
  @Prop(String) label!: string
  @Prop({ type: Boolean, default: true }) showBtn !: boolean

  model = this.value

  @Watch('value')
  _onValueChange(val: boolean): void {
    this.model = val
  }

  @Watch('model')
  @Emit('input')
  _onModelChange(val: boolean): boolean {
    return val
  }
}
</script>