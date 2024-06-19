// js hook的原理：重新定义函数，使得调用位置走我们重新定义的函数，改变执行流程
// js hook的作用：输出分析日志，定位关键点，改变返回结果
// 函数hook

// 定义函数
function add(a,b){
    return a+b;
}

// 函数加载完成
// hook位置：必须是加载完需要hook的函数，即已经定义好的函数
// 保存原函数
_add = add;
add = function (a, b){
    debugger;
    // 原函数调用前
    console.log("原函数调用前，参数：", a, b);
    // 调用原函数
    let result = _add(a, b);
    /*
    let result;
    if (false){
        result = _add(a,b);
    }
     */
    // 原函数调用后
    console.log("原函数调用后，结果：", result);
    result = 16;
    return result
}

// 调用函数
console.log(add(1, 5));