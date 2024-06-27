// 函数重命名
reNameFunc = function reNameFunc(func, name){
    Object.defineProperty(func, "name", {
     configurable: true,
     enumerable: false,
     writable: false,
     value: name
    })
}

add = function xxx(){
    return a + b
}

console.log(add.name);

reNameFunc(add, "add");
console.log(add.name);