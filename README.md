# canvas事件模拟
### 引用内容请注明原作者位置 bigfairy-Jing
# canvasEvent
* 小部件取名为 widget
* 舞台取名为 Mural

# 当前canvas 监听canvas方式为像素法则

# 未做一些兼容性处理 
* e = e || window.event
* OffscreenCanvas
* ...

### 监听罗列
* isPointInPath + Path2D  API (存在极大的兼容性)
* 角度法
* 射线法
* 像素法

### 参考文档
* https://juejin.cn/post/6888209975965909000
* https://juejin.cn/post/6844903847492583438
* https://blog.csdn.net/qq_21118431/article/details/102486276?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control&dist_request_id=&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control

### 所有说明
* [info](./info.md)