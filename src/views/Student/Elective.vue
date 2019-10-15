<template>
    <div id="elective">

        <table class="table">
                <tr class="table-head">
                    <th class="table-head-data">课号</th>
                    <th class="table-head-data">课名</th>
                    <th class="table-head-data">代课教师</th>
                    <th class="table-head-data">人数</th>
                    <th class="table-head-data">操作</th>
                </tr>
                <tr class="table-row" v-for="(item, index) in subject_list" :key="index">
                    <td class="table-data">{{item.subject_id}}</td>
                    <td class="table-data">{{item.subject_name}}</td>
                    <td class="table-data">{{item.teacher_name}}</td>
                    <td class="table-data">{{item.subject_current}}/{{item.subject_max}}</td>
                    <td class="table-data"><button class="choose" @click="elective(item.subject_id, item.teacher_id)">选修</button></td>
                </tr>
        </table>
    </div>
</template>


<script>
import config from '../../config/config.js'
import Utils from '../../utils/util.js'
export default {
    name: "elective",

    data() {
        return {
            subject_list: []
        }
    },
    methods: {
        //查询课程列表
        querySubject(){
            this.$http.get(`${config.apiAddr}/student/querySubject`)
            .then(res => {
                // console.log(res)
                if(res.data.success){
                    this.subject_list = res.data.subject_list
                }
            })
        },
        //选修某门课程
        elective(subject_id, teacher_id){
            let user_id = Utils.storage.get('userInfo')
            console.log(user_id, subject_id, teacher_id)
            this.$http.post(`${config.apiAddr}/student/elective`, {
                elective_student_id: user_id,
                elective_subject_id: subject_id,
                elective_teacher_id: teacher_id
            })
            .then(res => {
                console.log(res)
                if(res.data.success){
                    this.querySubject()
                }else{
                    this.showToast(1000, '您已选择该课程')
                }
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
    },
    mounted() {
        this.querySubject()
    },
}
</script>


<style lang="scss" scoped>
#elective{
    .table{
        width: 7rem;
        margin: .5rem auto;
        font-size: .35rem;
        color: #909399;
        .table-head{
            .table-head-data{
                color: #303133;
            }
        }
        .table-row{
            .table-data{
                padding: .3rem 0 0 0;
            }
        }
    }
    
}

</style>