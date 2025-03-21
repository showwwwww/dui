const translations: TranslationKeys = {
  header: {
    title: 'Docker Visual Management',
  },
  loginPage: {
    title: 'Launch Now',
    loginButton: 'Login',
    usernameLabel: 'Username',
    usernamePlaceholder: 'Please enter your username',
    usernameError: 'Please check your username',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Please enter your password',
    passwordError: 'Please check your password',
  },
  homePage: {
    sidebar: {
      dockerGroup: {
        title: 'Docker',
        stats: "App's Stats",
        commands: 'Commands',
      },
    },
    statsPage: {
      run: 'Run',
      stop: 'Stop',
    },
    commandsPage: {
      caption: 'A list of Docker commands',
      columns: {
        name: 'Alias',
        command: 'Command',
        params: 'Params',
        description: 'Description',
        tags: {
          title: 'Tags',
          default: 'Default',
          levels: ['info', 'normal', 'warning', 'danger'],
        },
        actions: {
          title: 'Actions',
          edit: 'Edit',
          delete: 'Delete',
        },
      },
    },
  },
};

export default translations;
