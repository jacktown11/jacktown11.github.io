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

<h1>第六章 优先队列(堆)</h1>

<h3>1. 基本概念</h3>

<p>一种特殊的队列，至少支持两种操作：Insert和DeleteMin；前者插入元素，相当于队列的enqueue,后者查找、删除、返回最小的元素，相当于队列的dequeue。</p>

<h3>2. 二叉</h3>

<ul><li><strong>概念：</strong>
具有结构性质和堆序性质的二叉树（或者说具有堆序性质的完全二叉树）</li><li><strong>性质：</strong><ul><li>结构性质：完全二叉树</li><li>堆序性质：父节点小于任意子节点</li></ul></li><li><strong> 实现方法： </strong>
数组即可， 鉴于其完全二叉树的性质，乘以2可以到达左子节点，除以2可以到达父节点。</li><li><strong> 操作及其时间复杂度： </strong>（后面四种操作需要节点位置信息为基础）<ul><li>Insert:  采用上滤，最坏为O(logN)，平均只要比较2.607次，上移1.607层</li><li>DeleteMin: 采用下滤，最坏为O(logN)，平均为O(logN)</li><li>DecreaseKey: </li><li>IncreaseKey: </li><li>Delete:</li><li>BuildHeap: 空堆N个Insert操作来完成，总运行时间O（N）</li></ul></li></ul>

<h3>3.</h3>

