$(function () {
    $('.btn1').on('click', function () {
        $('.layui-form2').hide();
        $('.layui-form1').show();
        $(this).hide();
        $('.btn2').show();
    })
    $('.btn2').on('click', function () {
        $('.layui-form1').hide();
        $('.layui-form2').show();
        $(this).hide();
        $('.btn1').show();
    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        yanzheng: function (value) {
            var pwd = $('.one').val();
            if (value != pwd) {
                return '两次密码不一致';
            }
        }
    })

    $('#fzc').on('submit', function (e) {
        e.preventDefault()
        // 2. 发起Ajax请求
        $.ajax({
            // 指定请求的方式
            type: 'POST',
            // 指定请求的 URL 地址
            // 注意：必须是 【请求根路径】 拼接上 【具体的 URL 地址】
            url: 'http://www.liulongbin.top:3007/api/reguser',
            // 指定请求的数据
            data: $(this).serialize(),
            // 指定成功的回调函数
            success: function (res) {
                if (res.status !== 0) {
                    // 注册失败
                    return layer.msg(res.message)
                }
                // 如果没有被 return 出去，证明注册成功
                layer.msg('注册成功，请登录！')
                // console.log(res)
            }
        })
    })

    $('#dl').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                // 跳转到后台首页
                location.href = '/index.html'
            }
        })
    })
})

