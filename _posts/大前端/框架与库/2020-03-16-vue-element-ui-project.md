---
layout: article
title: vue 电商后台管理系统
categories: [大前端, 框架与库]
tags: [vue, element-UI]
---

# 项目概述

## 项目结构

- 用户登录退出
- 用户管理
- 权限管理
- 商品管理
- 订单管理
- 数据统计

## 开发模式：前后端分离

<div class="mermaid">
graph LR;
A[用户] --> B[前端项目: 基于Vue技术栈的SPA项目];
B --> C[后端项目];
C --> D[数据库];
</div> 

## 技术选型

### 前端

- Vue
- Vue-router
- Element-UI
- Axios
- Echarts

### 后端
- Node.js
- Express
- Jwt
- Mysql
- Sequelize

# 项目初始化

## 前端环境配置

- 全局安装 Vue-cli 脚手架
- 通过脚手架创建项目
- 配置 Vue 路由
- 配置 Element-UI 组件库
- 配置 axios 库
- 初始化 git 远程仓库
- 将本地项目托管到 github 或码云中

## 后台环境配置

- 安装 MySQL 数据库
- 安装 Node.js 环境
- 配置项目相关信息
- 启动项目
- 使用 Postman 测试后台项目接口是否正常

# 登录退出功能

## 业务流程

- 登录页面输入用户名密码
- 调用后台接口进行验证
- 根据验证结果，跳转到项目主页或显示错误提示信息

## 相关技术点

http 是无状态的，状态保持方案：

1. cookie 在客户端记录状态
2. session 在服务器端记录状态
3. 通过 token 方式维持状态，常用于跨域情形下

### token 原理分析

<div class="mermaid">
sequenceDiagram;
    客户端 ->> 服务器: 登录页面生成用户名和密码登录;
    服务器 -->> 客户端: 服务器验证通过之后生成该用户的 token 并返回;
    客户端 ->> 客户端: 客户端存储该 token;
    客户端 ->> 服务器: 后续所有的请求都携带该 token;
    服务器 -->> 客户端: 服务器验证 token 以确定响应内容;
</div>

## 登录功能实现


