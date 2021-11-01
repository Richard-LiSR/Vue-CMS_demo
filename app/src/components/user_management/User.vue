<!--
 * @Author: Li shirun
 * @Date: 2021-10-16 19:04:38
 * @Last Modified by:   Li shirun
 * @Last Modified time: 2021-10-16 19:04:38
-->
<template>
	<div>
		<!-- 面包屑组件 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片试图区域 -->
		<el-card class="box-card">
			<!-- 使用layot布局,分别添加搜索输入框,和搜索按钮 -->
			<el-row :gutter="40">
				<!-- 添加搜索输入框 -->
				<el-col :span="7">
					<el-input
						placeholder="请输入内容"
						v-model="queryInfo.query"
						class="input-with-select"
						@clear="findSpUserList"
						clearable
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="findSpUserList"
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<!-- 添加"用户添加"按钮 -->
					<el-button type="primary" round @click="addDialogVisible = true"
						>添加用户</el-button
					>
				</el-col>
			</el-row>
			<!-- 用户列表区域 -->
			<el-table :data="userlist" border stripe>
				<el-table-column type="index"></el-table-column>
				<el-table-column label="用户ID" prop="id"></el-table-column>
				<el-table-column label="姓名" prop="username"></el-table-column>
				<el-table-column label="邮箱" prop="email"></el-table-column>
				<el-table-column label="电话" prop="mobile"></el-table-column>
				<el-table-column label="角色" prop="role_name"></el-table-column>
				<el-table-column label="状态" prop="mg_state">
					<template v-slot="scope">
						<el-switch
							v-model="scope.row.mg_state"
							active-color="#13ce66"
							@change="userStateChanged(scope.row)"
						>
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180px">
					<template v-slot="scope">
						<!-- {{scope.row}} -->
						<!-- 修改按钮 -->
						<el-button
							type="primary"
							icon="el-icon-edit"
							size="mini"
							@click="showEditDialog(scope.row.id)"
						></el-button>
						<!-- 删除按钮 -->
						<el-button
							type="danger"
							icon="el-icon-delete"
							size="mini"
							@click="removeUserById(scope.row.id)"
						>
						</el-button>
						<!-- 分配角色按钮 -->
						<el-tooltip
							effect="dark"
							content="分配角色"
							placement="top"
							:enterable="false"
						>
							<el-button
								type="warning"
								icon="el-icon-setting"
								size="mini"
							></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页区域 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryInfo.pagenum"
				:page-sizes="[1, 2, 5, 10]"
				:page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				>+
			</el-pagination>
		</el-card>

		<!-- 添加弹窗对话框(添加用户) -->
		<el-dialog
			title="添加用户"
			:visible.sync="addDialogVisible"
			width="30%"
			@close="addDialogClosed"
			append-to-body
		>
			<!-- 弹窗对话框的内容表单区域 (添加表单数据)-->
			<el-form
				ref="addFormRef"
				status-icon
				:model="addForm"
				:rules="addFormRules"
				label-width="70px"
			>
				<el-form-item label="用户id" prop="id">
					<el-input v-model="addForm.id"></el-input>
				</el-form-item>
				<el-form-item label="用户名" prop="username">
					<el-input v-model="addForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="addForm.password"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="addForm.email"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="mobile">
					<el-input v-model="addForm.mobile"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域(按钮区域) -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUser">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 修改用户对话框 -->
		<el-dialog
			title="提示"
			:visible.sync="editdialogVisible"
			width="50%"
			append-to-body
		>
			<el-form
				ref="editFormRef"
				:model="editForm"
				label-width="80px"
				:rules="editFormRules"
			>
				<el-form-item label="用户名">
					<el-input v-model="editForm.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="editForm.email"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="mobile">
					<el-input v-model="editForm.mobile"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="editdialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editUserInfo">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: "Users",
	data() {
		// 验证邮箱的规则
		var checkEmail = (rule, value, cb) => {
			// 验证邮箱的正则表达式
			const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

			if (regEmail.test(value)) {
				// 合法的邮箱
				return cb();
			}

			cb(new Error("请输入合法的邮箱"));
		};

		// 验证手机号的规则
		var checkMobile = (rule, value, cb) => {
			// 验证手机号的正则表达式
			const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

			if (regMobile.test(value)) {
				return cb();
			}

			cb(new Error("请输入合法的手机号"));
		};

		return {
			// 获取用户列表的参数对象
			queryInfo: {
				// 查询参数
				query: "",
				// 当前显示的页数
				pagenum: 1,
				// 当前每页显示多少条数据
				pagesize: 5,
			},
			mg_state: "",
			userlist: [],
			total: 0,
			// 控制弹窗对话框的显示与隐藏(添加用户)
			addDialogVisible: false,
			// 控制修改弹窗对话框的显示与隐藏
			editdialogVisible: false,
			// 修改用户的表单数据
			editForm: {},
			// 修改用户的验证规则对象
			editFormRules: {
				email: [
					{
						required: true, //代表必填项
						message: "请输入邮箱",
						trigger: "blur", //表示鼠标失去焦点后触发此规则
					},
					{
						validator: checkEmail,
						trigger: "blur",
					},
				],
				mobile: [
					{
						required: true, //代表必填项
						message: "请输入手机号",
						trigger: "blur", //表示鼠标失去焦点后触发此规则
					},
					{
						validator: checkMobile,
						trigger: "blur",
					},
				],
			},
			// 添加用户的表单数据
			addForm: {
				id: "",
				username: "",
				password: "",
				email: "",
				mobile: "",
			},
			//

			// 添加用户表单验证规则
			addFormRules: {
				id: [
					{
						required: true, //代表必填项
						message: "请输入用户名",
						trigger: "blur", //表示鼠标失去焦点后触发此规则
					},
					{
						min: 3,
						max: 3,
						message: "长度为3字符,一经创建无法更改",
						trigger: "blur", //表示鼠标失去焦点后触发此规则
					},
				],
				username: [
					{
						required: true, //代表必填项
						message: "请输入用户名",
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
						min: 5,
						max: 15,
						message: "长度在 5 到 15个字符",
						trigger: "blur", //表示鼠标失去焦点后触发此规则
					},
				],
				email: [
					{
						required: true, //代表必填项
						message: "请输入邮箱",
						trigger: "blur", //表示鼠标失去焦点后触发此规则
					},
					{
						validator: checkEmail,
						trigger: "blur",
					},
				],
				mobile: [
					{
						required: true, //代表必填项
						message: "请输入手机号",
						trigger: "blur", //表示鼠标失去焦点后触发此规则
					},
					{
						validator: checkMobile,
						trigger: "blur",
					},
				],
			},
		};
	},
	created() {
		this.findSpUserList();
	},
	methods: {
		addDialogClosed() {
			this.$refs.addFormRef.resetFields();
		},
		// 查找用户列表
		async findSpUserList() {
			const { data: res } = await this.$http.get(
				"findUserlist",
				this.queryInfo
			);
			console.log(res);
			// 在控制台中显示返回的参数
			if (res.meta.status !== 200) {
				return this.$message.error("获取用户列表失败");
			}
			this.$message.success("获取用户列表成功");
			this.userlist = res.data;
			// 将获取到的管理员列表对象转换成数组
			var arr = [];
			for (let i in res.data) {
				let o = {};
				o[i] = res.data[i];
				arr.push(o);
			}
			// console.log(arr.length);
			// 令total为其数组长度
			this.total = arr.length;
		},
		// 监听 pagesize 改变的事件
		handleSizeChange(newSize) {
			console.log(newSize);
			this.queryInfo.pagesize = newSize;
			this.findSpUserList();
		},
		// 监听 页码值 改变的事件
		handleCurrentChange(newPage) {
			console.log(newPage);
			this.queryInfo.pagenum = newPage;
			this.findSpUserList();
		},
		// 监听switch开关状态的改变
		async userStateChanged(userinfo) {
			const { data: res } = await this.$http.put(
				`getUserInfoState/${userinfo.id}/state/${userinfo.mg_state}`
			);
			if (res.meta.status !== 200) {
				userinfo.mg_state = !userinfo.mg_state;
				return this.$message.error("更新用户状态失败");
			}
			this.$message.success("更新用户状态成功");
			this.$store.commit("mg_state", {
				mg_state: userinfo.mg_state,
			});
			// console.log(userinfo.mg_state);
		},
		// 用户表单的预校验
		addUser() {
			this.$refs.addFormRef.validate(async (valid) => {
				console.log(valid);
				if (!valid) return;
				// 可以发起添加用户的网络请求
				const { data: res } = await this.$http.post(
					"saveuserlist",
					this.addForm
				);
				if (res.meta.status !== 201) {
					this.$message.error("添加用户失败！");
				}
				this.$message.success("添加管理员用户成功！");
				// 隐藏添加用户的对话框
				this.addDialogVisible = false;
				// 重新获取用户列表数据
				this.findSpUserList();
			});
		},
		// 展示编辑用户的对话框
		async showEditDialog(id) {
			const { data: res } = await this.$http.get("getSpuserlist/" + id);
			console.log(res);
			this.editForm = res.data;

			this.editdialogVisible = true;
			this.mg_state = res.data.mg_state;
		},
		// 显示提交修改用户信息的对话框
		editUserInfo() {
			this.$refs.editFormRef.validate(async (valid) => {
				// console.log(vaild);
				if (!valid) return;
				// 如果通过则发起用户信息修改的数据请求
				const { data: res } = await this.$http.put(
					"updateSpuserlist/" + this.editForm.id,
					{
						email: this.editForm.email,
						mobile: this.editForm.mobile,
					}
				);
				console.log(res);
				// 关闭更新好的对话框
				this.editdialogVisible = false;
				// 刷新数据列表
				this.findSpUserList();
				// 提示修改成功
				this.$message.success("更新用户信息成功");
			});
		},
		// 删除用户
		async removeUserById(id) {
			const confirmResult = await this.$confirm(
				"此操作将永久删除该文件, 是否继续?",
				"提示",
				{
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
					// 捕获用户的取消行为
				}
			).catch((err) => err);

			// 如果用户确认删除,则返回值为字符串 confirm
			// 如果用户取消删除,则返回字符串 cancel
			if (confirmResult !== "confirm") {
				return this.$message.info("已取消删除!");
			} else {
				const { data: res } = await this.$http.delete("getSpuserlist/" + id);
				console.log(res);
				if (res.meta.status !== 200) {
					return this.$message.error("删除用户信息失败");
				}
				// 刷新数据列表
				this.findSpUserList();
				// 提示删除成功
				this.$message.success("删除用户信息成功");
			}
		},
	},
};
</script>

<style lang="less" scoped>
.el-table {
	margin-top: 25px;
	font-size: 12px;
}

.box-card {
	width: 1600px;
	// height: 500px;
}
</style>
