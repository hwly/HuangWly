// vm2的安装
// https://github.com/patriksimek/vm2
// 安装： npm install vm2
// 作用：整合JS，提供相应纯净的v8环境，方便调试

const {VM, VMScript} = require("E:/Git_study/CODE/node_modules/vm2");
const fs = require("fs");

// 创建虚拟机
const vm = new VM();
const code = fs.readFileSync("./input.js");
const script = new VMScript(code, "./debugJS.js");
const result = vm.run(script);
console.log(result);
fs.writeFileSync("./output.js", code);