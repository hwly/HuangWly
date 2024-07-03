// Proxy.apply方法
// 拦截 函数方法调用

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
                    console.log(`{apply|function:[${objName}],type:[${result}]}`);
                }else if(typeof result === "symbol"){
                    console.log(`{apply|function:[${objName}],result:[${result.toString()}]}`);
                }else{
                    console.log(`{apply|function:[${objName}],result:[${result}]}`);
                }
            }catch (e){
                console.log(`{apply|function:[${objName}],error:[${e.message}]}`);
            }
            return result;
        }
    };
    return new Proxy(obj, handler);
}

function add(a,b){
    // return a+b;
    return a;
}
add = ld.proxy(add, "add");
// add(1,2)
// console.log(add(Symbol(), 2));
console.log(add({'name':"test"}, 2));
