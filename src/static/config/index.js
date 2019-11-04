const config = {
  appURL: 'wss://group.fsn.dev',
  uploadFile: 'https://group.fsn.dev/uploadFile',
  gitRsConfig: {
    client_id: '8f981d06f6c9398bb50b',
    redirect_uri: 'https://fsn.dev/group'
  },
  joinCMURL: 'https://fsn.dev/group',
  reward: 2000,
  totalReward: 200,
  birdTime: '2019-10-31 23:59'
}

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  config.gitRsConfig.client_id = '5fa57948473fe4991ac0'
  config.gitRsConfig.redirect_uri = 'http://192.168.1.183:8100'
  config.appURL = 'http://192.168.1.183:8200'
  // config.appURL = 'http://54.183.185.30:8100'
  // config.uploadFile = 'ws://54.183.185.30:8100'
}
console.log(config)
module.exports = config