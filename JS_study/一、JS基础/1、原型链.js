// 原型           ->  类
// 原型对象         ->  类中属性与方法组成的一个对象
// 实例对象        ->  创建的实例
// 如何互相转换



// 原型（它是一个函数）
function User(){

}
console.log("原型：", User);
User.prototype.username = 'test';
User.prototype.password = "123456";
User.prototype.login = function login(username, password){
    console.log(`${username}登陆成功`);
}
// 从原型到原型对象
console.log("原型对象：", User.prototype);

// 从原型到实例对象
let user = new User();
console.log(user)
user.login("小明", "1")

// 从原型对象到原型
console.log(User.prototype.constructor === User);   // constructor为构造器

// 从原型对象到实例对象
let user2 = new User.prototype.constructor();
console.log(user2);

// 从实例对象到原型对象
console.log(user.__proto__ === User.prototype);
console.log(Object.getPrototypeOf(user) === User.prototype);

// 从实例对象到原型
console.log(user.__proto__.constructor === User);
console.log(Object.getPrototypeOf(user).constructor === User)