---
layout:     post
title:      "JFinal 技巧收集"
subtitle:   " know more do better "
date:       2017-08-05 14:00:00
author:     "zhairuihao"
header-img: "img/bt-java-1.jpg"
catalog:    false
categories:
 -  Java
tags:
    - Java
    - JFinal
---

# model转map
CPI.getAttrs(getModel(Model.class,""));

# 接收jieson数据
String json = HttpKit.readData(getRequest());
Model obj = FastJson.getJson().parse(json, Model.class); //javabean
Map obj = FastJson.getJson().parse(json, Map.class);    //map
