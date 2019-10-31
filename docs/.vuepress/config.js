module.exports = {
  chainWebpack: (config, isServer) => {
    // config 是 ChainableConfig 的一个实例
    // config.output('');
  },
  configureWebpack: (config, isServer) => {
    // console.log(config);
    // config.assetsPublicPath = '';
    // if (!isServer) {
    //   // 修改客户端的 webpack 配置
    // }
  },
  'title': 'blob',
  'description': 'blob',
  'dest': 'public',
  'head': [
    [
      'link',
      {
        'rel': 'icon',
        'href': '/favicon.ico',
      },
    ],
    [
      'meta',
      {
        'name': 'viewport',
        'content': 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  'theme': 'reco',
  'themeConfig': {
    'nav': [
      {
        'text': 'Home',
        'link': '/',
        'icon': 'reco-home',
      },
      {
        'text': 'TimeLine',
        'link': '/timeLine/',
        'icon': 'reco-date',
      },
      {
        'text': 'Contact',
        'icon': 'reco-message',
        'items': [
          // {
          //   "text": "NPM",
          //   "link": "https://www.npmjs.com/~reco_luan",
          //   "icon": "reco-npm"
          // },
        ],
      },
    ],
    'type': 'blog',
    'blogConfig': {
      'category': {
        'location': 2,
        'text': 'Category',
      },
      'tag': {
        'location': 3,
        'text': 'Tag',
      },
    },
    'logo': '/head.png',
    'search': true,
    'searchMaxSuggestions': 10,
    'sidebar': 'auto',
    'lastUpdated': 'Last Updated',
    'author': 'zhairuihao',
    'record': 'xxxx',
    'startYear': '2017',
    vssueConfig: {
      platform: 'github',
      owner: 'zhairuihao',
      repo: 'vuepress-reco',
      clientId: '4eeb9cd2f7249af6d11e',
      clientSecret: 'abe80266714d4500634a99e7dcb7ca9feaf448c8',
    },
    // 密钥
    keyPage: {
      keys: [''],
      color: '#42b983', // 登录页动画球的颜色
      lineColor: '#42b983', // 登录页动画线的颜色
    },

  },
  'markdown': {
    'lineNumbers': true,
  },
};
