一、mysql的概念：
    * 数据库-表-字段（表的标题行的每个标题）
    * 记录（每一行数据）
二、mysql的使用
    1.连接数据库 
        （1）wampserver-mysql-mysql.console-mysql>
    2.数据库的操作
        建数据库
        建表
    3.数据库表的数据的操作（增删改查）
        * 增加 insert into 表名 （字段名） values （值）
        * 删除 delete from 表名 where 条件
        * 更改
            UPDATE student set 字段="属性值" where 条件
        * 查询 select 字段1,字段2 from 表名 
            [* 代表全部字段]
            (0) where 条件
                select 字段1,字段2 from 表名 where 条件
            (1) ORDER BY 字段 
            SELECT * FROM 表名 ORDER BY 字段 
                * 升序排列
                * desc 降序排列
            （2）LIMIT idx,qty：数量控制
            SELECT * FROM 表名 LIMIT idx,qty
三、导入向导
    1.在数据库先设计好表，再将excel表导入（低版本的excel）
    2.数据库的字段跟excel表要对应。










**.exe  //***不是内部或外部命令：
1.若想在任意目录下打开一个exe文件，必须配置环境变量path。每个路径是用;隔开
    * 电脑-属性-高级系统设置-环境变量-path    
        * 用户变量 
        * 系统变量
2.将该exe所在文件 C:\wamp64\bin\mysql\mysql5.7.14\bin
    
