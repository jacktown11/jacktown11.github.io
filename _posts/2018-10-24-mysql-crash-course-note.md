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


