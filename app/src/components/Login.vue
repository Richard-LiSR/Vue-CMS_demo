<!--
 * @Author: Li shirun
 * @Date: 2021-10-16 19:04:38
 * @Last Modified by:   Li shirun
 * @Last Modified time: 2021-10-16 19:04:38
-->
<template>
	<!-- 定义登陆页面的模块 -->
	<div class="login_container">
		<div id="background">
			<!-- 标题区域 -->
			<div class="typewriter-effect">
				<vue-typed-js
					class="demo"
					:strings="[
						'This is a simple background management system',
						'It’s still being updated',
					]"
					:loop="true"
					:loopCount="1511111"
					:typeSpeed="60"
					:smartBackspace="true"
				>
					<h2 class="typing"></h2>
				</vue-typed-js>
			</div>
			<!-- <h2>登录组件</h2> -->
			<div class="login_box">
				<!-- 定义头像区域的模块 -->
				<div class="hover-img">
					<img src="../assets/logo.png" alt="" />
					<figcaption>
						<h3>Richard<br />Li !</h3>
					</figcaption>
				</div>
				<!-- 登录表单区域 -->
				<el-form
					ref="LoginFormRef"
					status-icon
					:model="loginform"
					label-width="0px"
					class="LoginFrom"
					:rules="LoginFromRules"
				>
					<!-- 用户名 -->
					<el-form-item prop="username">
						<el-input
							v-model="loginform.username"
							placeholder="请输入用户名"
							prefix-icon="iconfont icon-user"
						></el-input>
					</el-form-item>
					<!-- 密码 ，prefix-icon为前置图标-->
					<el-form-item prop="password">
						<el-input
							v-model="loginform.password"
							prefix-icon="iconfont icon-mima4"
							placeholder="请输入密码"
							type="password"
						></el-input>
					</el-form-item>
					<!-- 验证码 -->
					<el-form-item class="verificatio_code">
						<el-col class="verifiy_title" :span="3">验证码 : </el-col>
						<el-col :span="11">
							<el-input
								v-model="loginform.verificationcode"
								prefix-icon="iconfont icon-yanzhengma"
								placeholder="看不清,点击图片刷新"
								@blur="checkoutvecode"
							>
							</el-input>
						</el-col>
						<!-- 验证码图片区域 -->
						<el-col :span="5" class="vecode">
							<img
								src="http://localhost:3000/api/verification/code"
								alt=""
								ref="captcha"
								@click="covertVerification_code"
							/>
						</el-col>
					</el-form-item>
					<!-- 按钮区域 -->
					<el-form-item class="btns">
						<!-- 后为按钮样式 -->
						<el-button type="primary" @click="verifyLoginForm">登录</el-button>
						<el-button type="info" @click="resertLoginForm">重置</el-button>
					</el-form-item>
				</el-form>
				<!-- 设置左右图片 -->
				<!-- <div class="card-container">
					<div class="image-card perspective-left"></div>
					<div class="image-card perspective-right"></div>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
var bcrypt = require("bcryptjs");

export default {
	name: "login_container",
	data() {
		return {
			typewriter: "",
			i: 0,
			timer: 0,
			str: "Hi, i´m a web Designer",
			mg_state: "",
			// 这是登陆表单的数据绑定对象
			loginform: {
				username: "admin",
				password: "123456",
				verificationcode: "",
			},
			isvecode: "",
			// 定义登录验证规则
			LoginFromRules: {
				username: [
					{
						required: true, //代表必填项
						message: "请输入账户",
						trigger: "blur", //表示鼠标失去焦点后触发此规则
					},
					{
						min: 3,
						max: 10,
						message: "长度在 3 到 10个字符",
						trigger: "blur", //表示鼠标失去焦点后触发此规则
					},
				],
				password: [
					{
						required: true, //代表必填项
						message: "请输入密码",
						trigger: "blur", //表示鼠标失去焦点后触发此规则
					},
					{
						min: 4,
						max: 15,
						message: "长度在 6 到 15个字符",
						trigger: "blur", //表示鼠标失去焦点后触发此规则
					},
				],
			},
		};
	},

	methods: {
		// 校验验证码是否正确
		async checkoutvecode() {
			const { data: res } = await this.$http.get("verify");
			console.log(res.data[0].code);
			const vecode = this.loginform.verificationcode !== res.data[0].code;
			this.isvecode = !vecode;
			if (vecode) {
				// console.log(this.loginform.verificationcode)
				return this.$message.error("验证码错误");
			}
			this.$message.success("验证码正确");
		},
		// 在控制台获取验证码
		async getcode() {
			const { data: res } = await this.$http.get("verify");
			const code = res[0].code;
			console.log(code);
		},
		// 变换验证码连接
		covertVerification_code() {
			// console.log(this.$refs.captcha.src);
			this.$refs.captcha.src =
				"http://localhost:3000/api/verification/code?mt=" + Math.random();
		},
		// 自动变化验证码
		autocovertVecode() {
			setInterval("this.covertVerification_code()", "1000");
		},
		// 重置表单
		resertLoginForm() {
			this.$refs.LoginFormRef.resetFields();
		},
		verifyLoginForm() {
			this.$refs.LoginFormRef.validate(async (valid) => {
				// console.log(valid)  vaild返回一个布尔值
				if (valid) {
					// post的返回值是一个promise ,且await只能用于异步async方法,必须要添加参数，这样才能发送给后端
					const { data: res } = await this.$http.post("login", this.loginform);
					console.log(res);
					this.mg_state = res.admin.mg_state;
					const username = this.loginform.username === res.admin.username;
					const password = bcrypt.compareSync(
						this.loginform.password,
						res.admin.password
					);
					console.log(username, password, this.isvecode, this.mg_state);
					if (username && password && this.isvecode && this.mg_state) {
						this.$message.success("恭喜你,登录成功");
						// 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
						// 1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
						// 1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
						window.sessionStorage.setItem("token", res.token);
						// 通过编程式导航对象跳转到后台主页,路由地址是/home
						this.$router.push("/home");
					} else {
						return this.$message.error("不好意思,登录失败了哦!");
					}
				}
			});
		},
	},
};
</script>

<style lang="less" scoped>
@import url("https://fonts.googleapis.com/css?family=Yaldevi:400");
// 设置左右图片
.image-card {
	display: inline-block;
	box-sizing: border-box;
	margin: 1rem;
	width: 240px;
	height: 320px;
	padding: 8px;
	border-radius: 1rem;
	background: url("https://picsum.photos/id/1049/240/320");
	box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
}

.perspective-left {
	transform: perspective(1500px) rotateY(15deg);
	transition: transform 1s ease 0s;
}

.perspective-left:hover {
	transform: perspective(3000px) rotateY(5deg);
}

.perspective-right {
	transform: perspective(1500px) rotateY(-15deg);
	transition: transform 1s ease 0s;
}

.perspective-right:hover {
	transform: perspective(3000px) rotateY(-5deg);
}

#background {
	background: url(https://cdn.jsdelivr.net/gh/Richard-LiSR/PicBed/blog_img/stephen-leonardi-I62h3Pv-JSI-unsplash.jpg)
		no-repeat;
	background-position: center;
	height: 100%;
	width: 100%;
	background-size: cover;
	position: fixed;
}
.demo {
	transform: translate(25%, -10px);
	font-family: "Yaldevi", sans-serif;
	text-align: center;
	font-size: 1.953rem;
}
// 设置头像hover
.hover-img {
	background-color: #000;
	color: #fff;
	display: inline-block;
	margin: 8px;
	max-width: 130px;
	min-width: 130px;
	overflow: hidden;
	position: relative;
	text-align: center;
	width: 100%;
}

.hover-img * {
	box-sizing: border-box;
	transition: all 0.45s ease;
}

.hover-img:before,
.hover-img:after {
	background-color: rgba(0, 0, 0, 0.5);
	border-top: 32px solid rgba(0, 0, 0, 0.5);
	border-bottom: 32px solid rgba(0, 0, 0, 0.5);
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	content: "";
	transition: all 0.3s ease;
	z-index: 1;
	opacity: 0;
	transform: scaleY(2);
}

.hover-img img {
	vertical-align: top;
	max-width: 100%;
	backface-visibility: hidden;
}

.hover-img figcaption {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	align-items: center;
	z-index: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	line-height: 1.1em;
	opacity: 0;
	z-index: 2;
	transition-delay: 0.1s;
	font-size: 24px;
	font-family: sans-serif;
	font-weight: 400;
	letter-spacing: 1px;
	text-transform: uppercase;
}

.hover-img:hover:before,
.hover-img:hover:after {
	transform: scale(1);
	opacity: 1;
}

.hover-img:hover > img {
	opacity: 0.7;
}

.hover-img:hover figcaption {
	opacity: 1;
}

// 容器
.login_container {
	// // background-color: #2b4b6b;
	// no-repeat;
	height: 100%;
}

// 验证码区域
.vecode {
	// translate参数分别为向右和向下(添加符号为相反方向)
	transform: translate(15px, -10px);
}

// 登录区域
.login_box {
	width: 550px;
	height: 380px;
	background-color: rgb(236, 234, 234);
	opacity: 0.85;
	border-radius: 20px;
	box-shadow: 0 0 10px #ddd;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
// 头像区域
.hover-img {
	// height: 130px;
	// width: 130px;
	border: 1px solid #eee;
	border-radius: 50%;
	padding: 10px;
	box-shadow: 0 0 10px #ddd;
	position: absolute;
	left: 50%;
	// translate参数（left top）
	transform: translate(-50%, -50%);
	background-color: #fff;

	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: rgba(34, 194, 133, 0.301);
	}
}
// 按钮区域
.btns {
	display: flex;
	justify-content: flex-end;
}
// 登录表单区域
.LoginFrom {
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 0 20px;
	box-sizing: border-box;
}
</style>
