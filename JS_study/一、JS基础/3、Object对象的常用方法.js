// Object   对象常用方法
// Object.create()          创建对象
// Object.is()              判断两个对象是否是同一个对象
// Obj.hasOwnProperty()     对象自身属性中是否具有指定的属性
// Object.getOwnPropertyDescriptor()    返回指定对象上一个自有属性对应的属性描述符
// Object.getOwnPropertyDescriptors()   获取一个对象的所有自身属性的描述符
// Object.getPrototypeOf()              获取实例对象的原型对象
// Object.setPrototypeOf()              方法设置一个指定的对象的原型
// Object.defineProperty()              直接在一个对象上定义个新属性，或者修改一个对象的现有属性，并返回此对象
// 具体更详细的Object方法：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object

/*
let a = Object.create(Document.prototype)

let b = {}

let c = {}

b == c          // false

window === self

window === top

window.self === self.top.window

Object.is(window, top)

document.hasOwnProperty("location")     // true
document.hasOwnProperty("cookie")       // false

Object.getOwnPropertyDescriptor(document, "location")

Object.getOwnPropertyDescriptor(document.__proto__.__proto__, "cookie")     // document.__proto__.__proto__相当于Document

Object.getOwnPropertyDescriptors(Document.prototype)

Object.getPrototypeOf(document)     // 和document.__proto__一样

let x = {}
Object.setPrototypeOf(x, Document.prototype)
*/

// 初始化对象时定义属性
let User = {
    "name":"小明",
}
User.age = 10;      // User["age"] = 20;       //二者是一样的，不同的形式意思是一样的
/*
Object.defineProperty(User, "height", {
    enumerable:true,    // 参数是否可以遍历
    configurable:true,   // 参数是否可配置
    value:160,             // 表示height的值
    writable:true        // 参数是否可写
});     //第一个参数是一个对象，第二个参数是一个属性名，第三个参数是一个描述符（对象）
for (const userKey in User){
    console.log(userKey)
}
// 重新定义了前面的结果
Object.defineProperty(User, "height", {
    enumerable:true,    // 参数是否可以遍历
    configurable:true   // 参数是否可配置
});

console.log(User.height)

User.height = 180
console.log(User.height)
*/

let temp = 150;
Object.defineProperty(User, "height", {
    enumerable:true,
    configurable:true,
    get:function (){      // 当获取属性值时调用
        console.log("正在获取值");
        // return 150;
        return temp;    // 替换成临时变量
    },
    set:function (value){   // 当对属性进行赋值操作时
        console.log("正在设置值");
        // this.height = value;     // 这种操作不可行，会无限递归，可以外部定义一个临时变量（let temp = 150;）
        temp = value;
    }
});
console.log(User.height);
User.height = 180;
console.log(User.height);
// 上面的value和writable是不能和get以及set同时使用的
