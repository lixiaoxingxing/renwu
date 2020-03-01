$(function () {
    var layer = layui.layer
    var form = layui.form
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！');
                }
                //可以单独获取
                // $('[name=username]').val(res.data.username);
                form.val('a', res.data)
                form.verify({
                    username: function (value, item) { //value：表单的值、item：表单的DOM对象
                        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                            return '用户名不能有特殊字符';
                        }
                        if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                            return '用户名首尾不能出现下划线\'_\'';
                        }
                        if (/^\d+\d+\d$/.test(value)) {
                            return '用户名不能全为数字';
                        }
                    },
                    email: [
                        /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/
                    ]
                });
            }
        })
    }
    $('#btn').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败');
                }
                layer.msg('修改成功');
                window.parent.xinxi()
            }
        })
    })
    $('#btnReset').on('click', function (e) {
        // 1. 阻止重置的默认行为
        e.preventDefault()
        // 2. 重新获取用户信息，并渲染表单数据
        initUserInfo()
    })
})


