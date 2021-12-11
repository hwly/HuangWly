# Redis

## nosql 介绍

**NoSQL：一类新出现的数据库（not only sql），它的特点：**

- 不支持 **SQL** 语法
- 存储结构跟传统关系型数据库中的那种关系表完全不同，`nosql` 中存储的数据都是 `KV` 形式
- `NoSQL` 的世界中没有一种通用的语言，每种 `nosql` 数据库都有自己的 `api` 和语法，以及擅长的业务场景
- `NoSQL` 中的产品种类相当多：
  - Mongodb
  - Redis
  - Hbase hadoop
  - Cassandra hadoop

 **NoSQL 和 SQL 数据库的比较**

- 适用场景不同：`sql` 数据库适用于关系特别复杂的数据查询场景，`nosql` 反之
- “事务”特性的支持：`sql` 对事物的支持非常完善，而 `nosql` 基本不支持事务
- 两者在不断地取长补短，呈现融合趋势



**redis应用场景**

- 用来做缓存（ehcache/memcached）—— redis 的所有数据是放在内存中的（内存数据库）
- 可以在某些特定应用场景下替代传统数据库——比如社交类的应用
- 在一些大型系统中，巧妙地实现一些特定的功能：session 共享、购物车



## Redis 下载安装

https://www.cnblogs.com/pengpengdeyuan/p/14435601.html

使用命令 `redis-cli.exe -h 127.0.0.1 -p 6379` 进入 redis 数据库：

```redis
redis-cli.exe -h 127.0.0.1 -p 6379
```



## 客户端

- 客户端的命令为 `redis-cli`

- 可以使用 `help` 查看帮助文档

  ```redis
  redis-cli --help
  ```

- 连接 `redis`

  ```redis
  redis-cli.exe -h 127.0.0.1 -p 6379
  ```

- 运行测试命令

  ```redis
  ping
  ```

- 切换数据库

  - 数据库没有名称，默认有 16 个，通过 0 - 15 来标识，连接 `redis` 默认选择第一个数据库

  ```redis
  select n
  ```

  ![image-20211211212110239](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211212110239.png)



## 数据操作

- 值的类型分为五种：
  - 字符串 `string`
  - 哈希 `hash`
  - 列表 `list`
  - 集合 `set`
  - 有序集合 `zset`

### 数据操作行为

- 保存
- 修改
- 获取
- 删除

点击中文官网查看命令文档：http://www.redis.cn/commands.html

点击查看相关命令：http://doc.redisfans.com/



### string 类型

- 字符串类型是 `Redis` 中最为基础的数据存储类型，它在 `Redis` 中是二进制安全的，这便意味着该类型可以接受任何格式的数据，如 `JPEG` 图像数据或 `JSON` 对象描述信息等。在 `Redis` 中字符串类型的 `Value` 最多可以容纳的数据长度是 512M 。



#### 保存

如果设置的键不存在则为添加，如果设置的键已存在则修改

- 设置键值

  ```redis
  set key value
  ```

- 例1：设置键为 `name` 值为 `itcast`：

  ```redis
  set name itcast
  get name
  set name itheima
  ```

  ![image-20211211213223518](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211213223518.png)

- 设置键值及过期时间，以秒为单位

  ```redis
  setex key seconds value
  ```

- 例2：设置键为 `aa` 值为 `aa` 过期时间为 3 秒的数据：

  ```redis
  setex aa 3 aa
  ```

  ![image-20211211213504893](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211213504893.png)

- 设置多个键值：

  ```redis
  mset key1 value1 key2 value2 ...
  ```

- 例3：设置键为 `a1` 值为 `python`、键为 `a2` 值为 `java`、键为 `a3` 值为 `c`

  ```redis
  mset a1 python a2 java a3 c
  ```

  ![image-20211211213741055](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211213741055.png)

- 追加值

  ```redis
  append key value
  ```

- 例4：向键为 `a1` 中追加值 `haha`

  ```redis
  append 'a1' 'haha'
  ```

  ![image-20211211213935182](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211213935182.png)



#### 获取

- 获取：根据键获取值，如果不存在此键则返回 `nil`

  ```redis
  get key
  ```

- 例5：获取键 `name` 的值：

  ```redis
  get name
  ```

- 根据多个键获取多个值

  ```redis
  mget key1 key2 ...
  ```

- 例6：获取键 `a1、a2、a3` 的值：

  ```redis
  mget a1 a2 a3
  ```

  ![image-20211211214255630](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211214255630.png)



### 键命令

- 查找键，参数支持正则表达式

  ```redis
  keys pattern 
  ```

- 例1：查看所有键

  ```redis
  keys *
  ```

  ![image-20211211214556871](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211214556871.png)

- 例2：查看名称中包含 `a` 的键

  ```redis
  keys a*
  ```

  ![image-20211211214646268](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211214646268.png)

- 判断键是否存在，如果存在返回1，不存在返回0

  ```redis
  exists key1
  ```

- 例3：判断键 `a1` 是否存在

  ```redis
  exists a1
  ```

  ![image-20211211214857165](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211214857165.png)

- 查看键对应的 `value` 的类型

  ```
  type key
  ```

- 例4：查看键 `a1` 的值类型，为 `redis` 支持的五种类型中一种

  ```
  type a1
  ```

  ![image-20211211215038877](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211215038877.png)

- 删除键及对应的值

  ```
  del key1 key2 ...
  ```

- 例5：删除键 `a2、a3`

  ```
  del a2 a3
  ```

  ![image-20211211215202884](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211215202884.png)

- 设置过期时间，以秒为单位

- 如果没有指定过期时间则一直存在，直到使用 `DEL` 删除

  ```
  expire key seconds
  ```

- 例6：设置键 `a1` 的过期时间为 3 秒

  ```
  expire a1 3
  ```

  ![image-20211211215503692](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211215503692.png)

- 查看有效时间，以秒为单位

  ```
  ttl key
  ```

- 例7：查看键 `bb` 的有效时间

  ```
  ttl bb
  ```

  ![image-20211211215637015](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211215637015.png)



### hash 类型

- hash 用于存储对象，对象的结构为属性、值
- 值的类型为 string



#### 增加、修改

- 设置单个属性

  ```
  hset key field value
  ```

- 例1：设置键 `user` 的属性为 `itheima`

  ```
  hset user name itheima
  ```

  ![image-20211211220256185](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211220256185.png)

- 设置多个属性

  ```
  hmset key field1 value1 field2 value2 ...
  ```

- 例2：设置键 `u2` 的属性 `name` 为 `itcast`、属性 `age` 为 11

  ```
  hmset u2 name itcast age 11
  ```

  ![image-20211211220610283](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211220610283.png)



#### 获取

- 获取指定键所有的属性

  ```
  hkeys key
  ```

- 例3：获取键 `u2` 的所有属性

  ```
  hkeys u2
  ```

  ![image-20211211220746516](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211220746516.png)

- 获取一个属性的值

  ```
  hget key field
  ```

- 例4：获取键 `u2` 属性 `name` 的值

  ```
  hget u2 name
  ```

  ![image-20211211220907811](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211220907811.png)

- 获取多个属性的值

  ```
  hmget key field1 field2 ...
  ```

- 例5：获取键 `u2` 属性 `name、age` 的值

  ```
  hmget u2 name age
  ```

  ![image-20211211221039555](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211221039555.png)

- 获取所有属性的值

  ```
  hvals key
  ```

- 例6：获取键 `u2` 所有属性的值

  ```
  hvals u2
  ```

  ![image-20211211221133852](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211221133852.png)



#### 删除 

- 删除整个 `hash` 键及值，使用 `del` 命令

- 删除属性，属性对应的值会被一起删除

  ```
  hdel key field1 field2 ...
  ```

- 例7：删除键 `u2` 的属性 `age`

  ```
  hdel u2 age
  ```

  ![image-20211211221417444](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211221417444.png)



### 列表

- 列表的元素类类型为 string
- 按照插入顺序排序



#### 增加

- 在左侧插入数据

  ```
  lpush key value1 value2 ...
  ```

- 例1：从键为 `a1` 的列表左侧加入数据 `a、b、c

  ```
  lpush a1 a b c
  ```

  ![image-20211211221911076](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211221911076.png)

- 通过 `lrange` 可以查看值：

  ![image-20211211221939939](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211221939939.png)

- 在右侧插入数据

  ```1
  rpush key value1 value2 ...
  ```

- 例2：从键为 `a1` 的列表右侧插入数据 `0 1`

  ```
  rpush a1 0 1 
  ```

  ![image-20211211222123611](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211222123611.png)

- 在指定元素的前或后插入新元素

  ```
  linsert key before 或 after 现有元素 新元素
  ```

- 例3：在键为 `a1` 的列表中元素 `b` 前加入 `3`

  ```
  linsert a1 before b 3
  ```

  ![image-20211211222405628](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211222405628.png)



#### 获取

- 返回列表里指定范围内的元素

  ```
  lrange key start stop
  ```

  - `start、stop` 为元素的下标索引
  - 索引从左侧开始，第一个元素为 0
  - 索引可以是负数，表示从尾部开始计数，如 -1 表示最后一个元素

- 例4：获取键为 `a1` 的列表所有元素

  ```
  lrange a1 0 -1
  ```

  ![image-20211211222716555](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211222716555.png)



#### 设置指定索引位置的元素值

- 索引从左侧开始，第一个元素为 0

- 索引可以是负数，表示从尾部开始计数，如 -1 表示最后一个元素

  ```
  lset key index value
  ```

- 例5：修改键为 `a1` 的列表中下表为 1 的元素值为 `z`

  ```
  lset a 1 z
  ```

  ![image-20211211222958442](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211222958442.png)



#### 删除

- 删除指定元素

  ```
  lrem key count value
  ```

  - 将列表中前 `count` 次出现的值为 `value` 的元素移除
  - `count > 0`：从头往尾移除
  - `count < 0`：从尾往头移除
  - `count = 0`：移除所有

- 例6.1：向列表 `a2` 中加入元素 `a、b、a、b、a、b`

  ```
  lpush a2 a b a b a b
  ```

- 例6.2：从 `a2` 列表右侧开始删除 2 个 `b`

  ```
  lrem a2 -2 b
  ```

- 例6.3：查看列表 `a2`

  ![image-20211211223722406](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211223722406.png)



### set 

- 无序集合
- 元素为 string 类型
- 元素具有唯一性，不重复
- 说明：对于集合没有修改操作



#### 增加

- 添加元素

  ```
  sadd key member1 member2 ...
  ```

- 例1：向键 `a3` 的集合中添加元素 `zhangsan`、`lisi`、`wangwu`

  ```
  sadd a3 zhangsan lisi wangwu
  ```

  ![image-20211211224048870](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211224048870.png)



#### 获取

- 返回所有元素

  ```
  smembers key
  ```

- 例2：获取键 `a3` 的集合中所有元素

  ```
  smembers a3
  ```

  ![image-20211211224202673](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211224202673.png)



#### 删除

- 删除指定元素

  ```
  srem key
  ```

- 例3：删除键 `a3` 的集合中元素 `wangwu`

  ```
  srem a3 wangwu
  ```

  ![image-20211211224323826](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211224323826.png)



### zset

- `sorted set`，有序集合
- 元素为 string 类型
- 元素具有唯一性，不重复
- 每个元素都会关联一个 double 类型的 score，表示权重，通过权重将元素从小到大排序
- 说明：没有修改操作



#### 增加

- 添加

  ```
  zadd key score1 member1 score2 member2
  ```

- 例1：向键 `a4`的集合中添加元素 `lisi`、`zhaoliu`、`zhangsan`，权重分别为 4、5、6、3

  ```
  zadd a4 4 lisi 5 wangwu 6 zhaoliu 3 zhangsan
  ```



#### 获取

- 返回指定范围内的元素
- start、stop 为元素的下标索引
- 索引从左侧开始，第一个元素为 0
- 索引可以是负数，表示从尾部开始计数，如 -1 表示最后一个元素

```
zrange key start stop
```

- 例2：获取键 `a4` 的集合中所有元素

  ```
  zrange a4 0 -1
  ```

  ![image-20211211225112610](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211225112610.png)

- 返回 score 值在 min 和 max 之间

  ```
  zrangebyscore key min max
  ```

- 例3：获取键 `a4` 的集合中权重在 5 和 6 之间的成员

  ```
  zrangebyscore a4 5 6
  ```

  ![image-20211211225531817](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211225531817.png)

- 返回成员 `member` 的 score 值

  ```
  zscore key member
  ```

- 例4：获取键 `a4` 的集合中元素 `zhangsan` 的权重

  ```
  zscore a4 zhangsan 
  ```

  ![image-20211211225724264](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211225724264.png)



#### 删除

- 删除指定元素

  ```
  zrem key member1 member2 ...
  ```

- 例5：删除集合 `a4` 中元素 `zhangsan`

  ```
  zrem a4 zhangsan 
  ```

  ![image-20211211225946482](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211225946482.png)

- 删除权重在指定范围的元素

  ```
  zremrangebyscore key min max
  ```

- 例6：删除集合 `a4` 中权重在 5、6 之间的元素

  ```
  zremrangebyscore a4 5 6
  ```

  ![image-20211211230145801](C:\Users\H\AppData\Roaming\Typora\typora-user-images\image-20211211230145801.png)



































