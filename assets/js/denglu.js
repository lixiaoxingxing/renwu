$('.btn1').on('click', function () {
    $('.layui-form').hide();
    $('.layui-form1').show();
    $(this).hide();
    $('.btn2').show();
})
$('.btn2').on('click', function () {
    $('.layui-form1').hide();
    $('.layui-form').show();
    $(this).hide();
    $('.btn1').show();
})