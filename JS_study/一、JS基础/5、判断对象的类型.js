// 判断对象的类型
// typeof
// Object.prototype.toString.call

console.log(1,typeof 1);
console.log('1',typeof '1');
console.log({},typeof {});
console.log(true,typeof true);
console.log([],typeof []);          // || -> 两个输出的类型是不对的，用第二个方法
console.log(null,typeof null);      // |
console.log(undefined,typeof undefined);
console.log(Symbol(),typeof Symbol());
console.log(function (){},typeof function (){});

console.log("======================================")

console.log(Object.prototype.toString.call(1));
console.log(Object.prototype.toString.call("1"));
console.log(Object.prototype.toString.call({}));
console.log(Object.prototype.toString.call(true));
console.log(Object.prototype.toString.call([]));
console.log(Object.prototype.toString.call(null));
console.log(Object.prototype.toString.call(undefined));
console.log(Object.prototype.toString.call(Symbol()));
console.log(Object.prototype.toString.call(function () {}));
