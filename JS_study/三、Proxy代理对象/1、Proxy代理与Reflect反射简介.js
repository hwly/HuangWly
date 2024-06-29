// Proxy代理与Reflect反射简介
// proxy作用：     监控对象操作
// reflect作用：   执行原始操作

let symbol = Symbol(123);

// 相当于浏览器接口对象，document
let user = {
    "name": "小明",
    1: 2,
    [symbol]: "symbol123",
    "age": 12   // 相当于补原本没有的环境
}

// console.log(user.name);
// console.log(user[1]);
// console.log(user[symbol]);

// 第一个参数：原始对象
// 第二个参数：handle，也是对象
// 我们添加代理
let proxyUser = new Proxy(user, {
    get: function (target, prop, receiver){ // 三个参数
        // target：      原始对象
        // prop：        属性
        // receiver：    代理后的对象
        console.log(`正在获取${prop.toString()}`);
        // let result = target[prop];  // 不会递归
        let result = Reflect.get(target, prop, receiver)    // 反射：执行原始操作

        console.log(`返回值：${result}`);
        return result;
    }
});

// js执行的代码
console.log(proxyUser.name);
console.log(proxyUser[symbol]);
console.log(proxyUser[1]);
console.log(proxyUser["name"]);
console.log(proxyUser["age"]);
