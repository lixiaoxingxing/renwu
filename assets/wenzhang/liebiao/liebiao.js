$(function () {
    var form = layui.form;
    var layer = layui.layer;
    var laypage = layui.laypage
    var q = {
        pagenum: 1, // 页码值（默认获取第1页数据）
        pagesize: 2, // 每页显示几条数据（默认2条）
        cate_id: '', // 文章的分类（表示要获取哪个分类下的文章）
        state: '' // 文章的状态（表示要获取哪种状态的文章）
    }
    xuanran();
    initxuan();
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        xuanran();
    })
    function initxuan() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取信息更新失败');
                }
                var strhtml = template('fenlei-moban', res)
                $('[name = cate_id]').html(strhtml);
                form.render();
            }
        })
    }
    function xuanran() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取失败');
                }
                var templatee = template('moban', res)
                $('tbody').html(templatee);
                // form.render();
                renderPage(res.total)
            }
        })
    }
    //分页
    function renderPage(total) {
        laypage.render({
            elem: 'pager', // 容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 设置每页显示几条数据
            curr: q.pagenum,
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                var newPage = obj.curr
                // 2. 更新参数对象中的页码值
                q.pagenum = newPage;
                q.pagesize = obj.limit;
                console.log(obj)
                if (first != true) {
                    xuanran();
                }
            }
        })
    }
})