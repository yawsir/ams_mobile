<template>
    <div id="grade">
        <div class="table-wrap">
            <table class="table">
                <tr class="table-head">
                    <th class="table-head-data">课号</th>
                    <th class="table-head-data">课名</th>
                    <th class="table-head-data">代课教师</th>
                    <th class="table-head-data">成绩</th>
                </tr>
                <tr class="table-row" v-for="(item, index) in grade_list" :key="index">
                    <td class="table-data">{{item.subject_id}}</td>
                    <td class="table-data">{{item.subject_name}}</td>
                    <td class="table-data">{{item.teacher_name}}</td>
                    <td class="table-data">{{item.subject_grade}}</td>
                </tr>
            </table>

        </div>
    </div>
</template>


<script>
import config from '../../config/config.js'
import Utils from '../../utils/util.js'
export default {
    name: "grade",

    data() {
        return {
            grade_list: []
        }
    },
    methods: {
        queryGrade(student_id){
            this.$http.get(`${config.apiAddr}/student/queryGrade?student_id=${student_id}`)
            .then(res => {
                console.log(res)
                if(res.data.success){
                    this.grade_list = res.data.grade_list
                }
            })
            .catch(err => {
                this.showToast(1000, '网络异常')
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
        this.queryGrade(Utils.storage.get('userInfo'))
    },
}
</script>


<style lang="scss" scoped>
#grade{
    height: 12rem;
    margin-bottom: 1rem;
    overflow-y: scroll;
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
    
}

</style>