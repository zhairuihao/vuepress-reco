---
title: String 异步注解 @Async
date: 2020-08-07
tags:
 - java
 - 源码分析
categories:
 - Java
 - spring
---

#  @Async

## @EnableAsync

### AsyncConfigurationSelector

#### ProxyAsyncConfiguration

##### AsyncAnnotationBeanPostProcessor

###### 1. AbstractBeanFactoryAwareAdvisingPostProcessor

###### 1.1. AbstractAdvisingBeanPostProcessor

###### 1.1.1. protected boolean isEligible\(Object bean, String beanName\)  <br/>确定是否需要代理

##### AbstractAsyncConfiguration

## 1\.循环依赖问题, 添加@lazy

## 2\.SimpleAsyncTaskExecutor<br/>为每个任务新起一个线程<br/>默认线程数不做限制<br/>不复用线程<br/><br/>需要指定线程池
