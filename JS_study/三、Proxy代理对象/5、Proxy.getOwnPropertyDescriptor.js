// Proxy.getOwnPropertyDescriptor
// 拦截获取属性描述符

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
                if(typeof result !== "undefined"){
                    result = ld.proxy(result, `${objName}.${prop.toString()}.PropertyDescriptor`);
                }
            }catch (e){
                console.log(`{getOwnPropertyDescriptor|obj:[${objName}] -> prop:[${prop.toString()}],error:[${e.message}]}`);
            }
            return result;
        }
    };
    return new Proxy(obj, handler);
}

user = {
    "name": "小明"
}
user = ld.proxy(user, "user");
console.log(Object.getOwnPropertyDescriptor(user, "name").value);
