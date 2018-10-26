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
- 帮助：`\h`或`help`或`help <keyword>`
- 退出：`exit`或`quit`
- 命令以`\g`或`;`结束

# 第三章 使用MySQL

## 连接到MySQL

- 需要提供主机名、端口、用户名、口令
- MySQL内部有用户列表，各用户有相应的权限；管理登录（root）由于有完全的权限，因此受到密切保护

## 选择数据库与查看内部信息

- `SHOW DATABASES;`，显示所有可用数据库的列表
- `USE databasex;`，选择指定名称的数据库
- `SHOW TABLES;`，显示所有选定的数据库内的可用表的列表
- `SHOW COLUMNS FROM tablex;`，显示给定名称的表的列信息

# 第四章 检索数据

- `SELECT` columnx `FROM` tablex，从某表中检索给定列名的一列
- SELECT column1`,`column2 FROM tablex，从某表中检索给定列名的多列
- SELECT `*` FROM tablex，从某表中检索给定列名的列
- SELECT `DISCTINCT` column1,column2 FROM tablex，从某表中检索给定列名的多列去重后的结果（重复是指被检索的各列都相同）
- SELECT column FROM tablex `LIMIT` count，从某表中检索给定列名的一列，结果最多count条
- SELECT column FROM tablex `LIMIT` pos, count，从某表中检索给定列名的一列，结果为pos位置之后（不含）的最多count条
- SELECT tablex`.`columnx FROM databasex`.`tablex，列和表都可以选择性地使用完全限定的写法

# 第五章 排序检索数据

`子句`（clause），SQL语句由某些必须的和可选的子句组成，一个子句通常由一个关键字和所提供的数据组成，子句的例子：FROM子句。

`ORDER BY`子句，用于按照一个或多个列对输出进行排序的子句。

- SELECT columnx FROM tablex `ORDER BY` columny，检索出指定列并给定列排序（用于排序的列可能是非检索的）
- SELECT columnx FROM tablex `ORDER BY` column1,column2，检索出指定列并给定的多个列排序（先按column1排序，column1存在重复项再按column2排序）
- SELECT columnx FROM tablex ORDER BY column1 `DESC`,column2，检索出指定列并给定的多个列排序（先按column1降序排序，column1存在重复项再按column2升序（默认）排序）。注意降序`DESC`和升序`ASC`需要逐个指定到作为排序根据的各个列后。


