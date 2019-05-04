module.exports = {
  base: 'https://szymonlisowiec.github.io/auth-microservice-page/',
  title: 'Auth Microservice',
  description: 'Advanced and secure authentication microservice.',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Github', link: 'https://github.com/SzymonLisowiec/auth-microservice' },
    ],
    sidebar: {

      '/guide/': [
        '',
        'Endpoints',
      ],

      '/api/': [
        '',
        'Config',
        'Log',
      ]

    },
  },
};
