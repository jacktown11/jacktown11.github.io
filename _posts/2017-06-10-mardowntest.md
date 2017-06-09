---
layout: article
title: 数据结构与算法分析C语言描述 总结笔记 第六章
tag_name: agrithom
backurl: agrithom.html
---
<style>
	table th:nth-child(1){
		
	}
	table th:nth-child(2){
		
	}
</style>

# 第六章 优先队列(堆)
### 1. 基本概念
一种特殊的队列，至少支持两种操作：Insert和DeleteMin；前者插入元素，相当于队列的enqueue,后者查找、删除、返回最小的元素，相当于队列的dequeue。
### 2. 二叉堆
  - **概念：**具有结构性质和堆序性质的二叉树（或者说具有堆序性质的完全二叉树）
  -  **性质：**  sdd
    - 结构性质：完全二叉树
    - 堆序性质：父节点小于任意子节点

  - **实现方法：**数组即可， 鉴于其完全二叉树的性质，乘以2可以到达左子节点，除以2可以到达父节点。
  - **操作及其时间复杂度：**（后面四种操作需要节点位置信息为基础）
	- Insert:  采用上滤，最坏为O(logN)，平均只要比较2.607次，上移1.607层
    - DeleteMin: 采用下滤，最坏为O(logN)，平均为O(logN)
    - DecreaseKey: 
    - IncreaseKey: 
    - Delete:
    - BuildHeap: 空堆N个Insert操作来完成，总运行时间O（N）

### 3. 左式堆
  - 淡淡的
  	- 单独辅导的
  - 地方大
