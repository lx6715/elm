<template>
<<<<<<< HEAD
    <page-view class="flex-column">
        <title-bar :show-back="true" @back="$router.back()">登录</title-bar>
        <div class="content-box flex-1">
            <div class="login-box">
                <div class="login-item flex-row">
                    <div class="left flex-row j-c a-c">
                        <span class="iconfont iconyonghuming"></span>
                    </div>
                    <div class="right">
                        <input type="text" placeholder="请输入用户名" class="txt" v-model="loginForm.zh">
                        <!-- 我们会在这里制作表单错误信息提示 -->
                        <div v-if="errors['loginForm.zh']">{{ errors["loginForm.zh"] }}</div>
                    </div>
                </div>
                <div class="login-item flex-row">
                    <div class="left flex-row j-c a-c">
                        <span class="iconfont iconmima"></span>
                    </div>
                    <div class="right">
                        <input type="password" placeholder="请输入密码" class="txt" v-model="loginForm.password">
                        <!-- 我们会在这里制作表单错误信息提示 -->
                        <div v-if="errors['loginForm.password']">{{ errors["loginForm.password"] }}</div>
                    </div>
                </div>
                <div class="login-item flex-row a-c j-s-b">
                    <label>
                        <input type="checkbox" style="margin-right:.05rem" >记住密码
                    </label>
                    <a class="register-link" href="javascript:void(0)">我要注册</a>
                </div>
                <button type="button" class="btn-login bg-primary" @click="checkLogin">登录</button>
            </div>
        </div>
    </page-view>
</template>

<script>
import Api from '../utils/Api'
import {mapActions} from 'vuex'
export default {
    name:'login',
    data(){
        return {
            loginForm:{
                zh:"",
                password:""
            }

        }
    },
    vuerify:{
        "loginForm.zh":{
            test:/.+/,
            message:"账号不能为空"
        },
        "loginForm.password":{
            test:/.+/, //表示不能为空，跟required是一样的，但是这样写有个好处可以自定义错误信息
            message:"密码不能为空"
        }
    },
    methods:{
        ...mapActions(["setUserInfo","set_softeem_ele_client_token"]),
       async checkLogin(){
            if(this.$vuerify.check()){
                let results = await Api.userInfo.checkLogin(this.loginForm);
                this.setUserInfo(results.loginUserInfo);
                this.set_softeem_ele_client_token(results.token);
                console.log(results);
                this.$router.back();
            }
        }
    },
    computed:{
        errors(){
            return this.$vuerify.$errors;
        }
    }
}

</script>

<style lang="scss" scoped>
    .login-box{
        border:solid 1px #ececec;
        width:3rem;
        margin:.5rem auto;
        padding:.1rem;
        .login-item{
            padding:.1rem;
            border-bottom:solid 1px #ececec;
            .left{
                width:.5rem;
                .iconfont{
                    font-size:.22rem;
                }
            }
            .right{
                .txt{
                    border:none;
                    outline:none;
                    height:.4rem;
                    font-size:.16rem;
                }
            }
        }
        .btn-login{
            border:none;
            height:.4rem;
            width:100%;
            color:#fff;
            font-size:.18rem;
            border-radius:.06rem;
        }
    }
=======
	<page-view class="flex-column">
		<title-bar :show-back="true" @back="$router.back()">登录</title-bar>
		<div class="content-box flex-1">
			<div class="login-box">
				<div class="login-item flex-row">
					<div class="left flex-row j-c a-c">
						<span class="iconfont iconyonghuming"></span>
					</div>
					<div class="right">
						<input type="text" placeholder="请输入用户名" class="txt" v-model="loginForm.zh" />
						<!-- 我们会在这里制作表单错误信息提示 -->
						<div v-if="errors['loginForm.zh']">{{ errors["loginForm.zh"] }}</div>
					</div>
				</div>
				<div class="login-item flex-row">
					<div class="left flex-row j-c a-c">
						<span class="iconfont iconmima"></span>
					</div>
					<div class="right">
						<input type="password" placeholder="请输入密码" class="txt" v-model="loginForm.password" />
						<!-- 我们会在这里制作表单错误信息提示 -->
						<div v-if="errors['loginForm.password']">{{ errors["loginForm.password"] }}</div>
					</div>
				</div>
				<div class="login-item flex-row a-c j-s-b">
					<label> <input type="checkbox" style="margin-right: 0.05rem" />记住密码 </label>
					<a class="register-link" href="javascript:void(0)">我要注册</a>
				</div>
				<button type="button" class="btn-login bg-primary" @click="checkLogin">登录</button>
			</div>
		</div>
	</page-view>
</template>

<script>
import API from "../utils/api";
import { mapActions } from "vuex";
export default {
	name: "login",
	data() {
		return {
			loginForm: {
				zh: "",
				password: ""
			}
		};
	},
	vuerify: {
		"loginForm.zh": {
			test: /.+/,
			message: "账号不能为空"
		},
		"loginForm.password": {
			test: /.+/, //表示不能为空，跟required是一样的，但是这样写有个好处可以自定义错误信息
			message: "密码不能为空"
		}
	},
	methods: {
		...mapActions(["setUserInfo", "set_softeem_ele_client_token"]),
		async checkLogin() {
			if (this.$vuerify.check()) {
				let results = await API.userInfo.checkLogin(this.loginForm);
				this.setUserInfo(results.loginUserInfo);
				this.set_softeem_ele_client_token(results.token);
				this.$router.back();
			}
		}
	},
	computed: {
		errors() {
			return this.$vuerify.$errors;
		}
	}
};
</script>

<style lang="scss" scoped>
.login-box {
	border: solid 1px #ececec;
	width: 3rem;
	margin: 0.5rem auto;
	padding: 0.1rem;

	.login-item {
		padding: 0.1rem;
		border-bottom: solid 1px #ececec;

		.left {
			width: 0.5rem;

			.iconfont {
				font-size: 0.22rem;
			}
		}

		.right {
			.txt {
				border: none;
				outline: none;
				height: 0.4rem;
				font-size: 0.16rem;
			}
		}
	}

	.btn-login {
		border: none;
		height: 0.4rem;
		width: 100%;
		color: #fff;
		font-size: 0.18rem;
		border-radius: 0.06rem;
	}
}
>>>>>>> 6ee3c0a8570d7d7438e71b510b4b18d7d2c00cc6
</style>
