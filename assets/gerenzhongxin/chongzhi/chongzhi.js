$(function () {
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        //第一个规则
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newpass: function (value) {
            var oldPwd = $('[name = oldPwd]').val()
            if (value === oldPwd) {
                return layer.msg('与新密码一至,重新输入')
            }
        },
        newtwo: function (value) {
            var newPwd = $('[name = newPwd]').val()
            if (value !== newPwd) {
                return layer.msg('两次输入不一致')
            }
        }
    })
    $('#on').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败');
                }
                layer.msg('修改成功');
            }
        })
    })
})