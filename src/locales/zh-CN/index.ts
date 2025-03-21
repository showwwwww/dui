const translations: TranslationKeys = {
  header: {
    title: 'Docker 可视化管理',
  },
  loginPage: {
    title: '即刻启动',
    loginButton: '登录',
    usernameLabel: '用户名',
    usernamePlaceholder: '请输入您的用户名',
    usernameError: '请检查您的用户名',
    passwordLabel: '密码',
    passwordPlaceholder: '请输入您的密码',
    passwordError: '请检查您的密码',
  },
  homePage: {
    sidebar: {
      dockerGroup: {
        title: 'Docker',
        stats: '应用状态概览',
        commands: '指令集',
      },
    },
    statsPage: {
      run: '启动',
      stop: '停止',
    },
    commandsPage: {
      caption: 'Docker 指令列表',
      columns: {
        name: '指令别名',
        command: '指令',
        params: '参数',
        description: '描述',
        tags: {
          title: '标签',
          default: '默认',
          levels: ['提示', '正常', '警告', '危险'],
        },
        actions: {
          title: '操作',
          edit: '编辑',
          delete: '删除',
        },
      },
    },
  },
};

export default translations;
