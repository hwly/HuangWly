// call 方法
// apply 方法
// argument 方法

function add(a, b) {
    console.log(a + b)
}

add(1, 2);
// call 方法第一个参数是this指针，即调用者；第二个参数开始，就是原函数的实际参数
add.call(null, 8, 9);
// apply 方法第一个参数是this指针，即调用者；第二个参数是一个数组，把实际参数进行打包到一个数组内
add.apply(null, [10, 20])

//
// function info(name, age){
//     // console.log(`${name}:${age}`);      // name 不在作用域内，this是全局作用域
//     console.log(`${this.name}:${this.age}`);
// }
// name = "小张"
// age = 10
// info();
//
// let user = {
//     "name" : "小王",
//     "age" : 12
// }
// info(user)      // 直接传是没有效果的
//
// info.call(user);
// info.apply(user);


function info(height, weight) {
    console.log(`${this.name}:${this.age}`);
    console.log(`${height}:${weight}`);
}

name = "小张"
age = 10
info(150, 40);

let user = {
    "name": "小王",
    "age": 12
}

info.call(user, 156, 42);
info.apply(user, [156, 42]);

// argument : 类似一个数组的对象;    函数参数个数不确定时，使用apply和argument配合使用
function test() {
    let user = {
        "name": "小王",
        "age": 12
    }
    info.apply(user, arguments);
}

test(160, 50)
