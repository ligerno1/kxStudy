# 获取 Apache ECharts

Apache ECharts 提供了多种安装方式，你可以根据项目的实际情况选择以下任意一种方式安装。

- 从 GitHub 获取
- 从 npm 获取
- 从 CDN 获取
- 在线定制

接下来我们将分别介绍这些安装方式，以及下载后的目录结构。

## 安装方式

- 从 npm 获取

```cmd
npm install echarts --save
```
详见在项目中引入 Apache ECharts。

- 从 CDN 获取

推荐从 jsDelivr 引用 echarts。

- 从 GitHub 获取

apache/echarts 项目的 release 页面可以找到各个版本的链接。点击下载页面下方 Assets 中的 Source code，解压后 dist 目录下的 echarts.js 即为包含完整 ECharts 功能的文件。

- 在线定制

如果只想引入部分模块以减少包体积，可以使用 ECharts 在线定制功能。


# 在项目中引入 Apache ECharts

## 引入 ECharts

```js
import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});
```

## 按需引入 ECharts 图表和组件

```js
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  DatasetComponentOption,
  TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

// 接下来的使用就跟之前一样，初始化图表，设置配置项
var myChart = echarts.init(document.getElementById('main'));
myChart.setOption({
  // ...
});
```

## 在 TypeScript 中按需引入

```ts
import * as echarts from 'echarts/core';
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts';
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

const option: ECOption = {
  // ...
};
```

# 版本特性

## Apache ECharts 5 新特性

五大模块

- 动态叙事
- 视觉设计
- 交互能力
- 开发体验
- 可访问性

十五项特性

- 动态排序图
- 自定义系列动画
- 默认设计
- 标签
- 时间轴
- 提示框
- 仪表盘
- 扇形圆角
- 状态管理
- 性能提升
- 数据集
- 国际化
- TypeScript重构
- 主题配色
- 贴画图案

# Apache ECharts 5 升级指南

本指南面向那些希望将 echarts 4.x（以下简称 v4）升级到 echarts 5.x（以下简称 v5）的用户

## 非兼容性改变

默认主题（theme）

```js
chart.setOption({
  color: [
    '#c23531',
    '#2f4554',
    '#61a0a8',
    '#d48265',
    '#91c7ae',
    '#749f83',
    '#ca8622',
    '#bda29a',
    '#6e7074',
    '#546570',
    '#c4ccd3'
  ]
  // ...
});
```

## 引用 ECharts

去除 default exports 的支持 

如果使用者在 v4 中这样引用了 echarts：

```js
import echarts from 'echarts';
// 或者按需引入
import echarts from 'echarts/lib/echarts';
```

这两种方式，v5 中不再支持了。

使用者需要如下更改代码解决这个问题：

```js
import * as echarts from 'echarts';
// 按需引入
import * as echarts from 'echarts/lib/echarts';
```

## 去除内置的 geoJSON

v5 移除了内置的 geoJSON（原先在 echarts/map 文件夹下）。这些 geoJSON 文件本就一直来源于第三方。如果使用者仍然需要他们，可以去从老版本中得到，或者自己寻找更合适的数据然后通过 registerMap 接口注册到 ECharts 中。

## 浏览器兼容性

v5 不再支持 IE8 浏览器。我们不再继续维护和升级之前的 VML 渲染器 来着实现 IE8 的兼容。如果使用者确实有很强的需求，那么欢迎提 pull request 来升级 VML 渲染器，或者单独维护一个第三方 VML 渲染器，我们从 v5.0.1 开始支持注册独立的渲染器了。

## 配置项调整

视觉样式设置的优先级改变

v5 对调了 visualMap 组件 和 itemStyle | lineStyle | areaStyle 的视觉样式优先级。

在绝大多处情况下，这个变化并不会带来什么影响。但是为保险起见，使用者在升级 v4 到 v5 时，还是可以检查下，是否有同时使用 visualMap 和 itemStyle | lineStyle | areaStyle 的情况。

## 富文本的 padding

v5 调整了 rich.?.padding 的格式使其更符合 CSS 的规范。v4 里，例如 rich.?.padding: [11, 22, 33, 44] 表示 padding-top 是 33 且 padding-bottom 是 11。在 v5 中调整了上下的位置，rich.?.padding: [11, 22, 33, 44] 表示 padding-top 是 11 且 padding-bottom 是 33。

如果使用者有在使用 rich.?.padding，需要注意调整下这个顺序。

## 扩展的兼容
如果想要升级到 v5 ，下面这些扩展需要升级到最新的版本实现兼容。

- echarts-gl
- echarts-wordcloud
- echarts-liquidfill


## 不再推荐使用的 API

- 图形元素 transform 相关的属性被改变了：
  - 变更点：
    - position: [number, number] 改为 x: number / y: number。
    - scale: [number, number] 改为 scaleX: number / scaleY: number。
    - origin: [number, number] 改为 originX: number / originY: number。
  - position、scale 和 origin 仍然支持，但已不推荐使用。
  - 它影响到这些地方：
    - 在graphic组件中：每个元素的声明。
    - 在 custom series 中：renderItem 返回的每个元素的声明。
    - 直接使用 zrender 图形元素时。
- Text 相关的属性被改变：
  - 变更点：
    - 图形元素附带的文本的声明方式被改变：
      - 除了 Text 元素之外，其他元素中的属性 style.text 都不推荐使用了。取而代之的是新属性 textContent 和 textConfig，他们能带来更丰富的功能。
      - 其中，下面左边部分的这些属性已不推荐使用或废弃。请使用下面的右边部分的属性：
        - textPosition => textConfig.position
        - textOffset => textConfig.offset
        - textRotation => textConfig.rotation
        - textDistance => textConfig.distance
    - 下面左边部分的属性在 style 和 style.rich.? 中已不推荐使用或废弃。请使用下面右边的属性：
      - textFill => fill
      - textStroke => stroke
      - textFont => font
      - textStrokeWidth => lineWidth
      - textAlign => align
      - textVerticalAlign => verticalAlign
      - textLineHeight =>
      - textWidth => width
      - textHeight => hight
      - textBackgroundColor => backgroundColor
      - textPadding => padding
      - textBorderColor => borderColor
      - textBorderWidth => borderWidth
      - textBorderRadius => borderRadius
      - textBoxShadowColor => shadowColor
      - textBoxShadowBlur => shadowBlur
      - textBoxShadowOffsetX => shadowOffsetX
      - textBoxShadowOffsetY => shadowOffsetY
    - 注：这些属性并没有变化:
      - textShadowColor
      - textShadowBlur
      - textShadowOffsetX
      - textShadowOffsetY
  - 它影响到这些地方:
    - 在 graphic 组件中：每个元素的声明。（原来的写法仍兼容，但在一些很复杂的情况下，可能效果不完全一致。）
    - 在自定义系列（custom series）中：renderItem 返回中的每个元素的声明。（原来的写法仍兼容，但在一些很复杂的情况下，可能效果不完全一致。）
    - 直接使用 zrender API 创建图形元素。（不再兼容，原写法被废弃。）
- 图表实例上的 API:
  - chart.one(...) 已不推荐使用。
- label。
  - 属性 color、textBorderColor、backgroundColor、borderColor 中，值 auto 已不推荐使用，而推荐使用 'inherit' 代替。
- hoverAnimation:
  - 选项 series.hoverAnimation 已不推荐使用，使用 series.emphasis.scale 代替之。
- 折线图（line series）:
  - 选项 series.clipOverflow 已不推荐使用，使用 series.clip 代替之。
- 自定义系列（custom series）。
  - 在 renderItem 中，api.style(...) 和 api.styleEmphasis(...) 已不推荐使用。因为这两个接口其实并不真正必要，也很难保证向后兼容。用户可以通过 api.visual(...) 获取系统自动分配的视觉信息。
- 旭日图（sunburst）：
  - 动作类型 highlight 已被弃用，请使用 sunburstHighlight 代替。
  - 动作类型 downplay 已被弃用，请使用 sunburstUnhighlight 代替。
  - 选项 series.downplay 已被弃用，请使用 series.blur 代替。
  - 选项 series.highlightPolicy 已不适用，请使用 series.emphasis.focus 代替。
- 饼图（pie）：
  - 下面左边部分的 action 名已经不推荐使用。请使用右边的 action 名。
    - pieToggleSelect => toggleSelect。
    - pieSelect => select。
    - pieUnSelect => unselect。
  - 下面左边部分的事件名已经不推荐使用。请使用右边的事件名。
    - pieselectchanged => selectchanged。
    - pieselected => selected。
    - pieunselected => unselected。
  - 选项 series.label.margin 已经不推荐使用。使用 series.label.edgeDistance 代替。
  - 选项 series.clockWise 已经不推荐使用。使用 series.clockwise 代替。
  - 选项 series.hoverOffset 已经不推荐使用。使用 series.emphasis.scaleSize 代替。
- 地图（map series）：
  - 下文左边部分的 action 名已经不推荐使用。请使用右边的 action 名。
    - mapToggleSelect => toggleSelect。
    - mapSelect => select。
    - mapUnSelect => unselect。
  - 下面左边部分的事件名已经不推荐使用。请使用右边的事件名。
    - mapselectchanged => selectchanged。
    - mapselected => selected。
    - mapunselected => unselected。
  - 选项 series.mapType 已经不推荐使用。使用 series.map 代替。
  - 选项 series.mapLocation 已经不推荐使用。
- 关系图（graph series）：
  - 选项 series.focusNodeAdjacency 已经不推荐使用。使用 series.emphasis: { focus: 'adjacency'} 代替。
- 仪表盘（gauge series）：
  - 选项 series.clockWise 已经不推荐使用。使用 series.clockwise 代替。
  - 选项 series.hoverOffset 已经不推荐使用。使用 series.emphasis.scaleSize 代替。
- dataZoom 组件：
  - 选项 dataZoom.handleIcon 如果使用 SVGPath，需要前缀 path://。
- 雷达图（radar）：
  - 选项 radar.name 已经不推荐使用。使用 radar.axisName 代替。
  - 选项 radar.nameGap 已经不推荐使用。使用 radar.axisNameGap 代替。
- Parse and format：
  - echarts.format.formatTime 已经不推荐使用。使用 echarts.time.format 代替。
  - echarts.number.parseDate 已经不推荐使用。使用 echarts.time.parse 代替。
  - echarts.format.getTextRect 已经不推荐使用。

