// 全局对象配置
debugger;
ldvm = {
    "toolsFunc":{},     // 功能函数相关，插件
}

// 插件功能相关
!function () {
    // 函数native化
    !function () {
        const $toString = Function.prototype.toString;
        const symbol = Symbol();    // 无一无二的属性
        const myToString = function () {
            return typeof this === 'function' && this[symbol] || $toString.call(this);
        }

        function set_native(func, key, value) {
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
        ldvm.toolsFunc.setNative = function (func, funcname) {
            set_native(func, symbol, `function ${funcname || func.name || ''}() { [native code] }`);
        }
    }();
    // 对象重命名
    ldvm.toolsFunc.reNameObj = function reNameObj(obj, name) {
        Object.defineProperty(obj.prototype, Symbol.toStringTag, {
            configurable: true,
            enumerable: false,
            value: name,
            writable: false
        });
    }
}();
// 浏览器接口具体的实现
// env相关代码// Window 对象
EventTarget = function EventTarget(){

}
// 函数native化
ldvm.toolsFunc.setNative(EventTarget, "EventTarget")
// 修改对象名称
ldvm.toolsFunc.reNameObj(EventTarget, "EventTarget");

Object.defineProperty(EventTarget.prototype, "addEventListener", {
    value: function (){}
})
// WindowProperties 对象
WindowProperties = function WindowProperties(){

}
// 函数native化
ldvm.toolsFunc.setNative(WindowProperties, "WindowProperties")
// 修改对象名称
ldvm.toolsFunc.reNameObj(WindowProperties, "WindowProperties");

Object.setPrototypeOf(WindowProperties.prototype, EventTarget.prototype);

// Window 对象
Window = function Window(){

}
// 函数native化
ldvm.toolsFunc.setNative(Window, "Window")
// 修改对象名称
ldvm.toolsFunc.reNameObj(Window, "Window");
// 设置Window.prototype的原型对象
Object.setPrototypeOf(Window.prototype, WindowProperties.prototype);

window = {};
Object.setPrototypeOf(window, Window.prototype);

console.log(window);
// 全局变量初始化
// 网页变量初始化
// 需要代理的对象
// window = new Proxy(window, {});
// 需要调试的代码
// 异步执行的代码
