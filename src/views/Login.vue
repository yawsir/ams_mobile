<template>
    <div id="login">
        <div class="logo-wrap">
            <img src="../assets/logo.png" alt="" class="logo">
        </div>

        <input type="text" placeholder="学号/教师号" v-model="loginInfo.user_id">
        <input type="password" placeholder="密码" v-model="loginInfo.user_pwd">
        <div class="role-radio">
            <input type="radio" name="role" id="student" value="1" v-model="loginInfo.user_role">
            <label for="student">学生</label>
            <input type="radio" name="role" id="teacher" value="2" v-model="loginInfo.user_role">
            <label for="teacher">教师</label>
        </div>
        <button class="login-btn" @click="doLogin">登录</button>
    </div>
</template>


<script>
import config from '../config/config.js'
import Utils from '../utils/util.js'
export default {
    name: "login",

    data() {
        return {
            loginInfo: {
                user_id: '',
                user_pwd: '',
                user_role: '1'
            }
        }
    },
    methods: {
        // teacherLogin(){
        //     this.$router.push({path: '/teacher'})
        // },
        // studentLogin(){
        //     this.$router.push({path: '/student'})
        // }
        doLogin(){
            this.$http.post(`${config.apiAddr}/login`,this.loginInfo)
            .then(res => {
                console.log(res)
                if(res.data.success && res.data.auth){//登录成功
                    Utils.storage.set('userInfo', this.loginInfo.user_id)
                    this.$router.push({path: this.loginInfo.user_role == 1 ? '/student' : '/teacher'})
                }else{
                    this.showToast(1000, res.data.auth_msg)
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        showToast(time, msg){
            const toast = this.$createToast({
                time,
                txt: msg,
                type: 'txt'
            })
            toast.show()
        }

    }
}
</script>


<style lang="scss" scoped>
#login{
    .logo-wrap{
        margin-top: 2rem;
        text-align: center;
        width: 100%;
        .logo{
            width: 2rem;
            height: 2rem;
        }
    }
    input[type=text], input[type=password]{
        width: 6rem;
        height: .6rem;
        border-bottom: 1px solid #cdcdcd;
        margin: .3rem auto;
    }
    .role-radio{
        label{
            margin: 0 .3rem 0 .1rem;
        }
    }
    .login-btn{
        width: 70%;
        height: .75rem;
        background: #009789;
        line-height: .75rem;
        margin: 1rem auto;
        border: 1px solid #cdcdcd;
        border-radius: .3rem;
        color: white;
        &:active{
            background: #02b19f;
        }
    }

}

</style>