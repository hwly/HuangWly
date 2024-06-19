// 浏览器环境hook 函数atob

_atob = atob;
atob = function (str){
    console.log("正在执行atob方法，参数：", str);
    let result = _atob(str);
    console.log("正在执行atob方法，返回值：", result);
    return result;
}