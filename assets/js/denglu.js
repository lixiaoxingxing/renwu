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

    $('#fzca').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！')
                $('#link-login').click()
            }
        })
    })


    $('#dl').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功!')
                localStorage.setItem('token', res.token)
                // 跳转到后台首页
                location.href = '/index.html'
            }
        })
    })
})

