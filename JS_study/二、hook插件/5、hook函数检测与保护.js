// hook 检测与保护
// toString() 方法

function atob(){
    console.log("正在执行atob");
}

console.log(atob.toString());

Function.prototype.toString = function (){
    return `function ${this.name}(){[native code]}`
}