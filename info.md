### canvas事件模拟

### 一.预览demo
1. demo 运行方式
* npm install
* npm run dev

2. demo 预览图片
[预览图片](./static/预览.gif)

### 前置

> 关于canvas事件模拟方式罗列

1. isPointInPath + Path2D  API (存在极大的兼容性)
  * CanvasRenderingContext2D.isPointInPath()是 Canvas 2D API 用于判断在当前路径中是否包含检测点的方法。
  * 方法: CanvasRenderingContext2D.isPointInPath(x, y, fillRule, path)
  * 参数fillRule: 用来决定点在路径内还是在路径外的算法。 [nonzero: 非零环绕规则(默认), evenodd: 奇偶环绕规则]
  * path Path2D应用的路径
  * 返回值：一个Boolean值，当检测点包含在当前或指定的路径内，返回 true；否则返回 false。

2. 