<template>
    <v-row justify="center">
        <v-col cols="auto" v-for="avatar in avatars" :key="`avatar_${avatar}`">
            <input :id="`avatar_${avatar}`" type="radio" :value="avatar" v-model="model" :disabled="disabled">
            <label :for="`avatar_${avatar}`">
                <v-avatar tile size="100px">
                    <v-img :src="imgSrc(avatar)"></v-img>
                </v-avatar>
            </label>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Emit, Mixins, Prop, Watch} from 'vue-property-decorator'
    import {AvatarHelper} from '../../assets/mixins'

    @Component({})
    export default class FormAvatar extends Mixins(AvatarHelper) {
        @Prop(String) value!: string
        @Prop({type: Boolean, default: false}) disabled!: boolean
        @Prop(Array) avatars!: Array<string>

        model = this.value

        @Watch('value')
        _onValueChange(val: string): void {
            this.model = val
        }

        @Watch('model')
        @Emit('input')
        _onModelChange(val: string): string {
            return val
        }
    }
</script>

<style scoped>
    input {
        display: none;
    }

    .v-image {
        outline: 1px solid black;
        cursor: pointer;
        transition: all 0.1s;
        background-color: white;
    }

    input:checked + label .v-image {
        outline: 4px solid var(--v-success-base);
    }
</style>