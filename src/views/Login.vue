<template>
    <div>
        <div class="logo">
            <img src="../assets/logo.png" alt="">
        </div>
        <cube-from
            :model="model"
            :schema="schema"
            @submit="handleLogin"
            @validate="handValidata"
        >

        </cube-from>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                model:{
                    username: "",
                    paswd: ""
                },
                schema:{
                    //表单结构定义
                    fields:[
                        //字段数组
                        {
                            type:"input",
                            modelKey:"username",
                            label:"用户名",
                            props:{
                                placeholder:"请输入用户名"
                            },
                            rules:{
                                //效验规则
                                requires: true
                            },
                            trigger: "blur"
                        },
                        {
                            type: "input",
                            modelKey: "passwd",
                            label: "密码",
                            props:{
                                type:"password",
                                placeholder:"请输入密码",
                                eye:{
                                    open: true
                                }
                            },
                            rules:{
                                requires: true
                            },
                            trigger: "blur"
                        },
                        {
                            type:"submit",
                            label: "登录"
                        }
                    ]
                }
            }
        },
        methods: {
            handleLogin(e) {
                //组织表单的默认提交行为
                e.preventDefault();
                //登录请求
                this.$store.dispatch('login',this.model)
                .then(code => {
                    if(code){
                        //登录成功重定向
                        const path = this.$route.query.redirect || '/';
                        this.$router.push(path);
                    }
                }).catch(error => {
                    //有错误发生或者登录失败
                    const toast = this.$createToast({
                        time: 2000,
                        txt: error.message || error.response.data.message || "登录失败",
                        type: "error"
                    });
                    toast.show();
                })
            },
            handValidata(){
                // console.log(ret);
            }
        }
    }
</script>
