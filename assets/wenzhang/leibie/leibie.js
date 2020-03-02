var layer = layui.layer;
var form = layui.form;
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
    var editIndex = null;
    $('body').on('click', '.btnEdit', function () {
        editIndex = layer.open({
            title: '修改文章分类',
            area: ['500px', '250px'],
            type: 1,
            content: $('#tpl-xg').html()
        });
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取失败');
                }
                form.val('form-edit', res.data);
            }
        })
    })

    $('body').on('submit', '#tpl-xg', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新数据失败！')
                }
                layer.msg('更新数据成功！')
                layer.close(editIndex)
                // 刷新列表的数据
                fn()
            }
        })
    })

    $('body').on('click', '.form-sc', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败');
                    }
                    layer.msg('删除成功');
                    fn();
                }
            })
            layer.close(index);
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
