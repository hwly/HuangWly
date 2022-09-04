## 框架

![image-20220111212308134](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20220111212308134.png)

![image-20220111212730764](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20220111212730764.png)





## Scrapy 快速入门

### 文档

Scrapy 官方文档：http://doc.scrapy.org/en/latest

Scrapy 中文文档：http://scrapy-chs.readthedocs.io/zh_CN/latest/index.html



### 快速入门

- 创建项目：

  ```py
  scrapy startproject xxxPro
  ```

- cd xxxPro

- 在 spiders 子目录中创建一个爬虫文件

  ```python
  scrapy genspider spiderName(爬虫名字) www.xxx.com
  ```

  在创建的爬虫文件中：

  ```python
  import scrapy
  
  
  class FirstSpider(scrapy.Spider):
      # 爬虫文件的名称：就是爬虫源文件的一个唯一标识
      name = 'first'
      # 允许的域名：用来限定start_urls列表中哪些url可以进行请求发送
      # allowed_domains = ['www.xxx.com']
      # 起始的url列表：该列表中存放的url会被scrapy自动进行请求的发送（可以放入多个url）
      start_urls = ['http://www.xxx.com/']
  
      # 用作于数据解析：response 参数表示的就是请求成功后对应的响应对象
      # 调用的次数由start_urls列表中存放的url决定
      def parse(self, response):
          pass
  ```

  

#### JsonItemExporter 和 JsonLinesItemExporter

保存 json 数据的时候，可以使用这两个类。

- `JsonItemExporter`：每次把数据添加到内存中。最后统一写入到磁盘中。好处是，存储的数据是一个满足 json 规则的数据。坏处是如果数据量比较大，那么比较消耗内存；

  示例：

  ```python
  from scarpy.exporters import JsonItemExporter
  
  class QsbkPipeline(object):
      def __init__(self):
          self.fp = open("duanzi.json", "wb")
          self.exporter = JsonItemExporter(self.fp, ensure_ascii=False, encoding='utf-8')
          self.exporter.start_exporting()
  	def open_spider(self, spider):
          print('爬虫开始。。。')
     	def process_item(self, item, spider):
          self.exporter.export_item(item)
          return item
    	def close_spider(self, spider):
          self.exporter.finish_exporting()
          self.fp.close()
          print('爬虫结束。。。')
  ```

  

- `JsonLinesItemExporter`：每次调用 `export_item` 的时候就把这个 item 存储到硬盘中，坏处是每一个字典是一行，整个文件不是一个满足 json 格式的文件。好处是每次处理数据的时候就直接存储到了硬盘中，这样不会消耗内存，数据也比较安全。

  示例：

  ```python
  from scrapy.exporters import JsonLinesItemExporter
  class QsbkPipeline(object):
      def __init__(self):
          self.fp = open("duanzi.json", 'wb')
          self.exporter = JsonLinesItemExporter(self.fp, ensure_ascii=False, encoding = 'utf-8')
    	def open_spider(self, spider):
          self.exporter.export_item(item)
          return item
      def close_spider(self, spider):
          self.fp.close()
          print('爬虫结束...')
  ```

  

### CrawlSpider

- 创建 `CrawlSpider` 爬虫，使用如下命令：

```python
scrapy genspider -t crawl 爬虫名字 域名
```

- `LinkExtractors` 链接提取器：

  ```python
  class scrapy.linkextractors.LinkExtractor(
  	allow = ()	# 允许的 url。所有满足这个正则表达式的 url 都会被提取
      deny = ()	# 禁止的 url。所有满足这个正则表达式的 url 都不会被提取
      allow_domains()		# 允许的域名。只有在这个里面指定的域名的 url 才会被提取
      deny_domains()		# 禁止的域名。所有在这个里面指定的域名的 url 都不会被提取
      restrict_xpaths()	# 严格的 xpath。和 allow 共同过滤链接
      tags = ('a', 'area')
      canonicalize = True
      unique = True
      process_value = None
  )
  ```

- `Rule` 规则类

  定义爬虫的规则类

  ```python
  class scrapy.spiders.Rule(
  	link_extractor,		# 一个 LinkExtractor 对象，用于定义爬取规则
      callback = None,	# 满足这个规则的 url，应该要执行哪个回调函数。因为 CrawlSpider 使用了 parse 作为回调函数，因此不要覆盖 parse 作为回调函数自己的回调函数
      cb_kwargs = None,
      follow = None,		# 指定根据该规则从 response 中提取的链接是否需要更进。
      process_links = None,	# 从 link_extractor 中获取到链接后会传递给这个函数，用来过滤不需要爬取的链接
      process_request = None
  )
  ```

  

























