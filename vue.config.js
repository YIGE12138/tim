let proxyObj={};
proxyObj['/ws']={
  ws:true,
  target:"ws://localhost:8082"
};
proxyObj['/']={
  ws:false,
  target:'http://localhost:8082',
  changeOrigin: true,
  pathRewrite:{
    '^/':''
  }
}
module.exports={
  devServer:{
    host:'http://locahost',
    port:8080,
    proxy:proxyObj
  }
}
