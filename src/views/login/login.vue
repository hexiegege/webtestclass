<template>
    <v-app id="login-app">
      <v-main>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card  >
                <v-toolbar dark color="primary"  >
                  <v-toolbar-title class ="text-center">测试课堂</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="mdi-account" v-model="nickname" label="用户名" type="text"/>
                    <v-text-field
                      prepend-icon="mdi-lock"
                      v-model="password"
                      label="密码"
                      id="password"
                      :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="e1 = !e1"
                      :type="e1 ? 'text' : 'password'"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="doLogin()">登录</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
      <v-dialog v-model="dialog" width="300px">
        <v-alert icon="warning" color="error" :value="true">
          用户名和密码不能为空
        </v-alert>
      </v-dialog>
    </v-app>
</template>

<script>

  import authServices from "../../services/authServices";

  export default {
    name: 'login',
    data: () => ({
      nickname: "",
      password: "",
      dialog: false,
      e1:false
    }),
    methods: {
      doLogin() {
        let self = this
        if (!this.nickname || !this.password) {
          this.dialog = true;
          return false;
        }
        authServices.login({'nickname': this.nickname,'password': this.password})
        .then(function(res) {
          let id = res.data.data.id
          let authority = res.data.data.authority
          let nickname = res.data.data.nickname
          self.$store.commit('USER_LOGIN',{
            'name': nickname,
            'id': id,
            'role': authority,
            'token': res.headers.authorization
          })
          self.$router.push({path: '/home'})
        }).catch(function (err) {
          self.$notify.error({
            title: '登录失败',
            message: '用户名 密码 验证错误'
          })
        })


      }
    }
  };
</script>
<style lang="sass">
  @import '../../assets/css/common'
  #login-app
    background: url("../../assets/img/login_bg.jpg") no-repeat bottom
</style>

