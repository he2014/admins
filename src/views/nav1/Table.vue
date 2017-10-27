<template>
	<section  >
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<div>
						 查询方式
					</div>
				</el-form-item>
				<el-form-item>
						<el-select v-model="value" placeholder="请选择" @change="valueChange" >
		 					<el-option
								 v-for="item in options"
								 :key="item.value"
								 :label="item.label"
								 :value="item.list">
		 				 </el-option>
	 			 		</el-select>

				</el-form-item>
				<el-form-item>
					<!-- 二级选项 -->
					   <el-input v-model="input" v-show="bool&&value.length===1" id="input"></el-input>
						 <el-select v-show="bool&&value.length>1&&value[0]==='推荐'" v-model="value2"  >
 		 					<el-option
 								 v-for="item in value"
 								 :key="item"
 								 :label="item"
 								 :value="item">
 		 				 </el-option>
 	 			 		</el-select>
						<el-select v-show="bool&&value.length>1&&value[0]==='直播推荐'" v-model="value3"  >
						 <el-option
								v-for="item in value"
								:key="item"
								:label="item"
								:value="item">
						</el-option>
					 </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
				<el-form-item>
				<template>
				  <FileUpload > SJAN</FileUpload>
				</template>
			</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->

		<el-table @cell-click="cellChange" :data="users" border v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55" >
			</el-table-column>
			<el-table-column  prop="userId" label="用户ID" idth="60" >
			</el-table-column>
			<el-table-column class="labelImg" prop="" label="头像" width="80"  >
				<template scope="scope">
					<img :src="scope.row.pic" alt="" />
				</template>

			</el-table-column>
			<el-table-column prop="name" label="昵称" width="100" >
			</el-table-column>
			<el-table-column prop="derection" label="身份" width="80" >
			</el-table-column>
			<el-table-column prop="size" label="注册方式" width="120" >
			</el-table-column>
			<el-table-column  prop=""  label="状态" min-width="150" >
				<template scope="scope">
					<el-select @change="tableChange" v-model="scope.row.value" placeholder="请选择" value-key="scope.row.name">
					    <el-option
					      v-for="item in visible"
					      :key="scope.row.name"
								:label="item"
					      :value="item"
					      >
					    </el-option>
  				</el-select>
				</template>

			</el-table-column>
			<el-table-column prop="time" label="注册时间" min-width="180" >
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button class="button" size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
					<el-button  size="mini" @click="handleDel(scope.$index, scope.row)">银行信息</el-button>
					<el-button  size="mini" @click="handleDel(scope.$index, scope.row)">结算信息</el-button>
				</template>
			</el-table-column>
		</el-table>



		<!--工具条-->
		<el-col :span="24" class="toolbar">

			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog size="small" title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog  custom-class="addForm" title="注册用户" size="" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="200" :rules="addFormRules" ref="addForm">
				<el-form-item label="账号" prop="name">
					<el-input size="small"  placeholder="请输入账号"   v-model="addForm.name" auto-complete="off"  ></el-input>
				</el-form-item>
				<el-form-item label="昵称" prop="nk">
					<el-input size="small" v-model="addForm.nk"  placeholder="请输入昵称"  ></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pawd">
					<el-input size="small" type="password" placeholder="请输入密码" v-model="addForm.pawd"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-select size="small" v-model="addForm.sex" placeholder="请选择">
								<el-option
								v-for="item in sexType"
								:key="item"
								:label="item"
								:value="item">
							</el-option>
						</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">注册</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
import {freshScrollbar} from"@/common/js/public"
	//import NProgress from 'nprogress'
	import { getTablOptions,getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
 import FileUpload  from "vue-upload-component";
	export default {
		data() {
			return {
				scrollbar:1,
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入邮箱', trigger: 'blur' }
					]
				},
				// 详情
				editForm: {
					name: '',
					nk: "",
					paw: '',
					sex: -1,

				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				sexType:["男","女"],
				addFormRules: {
					name: [
						{ required: true, message: '请输入邮箱', trigger: 'blur' },
						{
							pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
							message:"邮箱格式不正确"
						}
					],
					nk:[{ required: true, message: '请输入昵称', trigger: 'blur' }],
					pawd:[{ required: true, message: '请输入密码', trigger: 'blur' },
							{
								pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/,
								message:"密码由6-21字母和数字组成，不能是纯数字或纯英文"
							}
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					nk: "",
					pawd: "",
					sex: '女'
				},
				bool:false,
				input:"",
				options:[],
				value:"全部",
				value2:"推荐",
				value3:"直播推荐",
				visible:["启用","禁用","永久禁用"],
				rowUserId:"",//表格行的用户ID

			}
		},
		components: {
		  FileUpload
		},

		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				//return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
          let data = res.data.users;
					data.forEach((val,index)=>{//状态默认值
						data[index].value=val.bool===1?"启用":val.bool===2?"禁用":"永久禁用";
					})
					//console.log(data)
					this.users = data;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				console.log(index)
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
        this.scrollbar +=1;
				//	console.log()

				// this.addForm = {
				// 	name: '',
				// 	sex: -1,
				// 	age: 0,
				// 	birth: '',
				// 	addr: ''
				// };
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						let userMessage = JSON.parse(JSON.stringify(this.addForm));
						console.log(userMessage)
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();

							//console.log(JSON.stringify(userMessage))

							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;

								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			valueChange(e){
				// console.log(this.value)
				if(this.value.length>0){
					if(this.value.length===1)
					  this.$nextTick(()=>{
							this.$el.querySelector("#input>input").setAttribute("placeholder",this.value[0]);
						})
					  this.bool =true;
						//console.log(e)
				}else {
					this.bool = false;
				}
			},
			tableChange(e){
				//向后台提交数据；更改用户状态
				let state = e==="启用"?1:e==="禁用"?2:3;
				this.$message({
					message: '更新用户状态成功',
					type: 'success',
					duration:800,
					customClass:"tableChange"
				});
				console.log(this.rowUserId )

				//console.log(e)
			},
			cellChange(row, column, cell, event){
				//	console.log(row);
        this.rowUserId = row.userId;
			}

		},
		mounted() {
			getTablOptions().then(res=>{
				this.options = res['data']['data'];
			})

			this.getUsers();
		},
		watch:{
			addFormVisible(){
				this.$nextTick(()=>{
					freshScrollbar(this.addFormVisible,document.getElementById('content-container'))
				})
			},
			editFormVisible(){
				this.$nextTick(()=>{

					
					freshScrollbar(this.editFormVisible,document.getElementById('content-container'))
				})
			}
		}
	}

</script>

<style scoped>
 img{
 	display: flex;
	margin: 5px 0;
 }
.addForm,.el-dialog--tinyii{
	width: 400px !important;
}
.el-button+.el-button,.button{
	margin-left: 0 ;
	background-color: #46b0cf;
	border-color: #34a6c8;
	color: #fff;
}

</style>
