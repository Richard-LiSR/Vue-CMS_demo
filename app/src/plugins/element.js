/*
 * @Author: Li shirun 
 * @Date: 2021-10-16 19:22:43 
 * @Last Modified by: Li shirun
 * @Last Modified time: 2021-10-31 15:13:50
 */
import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Container, Header, Main, Footer, Aside, Submenu, Menu, MenuItem,
  Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Dialog, Switch, Tooltip, Pagination, MessageBox, Dropdown,DropdownItem,DropdownMenu
} from 'element-ui'
//导入弹窗提示组件,这个组件需要全局挂载
import { Message } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Submenu)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);

//全局挂载到Vue的原型对象中
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$confirm = MessageBox.
