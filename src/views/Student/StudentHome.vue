<template>
    <div id="student-home">
        <div class="page-head">{{headContent}}</div>


        <keep-alive>
            <router-view></router-view>
        </keep-alive>

        <div class="tabbar">
            <cube-tab-bar
            v-model="selectedLabelDefault"
            :data="tabs"
            @click="clickHandler">
        </cube-tab-bar>
        </div>
         
    </div>
</template>


<script>
export default {
    name: "student-home",
    data() {
        return {
            headContent: '查看课程',
            selectedLabelDefault: '课程',
            tabs: [{
                label: '课程',
                icon: 'iconfont icon-kecheng'
            }, {
                label: '成绩',
                icon: 'iconfont icon-chengji'
            }, {
                label: '我的',
                icon: 'cubeic-person'
            }]
        }
    },
    methods: {
        clickHandler (label) {
            // if you clicked home tab, then print 'Home'
            console.log(label)
            if(label === '课程'){
                this.headContent = '查看课程'
                this.$router.push({path: '/student/elective'})
            }else if(label === '成绩'){
                this.headContent = '查看成绩'
                this.$router.push({path: '/student/grade'})
            }else{
                this.headContent = '个人中心'
                this.$router.push({path: '/student/personal'})
            }
        },
    }
}
</script>


<style lang="scss" scoped>
#student-home{
    width: 100%;
    .page-head{
        width: 100%;
        background: #FC9153;
        color: #fff;
        height: 1rem;
        line-height: 1rem;
        font-size: .4rem;
        text-align: left;
        box-sizing: border-box;
        padding: 0 0 0 .5rem;
    }
    .tabbar{
        width: 100%;
        font-size: 12px;
        position: fixed;
        bottom: 0;
        left: 0;
    }
}
</style>