var layer = layui.layer;

$(function () {
    fn();
    var open = null;
    $('#showAdd').on('click', function () {
        open = layer.open({
            title: '添加文章分类',
            type: 1,
            content: $('#tpl-add').html(), //这里content是一个普通的String,
            area: ['500px', '250px']
        });
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败');
                }
                layer.msg('添加成功');
                fn();
                // console.log(res)
                layer.close(open)
            }
        })
    })

    $('body').on('click', '.btnEdit', function () {
        layer.open({
            title: '修改文章分类',
            area: ['500px', '250px'],
            type: 1,
            content: $('#tpl-xg').html()
        });
    })


    function fn() {
        $.get('/my/article/cates', function (res) {
            if (res.status === 0) {
                var trmplate = template('trmplate', res);
                $('tbody').html(trmplate)
            }
        })
    }
})
