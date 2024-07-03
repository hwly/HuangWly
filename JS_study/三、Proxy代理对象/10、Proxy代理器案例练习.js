// 补环境
// 1.没有报错
// 2.和浏览器结果一致

// 框架
ld = {};
ld.config = {};
ld.config.proxy = true; //  代理开关

ld.getType = function getType(obj){
    return Object.prototype.toString.call(obj);
}

ld.proxy = function proxy(obj, objName) {
    // obj：     原始对象
    // objName： 原始对象的名字
    if (!ld.config.proxy) {
        return obj;
    }

    let handler = {
        get: function (target, prop, receiver) { // 三个参数
            // target：      原始对象
            // prop：        属性
            // receiver：    代理后的对象
            let result;
            try {   // 防止报错
                result = Reflect.get(target, prop, receiver);
                let type = ld.getType(result);
                if(result instanceof Object){
                    console.log(`{get|obj:[${objName}] -> prop:[${prop.toString()}],type:[${type}]}`);
                    // 递归代理
                    result = ld.proxy(result, `${objName}.${prop.toString()}`);
                }else if(typeof result === "symbol"){
                    console.log(`{get|obj:[${objName}] -> prop:[${prop.toString()}],ret:[${result.toString()}]}`);
                }else{
                    console.log(`{get|obj:[${objName}] -> prop:[${prop.toString()}],ret:[${result}]}`);
                }
            }catch (e){
                console.log(`{get|obj:[${objName}] -> prop:[${prop.toString()}],error:[${e.message}]}`);
            }
            return result;
        },
        set: function (target, prop, value, receiver){
            let result;
            try {
                result = Reflect.set(target, prop, value, receiver);
                if(value instanceof Object){
                    let type = ld.getType(value);
                    console.log(`{set|obj:[${objName}] -> prop:[${prop.toString()}],type:[${type}]}`);
                }else if(typeof value === "symbol"){
                    console.log(`{set|obj:[${objName}] -> prop:[${prop.toString()}],value:[${value.toString()}]}`);
                }else{
                    console.log(`{set|obj:[${objName}] -> prop:[${prop.toString()}],value:[${value}]}`);
                }

            }catch (e){
                console.log(`{set|obj:[${objName}] -> prop:[${prop.toString()}],error:[${e.message}]}`);
            }
            return result;
        },
        getOwnPropertyDescriptor: function (target, prop){
            let result; // undefined，描述符对象
            try{
                result = Reflect.getOwnPropertyDescriptor(target, prop)
                let type = ld.getType(result);
                console.log(`{getOwnPropertyDescriptor|obj:[${objName}] -> prop:[${prop.toString()}],type:[${type}]}`);
                // if(typeof result !== "undefined"){
                //     result = ld.proxy(result, `${objName}.${prop.toString()}.PropertyDescriptor`);
                // }
            }catch (e){
                console.log(`{getOwnPropertyDescriptor|obj:[${objName}] -> prop:[${prop.toString()}],error:[${e.message}]}`);
            }
            return result;
        },
        defineProperty: function (target, prop, descriptor){
            let result;
            try{
                result = Reflect.defineProperty(target, prop, descriptor);
                console.log(`{defineProperty|obj:[${objName}] -> prop:[${prop.toString()}]}`);
            }catch (e){
                console.log(`{defineProperty|obj:[${objName}] -> prop:[${prop.toString()}],error:[${e.message}]}`);
            }
            return result;
        },
        apply: function (target, thisArg, argumentsList){
            // target：          函数对象
            // thisArg：         调用函数的this指针
            // argumentsList：   数组，函数的入参组成的一个列表
            let result;
            try {
                result = Reflect.apply(target, thisArg, argumentsList);
                let type = ld.getType(result);
                if(result instanceof Object){
                    console.log(`{apply|function:[${objName}],type:[${type}]}`);
                }else if(typeof result === "symbol"){
                    console.log(`{apply|function:[${objName}],result:[${result.toString()}]}`);
                }else{
                    console.log(`{apply|function:[${objName}],result:[${result}]}`);
                }
            }catch (e){
                console.log(`{apply|function:[${objName}],error:[${e.message}]}`);
            }
            return result;
        },
        construct: function (target, argArray, newTarget){
            // target：      函数对象
            // argArray：    参数列表
            // newTarget：   代理对象
            let result;
            try {
                result = Reflect.construct(target, argArray, newTarget);
                let type = ld.getType(result);
                console.log(`{construct|function:[${objName}],type:[${type}]}`);
            }catch (e){
                console.log(`{construct|function:[${objName}],error:[${e.message}]}`);
            }
            return result;
        },
        deleteProperty: function (target, propKey){
            let result = Reflect.deleteProperty(target, propKey);
            console.log(`{deleteProperty|obj:[${objName}] -> prop:[${propKey.toString()}],result:[${result}]}`);
            return result;
        },
        has: function (target, propKey){    // in操作符
            let result = Reflect.has(target, propKey);
            console.log(`{has|obj:[${objName}] -> prop:[${propKey.toString()}],result:[${result}]}`);
            return result;
        },
        ownKeys: function (target){
            let result = Reflect.ownKeys(target);
            console.log(`{ownKeys|obj:[${objName}]}`);
            return result;
        },
        getPrototypeOf: function (target){
            let result = Reflect.getPrototypeOf(target);
            console.log(`{getPrototypeOf|obj:[${objName}]}`);
            return result;
        },
        setPrototypeOf: function (target, proto){
            let result = Reflect.setPrototypeOf(target, proto);
            console.log(`{setPrototypeOf|obj:[${objName}]}`);
            return result;
        }
    };
    return new Proxy(obj, handler);
}


// 补充的环境
// window is not defined
window = globalThis;
window.localStorage = {};
window.localStorage.getItem = function (){return null};
window.navigator = {};
// 检测原型链
window.navigator.__proto__.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
window.navigator.__proto__.webdriver = false;

window.name = '';

delete Buffer;  // 检查node环境

// document is not defined
document = {};
document.cookie = '';

window = ld.proxy(window, "window")
document = ld.proxy(document, "document")

// 需要补环境的代码