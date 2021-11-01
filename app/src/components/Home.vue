<template>
	<el-container>
		<!-- 头部区域 -->
		<el-header>
			<div>
				<img
					src="https://cdn.jsdelivr.net/gh/Richard-LiSR/PicBed/blog_img/yhy_5.ico"
					alt=""
				/>
				<span>后台管理系统</span>
			</div>
			<!-- 全屏显示 -->
			<div class="btn-fullscreen" @click="handleFullScreen">
				<el-tooltip
					effect="dark"
					:content="fullscreen ? `取消全屏` : `全屏`"
					placement="bottom"
				>
					<i class="iconfont icon-quanping1"></i>
				</el-tooltip>
			</div>
			<!-- 用户头像 -->
			<div class="user-avator">
				<img src="../assets/img/img.jpg" class="avator_img" />
			</div>
			<!-- 用户名下拉菜单 -->
			<el-dropdown class="user-name" trigger="click" @command="handleCommand">
				<span class="el-dropdown-link">
					{{ username }}
					<i class="el-icon-caret-bottom"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<router-link to="/admin">
						<el-dropdown-item class="el-dropdown-menu__item"
							>用户信息</el-dropdown-item
						>
					</router-link>
					<el-dropdown-item command="user">修改密码</el-dropdown-item>
					<el-dropdown-item divided command="loginout"
						>退出登录</el-dropdown-item
					>
				</el-dropdown-menu>
			</el-dropdown>
			<!-- <el-button type="info" @click="logout">退出</el-button> -->
		</el-header>
		<!-- 页面主体区域 -->
		<el-container>
			<!-- 侧边栏区域,注意宽度不能写死
      可以用三目运算符,如果isCollapse为true则为64px否则为200px
      -->
			<el-aside :width="isCollapse ? '64px' : '200px'">
				<div class="toggle-button" @click="toggleCollapse">|||</div>
				<!-- 侧边栏菜单区域 -->
				<el-menu
					background-color="#333744"
					text-color="#fff"
					active-text-color="#409EFF"
					:unique-opened="unique_opened"
					:collapse="isCollapse"
					:collapse-transition="collapse_transition"
					:router="router"
				>
					<!-- 一级菜单,index不能相同,不然点击一个会全部都展开(参数只能为字符串{数值拼接一个字符串会得到一个数组类型})-->
					<el-submenu
						:index="item.id + ''"
						v-for="item in menulist"
						:key="item.id"
					>
						<!-- 一级菜单的模板区域 -->
						<template slot="title">
							<!-- 图标 -->
							<i :class="iconsobj[item.id]"></i>
							<!-- 文本 -->
							<span>{{ item.authName }}</span>
						</template>
						<!-- 二级菜单 -->
						<el-menu-item
							:index="'/' + subitem.path"
							v-for="subitem in item.children"
							:key="subitem.id"
						>
							<!-- 二级菜单的模板区域 -->
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>{{ subitem.authName }}</span>
							</template>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
				<!-- 右侧内容主体 -->
				<div class="background">
					<el-main>
						<!-- 放置子路由的路由占位符 -->
						<router-view></router-view>
					</el-main>
				</div>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
	name: "Home",
	data() {
		return {
			fullscreen: false,
			// 使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
			router: true,
			// 关闭折叠动画,以便提高流畅度
			collapse_transition: false,
			// 是否水平折叠收起菜单
			isCollapse: false,
			// 只保持一个子菜单的展开
			unique_opened: true,
			// 左侧菜单数据
			menulist: [],
			// 自定义图标库
			iconsobj: {
				// 一级菜单数据的id来定位
				"125": "iconfont icon-users",
				"103": "iconfont icon-tijikongjian",
				"101": "iconfont icon-shangpin",
				"102": "iconfont icon-danju",
				"145": "iconfont icon-baobiao",
			},
		};
	},
	created() {
		this.getMenuList();
	},
	computed: {
		username() {
			let username = window.sessionStorage.getItem("ms_username");
			return username ? username : this.name;
		},
		...mapGetters("dailog", {
			isShow: "isShow",
		}),
	},
	methods: {
		// 用户名下拉菜单选择事件
		handleCommand(command) {
			if (command == "loginout") {
				window.sessionStorage.removeItem("ms_username");
				window.sessionStorage.clear();
				this.$router.push("/login");
			} else if (command == "user") {
				this.$store.dispatch("dailog/showDailog");
			}
		},
		...mapActions("dailog", ["hideDailog", "showDailog"]),

		// 全屏显示
		handleFullScreen() {
			let element = document.documentElement;
			if (this.fullscreen) {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
			} else {
				if (element.requestFullscreen) {
					element.requestFullscreen();
				} else if (element.webkitRequestFullScreen) {
					element.webkitRequestFullScreen();
				} else if (element.mozRequestFullScreen) {
					element.mozRequestFullScreen();
				} else if (element.msRequestFullscreen) {
					// IE11
					element.msRequestFullscreen();
				}
			}
			this.fullscreen = !this.fullscreen;
		},
		// 获取所有菜单.get请求的返回数据是一个promise所以需要添加async
		async getMenuList() {
			const { data: res } = await this.$http.get("getmenulist");
			if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
			this.menulist = res.data;
			// console.log(this.menulist);
		},
		toggleCollapse() {
			this.isCollapse = !this.isCollapse;
		},
	},
};
</script>

<style lang="less" scoped>
.user-avator {
	// margin-left: 20px;
	transform: translate(550px);
}
.user-name {
	transform: translate(0px,10px);
}
.el-dropdown-link {
	color: #fff;
	cursor: pointer;
}
.el-dropdown-menu__item {
	text-align: center;
}

// 全屏显示
.btn-fullscreen {
	color: #fff;
	position: relative;
	width: 50px;
	height: 50px;
	text-align: center;
	border-radius: 15px;
	cursor: pointer;
	transform: translate(1100px);
}
// 每一个elementui的组件名称可以直接当作类名
.el-container {
	height: 100%;
}
.el-header {
	background-color: #373d3f;
	display: flex;
	justify-content: space-between;
	padding: 0%;
	align-items: center;

	> div {
		display: flex;
		align-items: center;
		> img {
			width: 60px;
			height: 60px;
		}
	}

	span {
		color: #fff;
		font-size: 20px;
		margin-left: 15px;
	}
	.avator_img {
		// display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
}

.el-aside {
	background-color: #333744;

	.el-menu {
		// 去除展开的边框线,默认是为1px
		border-right: none;
	}
}

.el-main {
	background: url(https://cdn.jsdelivr.net/gh/Richard-LiSR/PicBed/bg_img/humberto-portillo-Dr_UunrLl6c-unsplash.jpg)
		no-repeat;
	background-position: center;
	height: 100%;
	width: 100%;
	background-size: cover;
	position: fixed;
}

.iconfont {
	margin-right: 10px;
}

.toggle-button {
	background-color: #4a5064;
	font-size: 10px;
	// 添加行高
	line-height: 24px;
	color: #fff;
	text-align: center;
	// 加间距
	letter-spacing: 0.5em;
	// 鼠标触摸时变成小手样式
	cursor: pointer;
}
</style>
