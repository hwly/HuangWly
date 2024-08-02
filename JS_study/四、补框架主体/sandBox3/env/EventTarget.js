// Window 对象
EventTarget = function EventTarget(){

}
// 函数native化
ldvm.toolsFunc.setNative(EventTarget, "EventTarget")
// 修改对象名称
ldvm.toolsFunc.reNameObj(EventTarget, "EventTarget");

Object.defineProperty(EventTarget.prototype, "addEventListener", {
    value: function (){}
})