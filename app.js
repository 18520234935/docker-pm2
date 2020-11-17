
const http = require('http')
const createHandler = require('github-webhook-handler')

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  let  resp = "";
  child.stdout.on('data', function (buffer) {
    resp += buffer.toString();
  });
  child.stdout.on('end', function () {
    console.log('Deploy 完成');

    callback(resp)
  });
}

const handler = createHandler({
    path:'/pm2', // url 后缀
    secret:'123123' // 你的密码
})

http.createServer((req,res) => {
  handler(req,res,err => {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777, () => {
  console.log('Webhook listen at 7777')
})

handler.on('error',err => {
  console.error('Error',err.message)
})

// 拦截push，执行 Deploy 脚本
handler.on('push', (event)=> {
  console.log('Received push');
  console.log('123')
    if(event.payload.ref === 'refs/heads/init'){

    run_cmd('sh', ['./autoDepoly.sh'], function(text){
        console.log(text)
        })
    }
 });
