<template>
    <div id="personal">
        <div class="info-box">
            <div class="avator">
                <img src="../../assets/gjbwg.png" alt="">
            </div>
            <div class="info">
                <p class="row">
                    <span>{{studentInfo.student_id}}&nbsp;</span>
                    <span>{{studentInfo.student_name}}&nbsp;</span>
                    <span>{{studentInfo.student_gender ? '男' : '女'}}</span>
                </p>
                <p class="row">{{studentInfo.student_class_id}}</p>
            </div>
        </div>

        <div class="operate-box">
            <div class="operate" @click="showPwdDialog=true">修改密码</div>
            <div class="operate" @click="showLogoutDialog=true">退出登录</div>
        </div>

        <my-dialog v-show="showPwdDialog" title="修改密码"> 
            <div class="form-block">
                <label for="oldPwd" class="dialog-label">原密码</label>
                <input type="password" id="oldPwd" v-model="pwdInfo.old_pwd">
            </div>
            <div class="form-block">
                <label for="newPwd" class="dialog-label">新密码</label>
                <input type="password" id="newPwd" v-model="pwdInfo.new_pwd">
            </div>
            <div class="form-block">
                <label for="cfrmNewPwd" class="dialog-label">确认密码</label>
                <input type="password" id="cfrmNewPwd" v-model="pwdInfo.cfrm_pwd">
            </div>
            <div class="form-block">
                <button class="btn" @click="closePwdDialog">取消</button>
                <button class="btn" @click="modifyPwd">确认</button>
            </div>
        </my-dialog>

        <my-dialog v-show="showLogoutDialog" title="确认退出登录">
            <div class="form-block">
                <button class="btn" @click="closeLogoutDialog">取消</button>
                <button class="btn" @click="logout">确认</button>
            </div>
        </my-dialog>

    </div>
</template>


<script>
import config from '../../config/config.js'
import Utils from '../../utils/util.js'
import MyDialog from '../../components/MyDialog.vue'
export default {
    name: "personal",

    data() {
        return {
            studentInfo: {},
            pwdInfo:{
                old_pwd: '',
                new_pwd: '',
                cfrm_pwd: ''
            },
            showPwdDialog: false,
            showLogoutDialog: false
        }
    },
    methods: {
        //查询信息
        queryStudentInfo(student_id){
            this.$http.get(`${config.apiAddr}/student/queryStudentInfo?student_id=${student_id}`)
            .then(res => {
                console.log(res)
                if(res.data.success){
                    this.studentInfo = res.data.student_info
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        //修改密码
        modifyPwd(){
            let str = this.checkForm()
            if(str === ''){
                this.$http.post(`${config.apiAddr}/student/modifyPwd`, {
                    student_id: this.studentInfo.student_id,
                    old_pwd: this.pwdInfo.old_pwd,
                    new_pwd: this.pwdInfo.new_pwd
                })
                .then(res => {
                    if(res.data.success){
                        if(res.data.auth){
                            this.showToast(1000, '修改成功')
                            this.closePwdDialog()
                        }else{
                            this.showToast(1000, res.data.auth_msg)
                            this.pwdInfo.old_pwd = ''
                            this.pwdInfo.new_pwd = ''
                            this.pwdInfo.cfrm_pwd = ''
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                this.showToast(1000, str)
            }
        },
        //退出登录
        logout(){
            Utils.storage.remove('userInfo')
            this.$router.replace({path: '/login'})
        },
        showToast(time, msg){
            const toast = this.$createToast({
                time,
                txt: msg,
                type: 'txt',
                zIndex: 2000
            })
            toast.show()
        },
        //检查表单
        checkForm(){
            let str = ''
            if(!this.pwdInfo.old_pwd || !this.pwdInfo.new_pwd || !this.pwdInfo.cfrm_pwd){
                str = '填写不完整'
            }else if(this.pwdInfo.new_pwd !== this.pwdInfo.cfrm_pwd){
                str = '密码和确认密码不相同'
            }
            return str
        },
        closePwdDialog(){
            this.showPwdDialog = false
        },
        closeLogoutDialog(){
            this.showLogoutDialog = false
        }
    },
    mounted() {
        this.queryStudentInfo(Utils.storage.get('userInfo'))
    },
    components: {
        MyDialog
    }
}
</script>


<style lang="scss" scoped>
#personal{
    @mixin box{
        width: 8.5rem;
        margin: 1rem auto;
        border: 1px solid #cdcdcd;
        border-radius: .5rem;
        padding: .4rem 0;
    }
    .info-box{
        @include box;
        display: flex;
        align-items: center;
        .avator{
            width: 1.5rem;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 .5rem;
            img{
                width: 1.5rem;
                height: 1.5rem;
                vertical-align: middle;
            }
        }
        .info{
            .row{
                color: #909399;
                margin: .1rem
            }
        }
    }
    .operate-box{
        @include box;
        padding: 0 .2rem .3rem;
        box-sizing: border-box;
        .operate{
            color: #909399;
            font-size: .3rem;
            border-bottom: .01rem solid;
            text-align: left;
            padding: .4rem .3rem .2rem;
        }
    }
    .form-block{
        color: #909399;
        margin: .3rem 0 .3rem;
        text-align: left;
        display: flex;
        justify-content: center;
        .dialog-label{
            padding: .1rem;
            text-align: left;
            flex: 1;
        }
        input{
            height: .5rem;
            padding: .05rem .1rem;
            border: .01rem solid #cdcdcd;
            flex: 3.5;
            border-radius: .3rem;
            &:focus{
                border: .01rem solid #0ff;
                border-radius: .3rem;
            }
        }
        
    }
    .btn{
        width: 2rem;
        height: .7rem;
        background: #009789;
        border: 1px;
        border-radius: .1rem;
        box-shadow: .02rem .02rem .05rem .02rem;
        color: #fff;
        font-size: .25rem;
        padding: .05rem .1rem;
        margin: .2rem .3rem .2rem 0;
        &:active{
            background: #02b19f;
        }
                
    }
    
}

</style>