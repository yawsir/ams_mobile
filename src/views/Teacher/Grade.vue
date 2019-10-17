<template>
    <div id="grade">
        <div class="table-wrap">
            <table class="table">
                <tr class="table-head">
                    <th class="table-head-data">学号</th>
                    <th class="table-head-data">姓名</th>
                    <th class="table-head-data">成绩</th>
                    <th class="table-head-data">操作</th>
                </tr>
                <tr class="table-row" v-for="(item, index) in grade_list" :key="index">
                    <td class="table-data">{{item.student_id}}</td>
                    <td class="table-data">{{item.student_name}}</td>
                    <td class="table-data">{{item.grade?item.grade:'未登录'}}</td>
                    <td class="table-data"><button class="choose" @click="clickModifyBtn(item.student_id)">修改成绩</button></td>
                </tr>
            </table>

        </div>
        <my-dialog title="修改学生成绩" v-show="showModifyDialog">
            <div class="form-block">
                <label for="student_id" class="dialog-label">学号</label>
                <input type="number" id="student_id" :value="currentStudentId" disabled>
            </div>
            <div class="form-block">
                <label for="grade" class="dialog-label">成绩</label>
                <input type="number" id="grade" v-model="inputGrade">
            </div>
            <div class="form-block">
                <button class="btn" @click="closeModifyDialog">取消</button>
                <button class="btn" @click="modifyStudentGrade">确认</button>
            </div>
        </my-dialog>
    </div>
</template>


<script>
import config from '../../config/config.js'
import Utils from '../../utils/util.js'
import MyDialog from '../../components/MyDialog.vue'
export default {
    name: "grade",

    data() {
        return {
            showModifyDialog: false,
            grade_list: [],
            inputGrade: '',
            currentStudentId: '',
            teacher_id: ''
        }
    },
    methods: {
        //查询学生成绩
        queryStudentsGrade(teacher_id){
            this.$http.get(`${config.apiAddr}/teacher/queryStudentsGrade?teacher_id=${teacher_id}`)
            .then(res => {
                if(res.data.success){
                    this.grade_list = res.data.grade_list
                }else{

                }
            })
        },
        //修改学生成绩
        modifyStudentGrade(){
            this.$http.post(`${config.apiAddr}/teacher/modifyStudentGrade`,{
                teacher_id: this.teacher_id,
                student_id: this.currentStudentId,
                new_grade: this.inputGrade
            }).then(res => {
                console.log(res)
                if(res.data.success){
                    this.showToast(1000, '修改成功')
                    this.queryStudentsGrade(this.teacher_id)
                    this.closeModifyDialog()
                }else{
                    this.showToast(1000, '修改失败')
                    this.closeModifyDialog()
                }
            }).catch(err => {
                console.log(err)
            })
        },

        //点击表格中的修改按钮
        clickModifyBtn(studentId){
            this.showModifyDialog = true
            this.currentStudentId = studentId
        },

        closeModifyDialog(){
            this.showModifyDialog = false
        },
        showToast(time, msg){
            const toast = this.$createToast({
                time,
                txt: msg,
                type: 'txt',
                zIndex: 2000
            })
            toast.show()
        }
    },
    mounted() {
        this.teacher_id = Utils.storage.get('userInfo')
        this.queryStudentsGrade(this.teacher_id)
    },
    components: {
        MyDialog
    }
}
</script>


<style lang="scss" scoped>
#grade{
    .table-wrap{
        .table{
            width: 95%;
            margin: .5rem auto;
            font-size: .35rem;
            color: #909399;
            .table-head{
                .table-head-data{
                    color: #303133;
                    border  : 1px solid #cdcdcd;
                    padding: .1rem;
                }
            }
            .table-row{
                .table-data{
                    padding: .3rem 0 .3rem 0;
                    border  : 1px solid #cdcdcd;                
                    .choose{
                        background: #009789;
                        border: 1px;
                        border-radius: .1rem;
                        box-shadow: .02rem .02rem .05rem .02rem;
                        color: #fff;
                        font-size: .25rem;
                        padding: .05rem .1rem;
                        &:active{
                            background: #02b19f;
                        }
                    }
                }
            }
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
            text-align: center;
            flex: 1;
        }
        input{
            height: .5rem;
            padding: .05rem .1rem;
            border: .01rem solid #cdcdcd;
            flex: 5;
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