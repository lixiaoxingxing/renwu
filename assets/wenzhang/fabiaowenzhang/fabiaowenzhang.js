var layer = layui.layer;
var form = layui.form;

$(function () {
    //初始化富文本
    initEditor();
    liebiaoxuanran()
    function liebiaoxuanran() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取失败');
                }
                var template1 = template('moban', res);
                $('[name=cate_id]').html(template1);
                form.render();
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 点击选择图片
    $('.dianji').on('click', function () {
        $('#coverFile').click();
    })
    $('#coverFile').on('change', function (e) {
        var img = e.target.files
        // 如果长度为0等于没有图片
        if (img.length === 0) {
            return
        }
        // console.log(e)
        var newImgURL = URL.createObjectURL(img[0])
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    //存储发表的状态
    var art_state = '已发布'
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })
    $('#biaodan11').on('submit', function (e) {
        e.preventDefault();
        //创建一个表单,当有表单图片和文件提交的时候,需要创建
        var fd = new FormData($(this)[0])
        // 3. 将文章的发表状态，存到 fd 中
        fd.append('state', art_state)
        // 4. 将封面区域，裁剪并输出为一个图片的文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 5. 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                // 6. 发起 ajax 请求
                publishArticle(fd)
            })
    })

    function publishArticle(fd) {
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果提交的是 fd 格式的数据，必须有如下两个配置项
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发表文章失败！')
                }
                layer.msg('发表文章成功！')
                // 跳转到文章列表页面
                location.href = '/assets/wenzhang/liebiao/liebiao.html'
            }
        })
    }
})