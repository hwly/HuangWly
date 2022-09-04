import execjs

with open(r'baidu.js', 'r', encoding='utf-8') as f:
    data = f.read()

params = execjs.compile(data).call('get_demo', '喜欢')
print(params)
