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