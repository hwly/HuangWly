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