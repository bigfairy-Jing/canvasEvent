### canvas事件模拟

### 一.预览demo
1. demo 运行方式
* npm install
* npm run dev

2. demo 预览图片
![预览图片](./static/预览.gif)

### 前置

> 关于canvas事件模拟方式罗列

1. isPointInPath + Path2D  API (存在极大的兼容性)
  * CanvasRenderingContext2D.isPointInPath()是 Canvas 2D API 用于判断在当前路径中是否包含检测点的方法。
  * 方法: CanvasRenderingContext2D.isPointInPath(x, y, fillRule, path)
  * 参数fillRule: 用来决定点在路径内还是在路径外的算法。 [nonzero: 非零环绕规则(默认), evenodd: 奇偶环绕规则]
  * path Path2D应用的路径
  * 返回值：一个Boolean值，当检测点包含在当前或指定的路径内，返回 true；否则返回 false。

2. 角度法
  * 说明：如果一个点在多边形内部，则该点与多边形所有顶点两两构成的夹角，相加应该刚好等于360°。 ![图示](./static/角度法.png)
  * 局限性： 图形必须是凸多边形,其他类型的图形都不可以。

3. 射线法
  * 说明：判断点与多边形一侧的交点个数为奇数，则点在多边形内部。
  * 该方法不局限于图形的类型，凸多边形，凹多边形，环形等都可以，边界条件处理方式预览具体情况具体分析
  * 难度：每个图形都需要有相应的函数判断射线边界
  * ![图示](./static/射线法.png)

4.像素法
  * 说明: canvas中的图形分别离屏绘制,通过判断事件的位置数据(getImageData()方法获取)，是否跟事件的唯一id一致来dispatch事件
  * 该项目使用的是像素法监听事件。

5. ...其他

### 使用特殊API