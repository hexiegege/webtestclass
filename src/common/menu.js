const menus = [
  {
    action: "course",
    icon: 'mdi-book',
    title: "课程管理",
    path:"",
    items: [
      { title: "课程列表",icon:"mdi-book", path: "/course" },
    ]
  },
  {
    action: "subscribe",
    icon: 'mdi-book-account',
    title: "订阅管理",
    path:"",
    items: [
      { title: "课程订阅",icon:"mdi-book-account", path: "/subscribe" },
      { title: "我的订阅",icon:"mdi-book-account", path: "/subscribeMine" },
    ]
  },
  {
    action: "user",
    icon: 'mdi-account',
    title: "用户管理",
    path:"",
    items: [
      { title: "用户列表",icon:"mdi-account-box", path: "/user" },
      { title: "新增用户",icon:"mdi-account-multiple-plus", path: "/createUser" },
    ]
  }
]

export default menus;
