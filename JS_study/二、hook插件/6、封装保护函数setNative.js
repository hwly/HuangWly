// 函数native化

// 自执行函数
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
    globalThis.setNative = function (func, funcname){
        set_native(func, symbol, `function ${funcname || func.name || ''}() { [native code] }`);
    }
}();

add = function (a, b){
    return a + b;
}
console.log(globalThis === global);
setNative(add, "add")
console.log(add.toString());
console.log(Function.prototype.toString.call(add));