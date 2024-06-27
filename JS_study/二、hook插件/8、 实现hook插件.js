// 实现hook插件

ld = {};    // 全局对象
// 函数native化
!function (){
    const $toString = Function.prototype.toString;
    const symbol = Symbol();    // 无一无二的属性
    const myToString = function (){
        return typeof this === 'function' && this[symbol] || $toString.call(this);
    }
    function set_native(func, key, value){
        Object.defineProperty(func, key, {
            enumerable: false,
            configurable: true,
            writable: true,
            value: value
        });
    }
    delete Function.prototype.toString;
    set_native(Function.prototype, "toString", myToString);
    set_native(Function.prototype.toString, symbol, "function toString() { [native code] }");
    ld.setNative = function (func, funcname){
        set_native(func, symbol, `function ${funcname || func.name || ''}() { [native code] }`);
    }
}();

// 函数重命名
ld.reNameFunc = function reNameFunc(func, name){
    Object.defineProperty(func, "name", {
     configurable: true,
     enumerable: false,
     writable: false,
     value: name
    })
}

// hook插件
hook = function (func, funcInfo, isDebug, onEnter, onLeave, isExec){
    // func:        原函数，需要hook的函数
    // function:    是一个对象，objName，funcName属性
    // isDebug:     布尔类型，是否进行调试，关键点定位，回溯调用栈
    // onEnter:     函数，原函数执行前执行的函数，改原函数入参，或者输出入参
    // onLeave:     函数，原函数执行完之后执行的函数，改原函数的返回值，或者输出原函数的返回值
    // isExec:      布尔类型，是否执行原函数，比如无限debugger函数
    if(typeof func !== 'function'){
        return func;
    }
    if(funcInfo === undefined){
        funcInfo = {};
        funcInfo.objName = "globalThis";
        funcInfo.funcName = func.name || '';
    }
    if(isDebug === undefined){
        isDebug = false;
    }
    if(!onEnter){
        onEnter = function (obj){
            console.log(`{hook|${funcInfo.objName}[${funcInfo.funcName}]正在调用，参数是${JSON.stringify(obj.args)}}`);
        }
    }
    if(!onLeave){
        onLeave = function (obj){
            console.log(`{hook|${funcInfo.objName}[${funcInfo.funcName}]正在调用，返回值是[${obj.result}]}`);
        }
    }
    if(isExec === undefined){
        isExec = true;
    }
    // 替换的函数
    hookFunc = function (){
        if(isDebug){
            debugger;
        }
        let obj = {};
        obj.args = [];
        for (let i=0;i<arguments.length;i++){
            obj.args[i] = arguments[i];
        }
        // 原函数执行前
        onEnter.call(this, obj);    // onEnter(obj);
        // 原函数正在执行
        let result;
        if(isExec){
            result = func.apply(this, obj.args);
        }
        obj.result = result;
        // 原函数执行后
        onLeave.call(this, obj);    // onLeave(obj);
        // 返回结果
        return obj.result;
    }
    // hook后的函数进行native化
    ld.setNative(hookFunc, funcInfo.funcName);
    ld.reNameFunc(hookFunc, funcInfo.funcName);
    return hookFunc;
}

function add(a, b){
    // 输出信息
    console.log("正在执行原函数add方法");
    return a + b;
}
// console.log(add(1, 5));
// add = hook(add)     // hook了add函数
// console.log(add(1, 5));

let funcInfo = {
    "objName": "Obj",
    "funcName": "add"
}
onEnter = function (obj){
    console.log("正在执行原函数调用前的操作", obj.args);
    obj.args[0] = 10;
}
onLeave = function (obj){
    console.log("正在执行原函数调用后的操作", obj.result);
    obj.result = 16;
}
add = hook(add, funcInfo, true, onEnter, onLeave, false)     // hook了add函数
console.log(add(1, 5));

console.log(add.toString());
console.log(Function.prototype.toString.call(add));    // 输出的是原函数，没有native化
console.log(add.name);  // 函数需要重命名
