import execjs

data = '喜欢'
ua = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'

with open(r'youdao.js', 'r', encoding='utf-8') as f:
    youdao_js = f.read()

params = execjs.compile(youdao_js).call('r', data, ua)
print(params)
