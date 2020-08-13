<template >
  <v-app>
    <!--顶部应用栏-->
    <v-app-bar absolute app  flat  height="60" id="index_app_bar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!--路由标题-->
      <v-toolbar-title
        class="hidden-sm-and-down font-weight-light"
        v-text="$route.meta.name"/>
      <!--切换主题模式-->
      <v-switch
        v-model="$vuetify.theme.dark"
        :label="$vuetify.theme.dark ? '暗黑' : '明亮'"
        class="ml-5"
        color="secondary"
        hide-details/>
      <!--主页面标题-->
      <v-toolbar-title  class="text-center">测试课堂</v-toolbar-title>
      <!--自动填充-->
      <v-spacer />
      <!--搜索框-->
      <v-text-field :label="$t('search')" color="primary" hide-details style="max-width: 165px;">
        <template v-if="$vuetify.breakpoint.mdAndUp"
          v-slot:append-outer>
          <v-btn class="mt-n2" elevation="1" fab small>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <div class="mx-3" />
      <!--dashboard图标-->
      <v-btn class="ml-2" min-width="0" text to="/home">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <!--通知-->
      <v-menu bottom left
        offset-y
        origin="top right"
        transition="scale-transition">
        <!--图标显示-->
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-2"
            min-width="0" text v-bind="attrs" v-on="on">
            <v-badge color="red" overlap bordered>
              <template v-slot:badge>
                <span>{{notifications.length}}</span>
              </template>
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <!--展开通知-->
        <v-list :tile="false" nav>
            <v-list-item
              v-for="(n, i) in notifications"
              :key="`item-${i}`"
              >
              <v-list-item-title v-text="n" @click="showNotificationDetail(n)"/>
            </v-list-item>
        </v-list>
      </v-menu>
      <!--用户信息图标-->
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-2" min-width="0" text
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            @click="logout()"
          >
            <v-list-item-title>退出登录</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!--左侧导航栏-->
    <v-navigation-drawer
      id="core-navigation-drawer"
      persistent
      v-model="drawer"
      src="https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg"
      enable-resize-watcher
      :mini-variant.sync="miniVariant"
      fixed
      app>
      <v-list-item >
          <v-list-item-avatar>
            <img src="../../assets/img/avatar.jpg">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>禾血哥哥</v-list-item-title>
          </v-list-item-content>
          <!-- 收起左侧菜单的按钮-->
          <v-btn icon @click.stop="miniVariant = !miniVariant">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
      <v-divider/>
      <v-list-item to="/home">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content class="ml-6">
          <v-list-item-title>主页</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <!-- 左侧菜单 -->
      <v-list class="pt-0" dense>
        <v-list-group
          v-for="item in items"
          v-model="item.action"
          :key="item.title"
          :prepend-icon="item.icon"
          no-action>
          <!--一级菜单 -->
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title :to="item.path">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- 二级菜单 -->
          <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="item.path + subItem.path">
            <v-list-item-action>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <!--主视图页面-->
    <v-main>
      <v-dialog v-model="alertFlag" width="30%" >
        <v-alert  type="info">
          {{alertSuccess}}
        </v-alert>
      </v-dialog>
      <!--路由页面-->
      <router-view/>
    </v-main>
    <!--页脚-->
    <v-footer id="index-footer" >
      <v-container>
        <v-row justify="center" no-gutters>
          <v-col  v-for="(link,i) in links" :key="i" cols="auto" >
            <a :href="link.href"
               class="mr-3 blue--text text--darken-3"
               target="_blank"
               v-text="link.text"/>
          </v-col>
        </v-row>
        <v-row justify="center"  no-gutters>
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-row>
      </v-container>
    </v-footer>

  </v-app>
</template>

<script>
  import { mapActions } from 'vuex'
  import USER_LOGOUT from '../../store/user'
  import menus from "../../common/menu";
  import authServices from "../../services/authServices";
export default {
  name: 'index',
  data: () =>({
    msg: '欢迎来到测试课堂',
    dark: false,// 是否暗黑主题
    drawer: true,
    miniVariant: false,// 左侧导航是否收起
    alertSuccess:'',
    alertFlag: false,
    notifications: [
      '小李订阅了语文古诗词鉴赏',
      '新增了五个新课程',
      '今天天气不错'
    ],
    links: [
      {
        href: '#',
        text: '学习资料',
      },
      {
        href: '#',
        text: '关于我们',
      },
      {
        href: '#',
        text: '官方微博',
      }
    ],
    menuMap: {}
  }),
  computed: {

    items() {
      return menus;
    },
    item1() {
      const arr = this.$route.path.split("/");
      return this.menuMap[arr[1]].name;
    },
    item2() {
      const arr = this.$route.path.split("/");
      return this.menuMap[arr[1]][arr[2]];
    },
  },
  components: {

  },
  methods: {
    ...mapActions([USER_LOGOUT]),
    showNotificationDetail(n){
      this.alertSuccess = n;
      this.alertFlag = true;
    },
    logout() {
      let self = this;
      authServices.logout().
      then(function (res) {
        self.alertSuccess = res.data.msg;
        self.alertFlag = true;
        // mutations 同步提交
        self.$store.commit('USER_LOGOUT')
        // 分发Action 可异步
        // self.USER_LOGOUT();
        self.$router.push({path:"/login"});
      }).catch(function (err) {
        self.alertSuccess = err.message;
        self.alertFlag = true;
        self.$router.push({path:"/login"});
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  @import '../../assets/css/common'
  @import '../../../node_modules/vuetify/src/styles/tools/rtl'
  #core-navigation-drawer
    .v-list-group__header.v-list-item--active:before
      opacity: .24
    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px
        +ltr()
          margin-right: 24px
          margin-left: 12px !important
        +rtl()
          margin-left: 24px
          margin-right: 12px !important
    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px
    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px
        +rtl()
          padding-right: 8px
      .v-list-group__header
        +ltr()
          padding-right: 0
        +rtl()
          padding-right: 0
        .v-list-item__icon--text
          margin-top: 19px
          order: 0
        .v-list-group__header__prepend-icon
          order: 2
          +ltr()
            margin-right: 8px
          +rtl()
            margin-left: 8px
  #index-footer
    a
      font-size: .825rem
      font-weight: 500
      text-decoration: none
      text-transform: uppercase
</style>
