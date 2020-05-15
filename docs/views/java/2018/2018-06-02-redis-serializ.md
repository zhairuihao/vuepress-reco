---
layout:     post
title:      "Redis 持久化的存储"
subtitle:   " know more do better "
date:       2018-06-02
author:     "zhairuihao"
header-img: "img/bt-java-1.jpg"
catalog:    false
categories:
    - Java
    - redis
tags:
    - Java
    - redis
    - serializ
---


> 刚过完六一，出来皮一下
记录下工作的问题和解决方法

## msgpack了解一下 

```

import java.io.IOException;

import org.msgpack.MessagePack;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.SerializationException;
/**
 * redis msgpack 序列化
 *  可有效减小内存占用
 * @author Administrator
 *
 * @param <T>
 */
public class MsgPackRedisSerializer<T> implements RedisSerializer<T> {

    private MessagePack msgPack;

    public MsgPackRedisSerializer(MessagePack msgPack) {
		super();
		this.msgPack = msgPack;
	}

	public MsgPackRedisSerializer() {
		super();
	}

	@Override
	public byte[] serialize(T t) throws SerializationException {
        if(t==null) {
            return new byte[0];
        }  
        msgPack = new MessagePack();
        
        try {
            return msgPack.write(t);
        } catch (IOException e) {
            e.printStackTrace();
            return new byte[0];
        }
    }

    @SuppressWarnings("unchecked")
    @Override
	public T deserialize(byte[] bytes) throws SerializationException {
    	if(bytes==null) {
            return null;
        }  
    	msgPack = new MessagePack();
        try {
            T t = (T)msgPack.read(bytes,ObjectTemplate.getInstance());
            return t;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}

```