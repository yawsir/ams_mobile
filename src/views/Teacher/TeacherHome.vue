<template>
    <div id="teacher-home">
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
    name: "teacher-home",

    data() {
        return {
            selectedLabelDefault: '成绩',
            tabs: [{
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
            if(label === '成绩'){
                this.$router.push({path: '/teacher/grade'})
            }else{
                this.$router.push({path: '/teacher/personal'})
            }
        },
    }
}
</script>


<style lang="scss" scoped>
#teacher-home{
    .tabbar{
        width: 100%;
        font-size: 12px;
        position: fixed;
        bottom: 0;
        left: 0;
    }
}

</style>