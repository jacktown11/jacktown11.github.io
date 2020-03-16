---
layout: article
title: mysql 杂记
categories: [后端, mysql]
tags: []
---

# windows 安装 mysql

- [菜鸟教程](https://www.runoob.com/mysql/mysql-install.html)
- [MySQL的安装与配置——详细教程](https://www.cnblogs.com/winton-nfs/p/11524007.html)

# 命令行执行 mysql

`source <文件路径>` 如 `source D:\mydb.sql`

# Client does not support authentication protocol requested by server; consider upgrading MySQL client

新版本的 mysql 的认证加密规则由改变引起的，可命令行登录 mysql 依次执行如下命令解决：

- `use mysql;`
- `alter user 'root'@'localhost' identified with mysql_native_password by '********';`
- `flush privileges;`

参考文章：
- [简化版](https://www.cnblogs.com/zichuan/p/9203129.html)
- [详细版](https://blog.csdn.net/qq_38455201/article/details/83024357)

