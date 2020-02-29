//获取用户信息
$(function () {
    //调用函数,获取用户信息
    xinxi();
})


function xinxi() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            touxiang(res.data);
        }
        // complete: function (re) {
        //     console.log(re)
        //     if (re.responseJSON.status === 1 && re.responseJSON.message === "登录失败！") {
        //         location.href = '/denglu.html';
        //     }
        // }
    })
}

//渲染头像,信息
function touxiang(tx) {
    var name = tx.nickname || tx.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (tx.user_pic) {
        $('.tyiqi').attr('src', tx.user_pic).show();
        $('.teyiqi').hide();
    } else {
        $('.tyiqi').attr('src', tx.user_pic).hide();
        var one = name[0].toUpperCase();
        $('.teyiqi').html(one).show();
    }
}
var layer = layui.layer;
$('.jieshu').on('click', function () {
    //显示提示框
    layer.confirm('确定退出?', {
        btn: ['确认', '取消']
    }, function (index, ele) {
        //清除存储验证
        localStorage.removeItem('token');
        location.href = '/denglu.html';
        layer.close(index);
    })

})