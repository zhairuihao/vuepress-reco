---
layout:     post
title:      "树形结构数据存储方案"
subtitle:   "..."
date:       2017-08-26 12:00:00
author:     "zhairuihao"
header-img: "img/post-bg-2015.jpg"
catalog:    true
categories:
    - database
tags:
    - mysql
    - 数据结构
---

> [资料](http://blog.csdn.net/biplusplus/article/details/7433625)

### 嵌套集

<br>在基于数据库的一般应用中，查询的需求总要大于删除和修改。为了避免对于树形结构查询时的“递归”过程，基于Tree的前序遍历设计一种全新的无递归查询、无限分组的左右值编码方案，来保存该树的数据。
```sql
CREATE TABLE Tree(
    Node_id INT NOT NULL PRIMARY KEY,
    Name VARCHAR(600) NOT NULL,
    Lft INT NOT NULL,
    rgt INT NOT NULL,
);
```

* 获取某个节点下的所有子孙节点
```sql
SELECT * FROM Tree WHERE Lft > 2 AND Lft < 11 ORDER BY Lft ASC
```

* 获取子孙节点总数
<br>子孙总数 = (右值–左值–1)/2
* 获取节点在树中所处的层数
```sql
SELECT COUNT(*) FROM Tree WHERE Lft <= 2 AND Rgt >=11
```

* 获取当前节点所在路径
```sql
SELECT * FROM Tree WHERE Lft <= 2 AND Rgt >=11 ORDER BY Lft ASC
```

<br>在日常的处理中我们经常还会遇到的需要获取某一个节点的直属上级、同级、直属下级。为了更好的描述层级关系，我们可以为Tree建立一个视图，添加一个层次列，该列数值可以编写一个自定义函数来计算：
```sql
CREATE FUNCTION `CountLayer`(`_node_id` int)
 RETURNS int(11)
BEGIN
    DECLARE _result INT;
    DECLARE _lft INT;
    DECLARE _rgt INT;
    IF EXISTS(SELECT Node_id FROM Tree WHERE Node_id = _node_id)
    THEN
        SELECT Lft,Rgt FROM Tree WHERE Node_id = _node_id INTO _lft,_rgt;
        SET _result = (SELECT COUNT(1) FROM Tree WHERE Lft <= _lft AND Rgt >= _rgt);
        RETURN _result;
    ELSE
        RETURN 0;
    END IF;
END;
```

<br>在添加完函数以后，我们创建一个a视图，添加新的层次列：

```sql
CREATE VIEW `NewView`AS
SELECT Node_id, Name, Lft, Rgt, CountLayer(Node_id) AS Layer FROM Tree ORDER BY Lft ;
```

* 获取当前节点父节点
```sql
SELECT * FROM treeview WHERE Lft <= 2 AND Rgt >=11 AND Layer=1
```

* 获取所有兄弟节点
```sql
SELECT * FROM treeview WHERE Rgt > 11 AND Rgt < (SELECT Rgt FROM treeview WHERE Lft <= 2 AND Rgt >=11 AND Layer=1) AND Layer=2
```

* 返回所有叶子节点
```sql
SELECT * FROM Tree WHERE Rgt = Lft + 1
```

* 如何创建树如何新增数据
<br>上面已经介绍了如何检索结果，那么如何才能增加新的节点呢？Nested set 最重要是一定要有一个根节点作为所有节点的起点，而且通常这个节点是不被使用的。为了便于控制查询级别，在建表的时候建议添加parent_id配合之联结列表方式一起使用。
```sql
CREATE TABLE IF NOT EXISTS `Tree` (
  `node_id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL,
  `lft` int(11) NOT NULL DEFAULT '0',
  `rgt` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`node_id`),
  KEY `idx_left_right` (`lft`,`rgt`)
) DEFAULT CHARSET=utf8;
```

```sql
INSERT INTO `Tree` (parent_id,name,lft,rgt) VALUES ( 0,'Food',1,2)
```

* 添加子节点（子节点起始处）
```sql
LOCK TABLE Tree WRITE;
SELECT @parent_id := node_id, @myLeft := lft FROM Tree WHERE name = 'Food';
UPDATE Tree SET rgt = rgt + 2 WHERE rgt > @myLeft;
UPDATE Tree SET lft = lft + 2 WHERE lft > @myLeft;
INSERT INTO Tree(parent_id, name, lft, rgt) VALUES(@parent_id, 'Fruit', @myLeft + 1, @myLeft + 2);
UNLOCK TABLES;
```

* 在末尾追加
```sql
LOCK TABLE Tree WRITE;
SELECT @parent_id := node_id , @myRight := rgt FROM Tree WHERE name = 'Red';
UPDATE Tree SET rgt = rgt + 2 WHERE rgt >= @myRight;
UPDATE Tree SET lft = lft + 2 WHERE lft > @myRight;
INSERT INTO Tree(parent_id, name, lft, rgt) VALUES(@parent_id, 'Apple', @myRight, @myRight + 1);
UNLOCK TABLES;
```

* 在节点A后面添加同级节点
```sql
LOCK TABLE Tree WRITE;
SELECT @parent_id := parent_id , @myRight := rgt FROM Tree WHERE name = 'Yellow';
UPDATE Tree SET rgt = rgt + 2 WHERE rgt > @myRight;
UPDATE Tree SET lft = lft + 2 WHERE lft > @myRight;
INSERT INTO Tree(parent_id, name, lft, rgt) VALUES(@parent_id, 'Green', @myRight+1, @myRight+2);
UNLOCK TABLES;
```

* 删除节点（包含子节点）
```sql
LOCK TABLE Tree WRITE;
SELECT @myLeft := lft , @myRight := rgt FROM Tree WHERE name = 'Apple';
DELETE Tree WHERE lft >= @myLeft AND rgt <= @myRight;
UPDATE Tree SET lft = lft - (@myRight - @myLeft) - 1 WHERE lft > @myRight;
UPDATE Tree SET rgt = rgt - (@myRight - @myLeft) - 1 WHERE rgt > @myRight;
UNLOCK TABLES;

LOCK TABLE Tree WRITE;
SELECT @parent_id := parent_id , @node_id :=node_id , @myLeft := lft , @myRight := rgt FROM Tree WHERE name = 'Red';
UPDATE Tree SET parent_id = @parent_id WHERE  parent_id = @node_id
DELETE Tree WHERE lft = @myLeft;
UPDATE Tree SET lft = lft - 1,rgt = rgt-1 Where lft > @myLeft AND @rgt < @myRight
UPDATE Tree SET lft = lft - 2,rgt = rgt-2 Where lft > @rgt > @myRight
UNLOCK TABLES;
```

<br>以上为Nested Set的CURD操作，具体在使用时建议结合事务和存储过程一起使用。本方案的优点时查询非常的方便，缺点就是每次插入删除数据涉及到的更新内容太多，如果树非常大，插入一条数据可能花很长的时间。

### 闭包表

<br>将Closure Table翻译成闭包表不知道是否合适，闭包表的思路和物化路径差不多，都是空间换时间，Closure Table，一种更为彻底的全路径结构，分别记录路径上相关结点的全展开形式。能明晰任意两结点关系而无须多余查询，级联删除和结点移动也很方便。但是它的存储开销会大一些，除了表示结点的Meta信息，还需要一张专用的关系表
```sql
CREATE TABLE nodeInfo (
    node_id INT NOT NULL AUTO_INCREMENT,
    node_name VARCHAR (255),
    PRIMARY KEY (`node_id`)
) DEFAULT CHARSET = utf8;


CREATE TABLE nodeRelationship (
    ancestor INT NOT NULL,
    descendant INT NOT NULL,
    distance INT NOT NULL,
    PRIMARY KEY (ancestor, descendant)
) DEFAULT CHARSET = utf8;
```

>其中
Ancestor代表祖先节点
Descendant代表后代节点
Distance 祖先距离后代的距离

* 添加数据（创建存储过程）
```sql
CREATE DEFINER = `root`@`localhost` PROCEDURE `AddNode`(`_parent_name` varchar(255),`_node_name` varchar(255))
BEGIN
    DECLARE _ancestor INT;
    DECLARE _descendant INT;
    DECLARE _parent INT;
    IF NOT EXISTS(SELECT node_id From nodeinfo WHERE node_name = _node_name)
    THEN
        INSERT INTO nodeinfo (node_name) VALUES(_node_name);
        SET _descendant = (SELECT node_id FROM nodeinfo WHERE node_name = _node_name);
        INSERT INTO noderelationship (ancestor,descendant,distance) VALUES(_descendant,_descendant,0);
        IF EXISTS (SELECT node_id FROM nodeinfo WHERE node_name = _parent_name)
        THEN
            SET _parent = (SELECT node_id FROM nodeinfo WHERE node_name = _parent_name);
            INSERT INTO noderelationship (ancestor,descendant,distance) SELECT ancestor,_descendant,distance+1 from noderelationship where descendant = _parent;
        END IF;
    END IF;
END;
```

* 查询Fruit下所有的子节点

```sql
SELECT
    n3.node_name
FROM
    nodeinfo n1
INNER JOIN noderelationship n2 ON n1.node_id = n2.ancestor
INNER JOIN nodeinfo n3 ON n2.descendant = n3.node_id
WHERE
    n1.node_name = 'Fruit'
AND n2.distance != 0
```

* 查询Fruit下直属子节点

```sql
SELECT
    n3.node_name
FROM
    nodeinfo n1
INNER JOIN noderelationship n2 ON n1.node_id = n2.ancestor
INNER JOIN nodeinfo n3 ON n2.descendant = n3.node_id
WHERE
    n1.node_name = 'Fruit'
AND n2.distance = 1
```

* 查询Fruit所处的层级
```sql
SELECT
    n2.*, n3.node_name
FROM
    nodeinfo n1
INNER JOIN noderelationship n2 ON n1.node_id = n2.descendant
INNER JOIN nodeinfo n3 ON n2.ancestor = n3.node_id
WHERE
    n1.node_name = 'Fruit'
ORDER BY
    n2.distance DESC
```

over

