# mini-program 链卡3.0小程序

## 模块

- 公共模块
  - 自定义页面模块 *custompage*
  - 个人中心模块 *usercneter*
- 销售激活模块 *seller*
- 话术库模块 *dictionary*
- 动态模块 *zoon*
- 销售模块 *seller*
  - 客户模块
  - 表单模块
  - 文章模块
  - 海报模块
  - *消息模块*

## 目录说明

```typescript
.
├── README.md
├── babel.config.js
├── config // 配置文件
│   ├── dev.js
│   ├── index.js
│   └── prod.js
├── dist // 打包后的目录
│   ├── project.config.json
│   └── weapp
├── docs
│   ├── login.yuml
│   └── �\224��\210�UML�\233�.drawio.png
├── global.d.ts
├── lkcli.config.js
├── package.json
├── project.config.json
├── src
│   ├── app.config.ts
│   ├── app.scss
│   ├── app.tsx
│   ├── components // 项目公共组件目录
│   ├── config // 项目配置目录
│   ├── custom.scss
│   ├── ext.json // 第三方配置文件
│   ├── index.html
│   ├── model // 模型目录
│   ├── pages // 页面目录
│   ├── service // 接口目录
│   ├── static // 静态资源目录
│   ├── store // mobx目录
│   ├── types // 类型声明目录
│   └── utils // 公共工具目录
├── tsconfig.json
├── yarn-error.log
└── yarn.lock
```

### 分包

OEM 制定页打包

### 车迅达

1. 没有销售接入，只有自定义页面功能
2. 完整版，有销售，有自定义页面功能
3. 只有定制页，有销售
4. 定制页统计PV、UV