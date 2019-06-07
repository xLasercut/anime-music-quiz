<template>
  <v-layout>
    <v-flex xs12>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">Answer</div>
          <v-card>
            <v-card-text>
              <p v-for="(value, key) in $store.getters['game/songInformation']" :key="`admin_answer_${key}`">
                {{key}}: <b>{{value}}</b>
              </p>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>
