module.exports = {
    // pluginOption:{
    //     'cube-ui':{
    //         postCompile: true,
    //         theme: false
    //     }
    // },
    configureWebpack:{
        devServer:{
            before(app){
                // 模拟的后台服务器express
                app.get("/api/login",function(req,res){
                    const { username,passwd } = req.query;
                    // console.log(username, passwd);

                    if(username == "kaikeba" && passwd == "123"){
                        res.json({ code: 1,token: "jilei"});
                    }else{
                        res.status(401).json({ code: 0, message: "用户名或者密码错误"});
                    }
                });
                //保护接口中间件
                function auth(req, res,next){
                    if(req.headers.token){
                        //已认证
                        next()
                    }else{
                        // 用户未授权
                        res.sendStatus(401)
                    }
                }
                //获取登录用户的信息
                app.get("/api/userinfo",auth,function(req,res){
                    res.json({code: 1,data:{name: "tom",age:20}});
                });
            }
        }
    }
}