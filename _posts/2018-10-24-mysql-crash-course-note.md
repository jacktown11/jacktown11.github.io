---
layout: article
title: 《mysql必知必会》笔记
categories: [草稿]
tags: [mysql]
---

# 第一章 了解SQL

一些基本的数据库术语：

- `数据库`（database）：保存有组织的数据的容器（通常是一个文件或一组文件）
- `表`（table）：某种特定类型数据的结构化清单
- `模式`（schema）:关于数据库和表的布局及特性的信息
- `列`（column）：表中的一个字段；所有表都是由一个或多个列组成
- `数据类型`（datatype）：所容许的数据的类型；每个表列都有相应的数据类型，它限制`（或容许）该列中存储的数据
- `行`（row）：表中的一个记录
- `主键`（primary key）：一列（或一组列），其值能够唯一区分表中每个行
- `SQL`（Structured Query Language）：结构化查询语言，一种专门用来与数据库通信的语言

# 第二章 MySQL简介

## 什么是MySQL

MySQL是一种数据库软件（DBMS，Database Management System，数据库管理系统），负责数据的所有存储、检索、管理与实际处理，即通过它与数据库（`database`）交互。

DBMS分类：

- 基于文件系统的DBMS（如Microsoft Access）
- 基于客户机-服务器的DBMS（如MySQL、Oracle、Microsoft SQL Server）

## 基于客户机-服务器的DBMS

- 服务器软件：如MySQL
- 客户机
    * 各种工具：如MySQL Administrator、MySQL Query Browser、SQLyog
    * 脚本语言：如Perl
    * Web应用开发语言：如ASP、JSP、PHP
    * 程序设计语言：如Java、C、C++

## MySQL客户机工具

- 命令行实用程序
- MySQL Administrator
- MySQL Query Browser

### MySQL命令行入门

- 登录；`mysql -u username -p`
- 帮助：`\h`或`help`或`help 关键字`
- 退出：`exit`或`quit`
- 命令以`\g`或`;`结束

# 第三章 使用MySQL

## 连接到MySQL

- 需要提供主机名、端口、用户名、口令
- MySQL内部有用户列表，各用户有相应的权限；管理登录（root）由于有完全的权限，因此受到密切保护

## 选择数据库与查看内部信息

- **`SHOW DATABASES;`**，显示所有可用数据库的列表
- **`USE databasex;`**，选择指定名称的数据库
- **`SHOW TABLES;`**，显示所有选定的数据库内的可用表的列表
- **`SHOW COLUMNS FROM tablex;`**，显示给定名称的表的列信息

# 第四章 检索数据

- **`SELECT` columnx `FROM` tablex**，从某表中检索给定列名的一列
- **SELECT column1`,`column2 FROM tablex**，从某表中检索给定列名的多列
- **SELECT `*` FROM tablex，从某表中检索给定列名的列
- **SELECT `DISCTINCT` column1,column2 FROM tablex**，从某表中检索给定列名的多列去重后的结果（重复是指被检索的各列都相同）
- **SELECT column FROM tablex `LIMIT` count**，从某表中检索给定列名的一列，结果最多count条
- **SELECT column FROM tablex `LIMIT` pos, count**，从某表中检索给定列名的一列，结果为pos位置之后（不含）的最多count条
- **SELECT tablex`.`columnx FROM databasex`.`tablex**，列和表都可以选择性地使用完全限定的写法

# 第五章 排序检索数据

`子句`（clause），SQL语句由某些必须的和可选的子句组成，一个子句通常由一个关键字和所提供的数据组成，子句的例子：FROM子句。

`ORDER BY`子句，用于按照一个或多个列对输出进行排序的子句。

- **SELECT columnx FROM tablex `ORDER BY` columny**，检索出指定列并给定列排序（用于排序的列可能是非检索的）
- **SELECT columnx FROM tablex `ORDER BY` column1,column2**，检索出指定列并给定的多个列排序（先按column1排序，column1存在重复项再按column2排序）
- **SELECT columnx FROM tablex ORDER BY column1 `DESC`,column2**，检索出指定列并给定的多个列排序（先按column1降序排序，column1存在重复项再按column2升序（默认）排序）。注意降序`DESC`和升序`ASC`需要逐个指定到作为排序根据的各个列后。

# 第六章 过滤数据（1）

使用`WHERE`子句给定搜索条件（过滤条件）。

## 格式

- **SELECT columnx FROM tablex `WHERE 条件`**

其中的条件可以使用如下的一些操作符：

|操作符 |含义 |
|-|-|
|`=` |相等（可以用于字符串） |
|`<>` |不等于 |
|`!=` |不等于 |
|`<` |小于 |
|`<=` |小于等于 |
|`>` |大于 |
|`>=` |大于等于 |
|`BETWEEN a AND b` |在区间[a,b]中 |

## 空值检查

- **SELECT columnx FROM tablex WHERE columny `IS NULL`**

`NULL`不同于0、空串或空格，它表示无值（no value）。要注意：在过滤选择具有特定值或不具有特定值的行时，都不会返回具有`NULL`值的行。

# 第七章 过滤数据（2）

- **SELECT columnx FROM tablex WHERE 条件1 `AND` 条件2**，多重条件与过滤
- **SELECT columnx FROM tablex WHERE 条件1 `OR` 条件2**，多重条件或过滤
- `AND`优先级高于`OR`,可以通过圆括号`()`改变条件计算次序
- **SELECT columnx FROM tablex WHERE columny `IN` (值1, 值2, 值3)**，筛选某列值在备选值中的条目
- **SELECT columnx FROM tablex WHERE `NOT` 条件**，对其后的条件（`IN`、`BETWEEN`、`EXISTS`）取反

# 第八章 用通配符进行过滤

**通配符**（wildcard），用来匹配值的一部分的特殊字符。

**搜素模式**（search pattern），由字面值、通配符或两者组合构成的搜索条件。

- **SELECT columnx FROM tablex WHERE columny `LIKE` 搜索模式**，筛选某列符合给定搜索模式的条目

两种通配符：

- `%`，匹配0或多个任意字符
- `_`，匹配1个任意字符

# 第九章 用正则表达式进行搜索

- **SELECT columnx FROM tablex WHERE columny `REGEXP` 正则表达式**

MySQL中正则表示式中特殊字符需要双重转义（js注释：好比js中通过`new RegExp(regstr)`的方式建立正则表达式一样，另外MySQL中的字符类和词开头结尾定位符和js明显不同）

# 第十章 创建计算字段

**字段**（field），基本与列同意，常互换使用，字段更多用在计算字段的连接上。

**拼接**（concatenate），把值联结到一起构成单个值。

**别名**（alias），一个字段或值的替换名。

- **SELECT `计算字段 AS 别名` FROM tablex**，将搜索结果，通过算术运算（加减乘除）和函数（`Concat()`、`Trim()`）等得到新字段，同时为计算字段添加别名

# 第十一章 使用数据处理函数

MySQL提供了一系列数据处理函数：

- 文本处理函数，如 `Upper()`、`Trim()`、`LTrim()`
- 日期与时间处理函数，如`Date()`返回`yyyy-mm-dd`格式的日期、`Year()`返回完整年份
- 数值处理函数，如`Abs()`、`Sin()`、`Sqrt()`

# 第十二章 汇总数据

**聚集函数**（aggregate function），运行在行组上，计算和返回单个值的函数。

|聚集函数|解释|
|- |- |
|`AVG()` |平均值，忽略`NULL`行 |
|`COUNT()` |条目数，列名参数时忽略`NULL`行，`*`参数时计算所有行 |
|`MAX()` |最大值，忽略`NULL`行 |
|`MIN()` |最小值，忽略`NULL`行 |
|`SUM()` |求和，忽略`NULL`行 |

- 在列名参数前加上`DISTINCT`(默认为`ALL`)时，只聚集不同的值
- 可以组合使用聚集函数，也可与算术操作符配合

# 第十三章 分组数据

- `GROUP BY`子句可以让聚集函数在根据给定的列分组以后，再分别计算各个分组
- `HAVING`子句可以对分组后的计算结果再次筛选（而不是像`WHERE`那样过滤原始数据行本身）
- `GROUP BY`分组计算结果本身是不排序的，为此可以再使用`ORDER BY`对计算结果排序

## GROUP BY使用注意事项

- `GROUP BY`子句可以包含任意数量的列，从而允许嵌套
- 嵌套的分组，数据将在最后规定的分组上汇总
- `GRUOP BY`子句列出的列必须是有效的表达式或建所列（但不能是聚集函数）；`SELECT`中使用表达式，则必须在`GROUP BY`中指定相同的表达式，不能使用别名
- 除聚集计算语句外，`SELECT`语句的每个列必须在`GROUP BY`子句中给出
- 如果分组列包含`NULL`值，那么将各`NULL`行一起作为一个分组
- `GROUP BY`放在`WHERE`之后，`ORDER BY`之前

## SELECT子句顺序

|子句|说明|是否必须使用|
|- |- |- |
|`SELECT`   |要返回的列或表达式 |是 |
|`FROM`     |从中检索数据的表 |仅在从表选择数据时使用 |
|`WHERE`    |行级过滤     |否 |
|`GROUP BY` |分组说明     |仅在按组计算聚集时使用 |
|`HAVING`   |组级过滤     |否 |
|`ORDER BY` |输出排序顺序 |否 |
|`LIMIT`    |要检索的行数 |否 |

# 第14章 使用子查询

- **SELECT 列x FROM 表 WHERE 列y IN (`SELECT 列y ...`)**，使用子查询进行过滤
- **SELECT 列x, `(SELECT COUNT(*) FROM 表2 WHERE 表2.列y = 表1.列y)` AS 列名 FROM 表1**，使用子查询得到计算字段

# 第15章 联结表

**外键**（foreign key），某个表中的一列，它包含另一个表的主键值，定义了两个表之间的关系。

**可伸缩性**（scale），能够适应不断增加的工作量而不失败。设计良好的数据库或应用程序称之为可伸缩性好。

- **SELECT 列x FROM 表1,表2 WHERE 表1.列x=表2.列x**，联结多个表同时查询
- **SELECT 列x FROM 表1 `INNER JOIN` 表2 ON 表1.列x=表2.列x**，对于等值联结（内部联结），可以使用`INNER JOIN`和`ON`关键字

# 第16章 创建高级联结

除了**内部联结**，还有**自联结**、**自然联结**、**外部联结**这些高级联结。

- 为了方便查询，可以用`AS`给表取别名，该别名用于查询并不返回给客户机
- **SELECT 列x FROM `表1 AS A,表1 AS B` WHERE A.列y=B.列y AND B.列z=某值**，自联结
- 自然联结
- **SELECT 列x FROM `表1 LEFT OUTER JOIN 表2` ON 表1.列y=表2.列y**，外部联结，可用来保证在表1中的行都被检出（即使该行对应的作为联结条件的列在表2中没有出现），而`RIGHT OUTER JOIN`则保证表2都被检出
- 联结可以和聚集函数一起使用

# 第17章 组合查询

- **SELECT语句1 `UNION` SELECT语句2**，将多条查询语句的汇总成一个结果集
- 注意事项
    * 各条查询语句的结果列应该是相同的列、表达式或聚集函数，数据类型应该兼容
    * 使用`UNION ALL`可以放弃去重的默认行为
    * `ORDER BY`语句应该只出现一次，放在最后

# 第18章 全文本搜索

- 全文本搜索优势：性能、明确控制、智能化结果
- 启用全文本搜索：创建表示使用`FULLTEXT`子句
- **SELECT 列1 FROM 表1 WHERE `Match(列名) Against(搜索表达式)`**，使用全文本搜索
- **SELECT 列1 FROM 表1 WHERE Match(列名) Against(搜索表达式 `WITH QUERY EXPANSION`)**，使用查询扩展以匹配更多的可能相关的行
- **SELECT 列1 FROM 表1 WHERE Match(列名) Against(`可带全文本布尔操作符的搜索表达式 IN BOOLEAN MODE`)**，使用布尔文本搜索，以实现必须匹配、必须不匹配、等级提示、分组等更智能的搜索，全文本布尔操作符包括`+ - < > () ~ * ""`，布尔方式不对结果排序

# 第19章 插入数据

- **`INSERT INTO` 表1 (以逗号分隔的各列名) VALUES (以逗号分隔的各列值),(以逗号分隔的各列值)**，向表中插入一至多行，那些有默认值或运行NULL值的列可以省略
- **`INSERT` INTO 表1 (以逗号分隔的各列名) `SELECT` 检索列名 FROM 表2**，将查询结果插入表，检索列名不需要和插入的列名保持一致，重要的只是顺序

# 第20章 更新和删除数据

- **`UPDATE` 表1 `SET` 列1=值1,列2=值2 WHERE子句**，更新过滤出的行的指定列的数据 
- **`DELETE FROM` 表1 WHERE子句**，删除某些行

# 第21章 创建和操纵表

## 创建表

```mysql
CREATE TABLE customers
(
  cust_id      int       NOT NULL AUTO_INCREMENT,
  cust_name    char(50)  NOT NULL ,
  cust_address char(50)  NULL ,
  cust_city    char(50)  NULL ,
  cust_state   char(5)   NULL ,
  cust_zip     char(10)  NULL ,
  cust_country char(50)  NULL ,
  cust_contact char(50)  NULL ,
  cust_email   char(255) NULL ,
  PRIMARY KEY (cust_id)
) ENGINE=InnoDB;
```

以上是一个创建表的示例：

- 以`CREATE TABLE 表名`其实，各列需要给出`列名`、`数据类型`
- `NULL`和`NOT NULL`指定该列是否可以是`NULL`值，不给该关键字时默认情况下是`NULL`
- `PRIMARY KEY`指定主键，必须是唯一的；可以用多个列做主键，此时多个列的组合必须唯一，主键列必须是非`NULL`的
- `AUTO INCREMENT`使得某列在添加新行时自动递增（缺省时），该列必须被索引（如被作为主键）
- `DEFAULT 默认值`可以指定某列的默认值
- `ENGINE=引擎`指定引擎类型，如下是几种引擎简介：
    * `InnoDB`，一个可靠的事务处理引擎，不支持全文本搜索
    * `MEMORY`，功能等同于`MyISAM`，但数据存储在内存而不是磁盘中，速度快（适合临时表）
    * `MyISAM`，性能极高，支持全文本搜索，不支持事务处理

## 更新表

- **`ALTER` TABLE 表1 `ADD` 列名 数据类型**，添加新列
- **`ALTER` TABLE 表1 `DROP COLUMN` 列1**，输出列
- 定义外键等

## 删除表

- **`DROP` TABLE 表名**，删除

## 重命名表

- **`RENAME` TABLE 新表名 `TO` 旧表名**，重命名

# 第22章 使用视图

视图一种虚拟的表，它本身不包含任何的列或数据，而是根据需要检索数据的查询。其用处：

- 重用`SQL`语句
- 简化复杂`SQL`语句
- 使用表的组成部分而不是整个表
- 保护数据
- 更改数据格式和表示

主要使用：

- `CREATE VIEW 视图名 AS`，创建视图
- `SHOW CREATE VIEW 视图名`，查看创建视图的语句
- `DROP VIEW 视图名`，删除视图
- 更新视图：先`DROP`再`CREATE`，或者`CREATE OR REPLACE VIEW`直接创建（若存在则覆盖）

创建视图后，可以像查表一样使用`SELECT`语句；视图是否可更新（`INSERT`、`UPDATE`、`DELETE`）要依情况而定。

# 第23章 使用存储过程

存储过程为以后使用而保存的一条或多条`MySQL`语句的集合；类似批文件，作用不仅限于批处理；有点：简单、安全、高性能。

## 存储过程使用案例

```sql
DROP PROCEDURE IF EXISTS ordertotal ;
DELIMITER //
CREATE PROCEDURE ordertotal(
	IN onumber INT,
	OUT ototal DECIMAL(8,2)
)
BEGIN
	SELECT SUM(item_price * quantity) INTO ototal FROM orderitems WHERE order_num = onumber;
END //
DELIMITER ;

CALL ordertotal(20005, @total);
SELECT @total;
```

- 第一行是删除存储过程，`IF EXISTS`使得在本不存在的情况下不会报错
- `DELIMITER //`，暂时性切换`MySQL`语句分隔符，以使得存储过程内部的分隔符能够顺利传递给引擎。
- 存储过程可以传参，`IN`为传入存储过程的参数，`OUT`为从存储过程传出，甚至可以使用`INOUT`；参数类型和表创建时可用的数据类型相同（不能使用记录集）
- 实际的存储过程中使用了`INTO`将结果传递给`OUT`参数
- `CALL`语句传参调用调用了存储过程，调用中`OUT`参数须以`@`开头
- 最后的`SELECT`语句获取了调用结果

## 智能存储过程

```sql
DROP PROCEDURE IF EXISTS ordertotal;
DELIMITER //
CREATE PROCEDURE ordertotal(
	IN onumber INT,
	IN taxable BOOLEAN,
	OUT ototal DECIMAL(8,2)
)
BEGIN
	DECLARE total DECIMAL(8,2);
	DECLARE taxrate INT DEFAULT 6;
	SELECT SUM(item_price * quantity) INTO total FROM orderitems WHERE order_num = onumber;
	IF taxable THEN 
		SELECT total + (total * taxrate /100 ) INTO total;
	END IF;
	SELECT total INTO ototal;
END //
DELIMITER ;

CALL ordertotal(20005, 0, @ototal);
SELECT @ototal;
CALL ordertotal(20005, 1, @ototal);
SELECT @ototal;
```

上面这个示例，内部使用了`DECLARE`定义局部变量、 `IF`进行逻辑判断以实现更复杂的功能。

## 检查存储过程

- **SHOW CREATE PROCEDURE 存储过程名**，显示存储过程的创建语句
- **SHOW PROCEDURE STATUS**，显示存储过程创建时间、创建者等更详细信息


