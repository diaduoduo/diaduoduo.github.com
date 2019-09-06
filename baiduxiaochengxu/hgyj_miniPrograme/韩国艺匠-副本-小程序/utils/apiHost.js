let env = "prod";
let api = {
  dev: {
    apiHost: "http://10.0.11.40:60/",
    apiHost2: "http://10.0.11.40:60/",
    apiHost3: "http://10.0.11.40:60/",
    shopID: 1

  }, 
  prod: {
    apiHost: "https://wechat.topgalleria.com/",
    apiHost2: "https://wechat.topgalleria.com/", 
    apiHost3: "https://wechat.topgalleria.com/",
    shopID: 20
  }
}
module.exports = api[env]