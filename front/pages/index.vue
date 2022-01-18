<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
          <p>
            For more information on Vuetify, check out the <a
              href="https://vuetifyjs.com"
              target="_blank"
            >
              documentation
            </a>.
          </p>
          <p>
            If you have questions, please join the official <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              title="chat"
            >
              discord
            </a>.
          </p>
          <p>
            Find a bug? Report it on the github <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              title="contribute"
            >
              issue board
            </a>.
          </p>
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
          >
            Nuxt Documentation
          </a>
          <br>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            @click="postMessage"
          >
            Continue
          </v-btn>
          <v-text-field v-model="messageText"></v-text-field>
          <ul id="example-1">
            <li v-for="item in messages" :key="item">
              {{ item }}
            </li>
          </ul>
        </v-card-actions>
       </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import ActionCable from 'actioncable';
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
    components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      messageText: ""
    };
  },
  computed:{
    messages(){
      return this.$store.state.messages;
    } 
  },
  created() {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

    this.messageChannel = cable.subscriptions.create( "PostChannel",{
      received: (data) => {
        this.$store.commit("addMessage", data);
      },
    })
  },
  methods: {
    postMessage: function() {
      //ActionCable PostChannelにおけるpostメソッドを実行する
      this.messageChannel.perform('post', { 
        message: this.messageText, 
      });
      // console.log(this.$store.state.messages);
      //メッセージ追加後にテキストボックスを空にする
      this.messageText = ""
    }
  }
};
</script>