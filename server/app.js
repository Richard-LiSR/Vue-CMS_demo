var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session')
var logger = require('morgan');

var LoginRouter = require('./routes/login');
const VerificationCode = require('./routes/verification_code')

const verifycode = require('./routes/verfiycode')
// 注册管理员
const register = require('./routes/register')
// 创建菜单列表
const Menu = require('./routes/ManagerMenu')
// 获取菜单
const getMenulist = require('./routes/Menulist')
// 操做用户
const ManagerSpUserlist = require('./routes/Manager_Sp_Userlist')
// 查找用户
const findSpUserlist = require('./routes/findSpUserlist')
// 获取用户
const getSpUserlist = require('./routes/getSpUserlist')
// 更新用户登陆状态
const getUserInfoState = require('./routes/getUserInfoState')
// 更新用户
const updateSpuserlist = require('./routes/updateSpUser')
// 删除用户
const deleteSpUserlist = require('./routes/deleteSpUserlist')

var app = express();



// 配置session的中间件
app.use(session({
  secret: 'this is session',//服务器生产session的签名
  name: "itying",//修改session对应的cookie的名称
  resave: false,//强制保存session,即使它没有变化
  saveUninitialized: true,//强制将初始化的session存储
  cookie: {
    maxAge: 1000 * 60 * 30,
    secure: false//true 表示只有https协议才能访问cookie
  },
  rolling: true
}))



app.all('/api/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') res.sendStatus(200)
  /*让options请求快速返回*/ else next()
})

// 初始化统一响应机制
var resextra = require('./modules/resextra')
app.use(resextra)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 引入body-parser模块，用来处理post请求参数
const bodyParser = require('body-parser');
// 处理post请求参数
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }))
// parse application/json
app.use(bodyParser.json())



// 注册管理员
app.use('/api', register)
// 登录验证
app.use('/api', LoginRouter);
// 添加验证码
app.use('/api/verification', VerificationCode)
app.use('/api', verifycode)
// 创建菜单列表
app.use('/api', Menu)
// 查找菜单
app.use('/api', getMenulist)
// 操作用户
app.use('/api', ManagerSpUserlist)
// 查找用户
app.use('/api', findSpUserlist)
// 获取用户
app.use('/api', getSpUserlist)
// 更改用户登陆状态
app.use('/api/',getUserInfoState)
// 更新用户
app.use('/api', updateSpuserlist)
// 删除用户
app.use('/api', deleteSpUserlist)


module.exports = app;
