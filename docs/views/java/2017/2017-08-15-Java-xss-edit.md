---
layout:     post
title:      "Java项目的跨域脚本攻击的整改"
subtitle:   " ----xss攻击 "
date:       2017-08-15 14:33:00
author:     "zhairuihao"
header-img: "img/head-xss.jpg"
catalog:    true
categories:
    - Java
tags:
    - Java
    - XSS
---

> 工作经历， 老项目的漏洞整改。
没有文档，也没有源码，这个痛苦，啧啧！

<b>背景篇</b>

##  XSS 简介
<br> XSS攻击全称跨站脚本攻击，是为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为XSS，XSS是一种在web应用中的计算机安全漏洞，它允许恶意web用户将代码植入到提供给其它用户使用的页面中。
<br> XSS是一种经常出现在web应用中的计算机安全漏洞，它允许恶意web用户将代码植入到提供给其它用户使用的页面中。比如这些代码包括HTML代码和客户端脚本。攻击者利用XSS漏洞旁路掉访问控制——例如同源策略(same origin policy)。这种类型的漏洞由于被黑客用来编写危害性更大的网络钓鱼(Phishing)攻击而变得广为人知。对于跨站脚本攻击，黑客界共识是：跨站脚本攻击是新型的“缓冲区溢出攻击“，而JavaScript是新型的“ShellCode”。

## 整改项目的背景
<br> SSH 项目为主的 web 管理系统

## 案例
<br> 通过修改url参数的方式进行xss攻击
<br> example : http:xxxxxx.xxx/xxx?v=asd'script脚本'

<b>解决方案篇</b>
## 解决思路
<br> 通过 severlet 的 filter机制对所有的入参进行过滤，(也可一通过struts2 的拦截器实现)，通过正则来实现特殊字符的过滤，将存在特殊字符的情况进行跳转， 设置xssIn.html页面 来接受所有的xss攻击。
