// WindowProperties 对象
WindowProperties = function WindowProperties(){

}
// 函数native化
ldvm.toolsFunc.setNative(WindowProperties, "WindowProperties")
// 修改对象名称
ldvm.toolsFunc.reNameObj(WindowProperties, "WindowProperties");

Object.setPrototypeOf(WindowProperties.prototype, EventTarget.prototype);
