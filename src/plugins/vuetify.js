import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify)
const theme = {
  primary: "#2196F3",
  secondary: "#455A64",
  accent: "#9c27b0",
  error: "#f44336",
  warning: "#FFC107",
  info: "#64B5F6",
  success: "#4caf50"
}

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  }
})
