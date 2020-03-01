$.ajaxPrefilter(function (opction) {
    opction.url = 'http://www.liulongbin.top:3007' + opction.url;
    if (opction.url.indexOf('/my/' === -1)) {
        //表示获取的是有权限的内容
        opction.headers = {
            //获取有权限的码
            Authorization: localStorage.getItem('token')
        }
        opction.complete = function (re) {
            if (re.responseJSON.status === 1 && re.responseJSON.message === '身份认证失败！') {
                location.href = '/denglu.html';
            }
        }
    }
})