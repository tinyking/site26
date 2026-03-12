# Next.js 到 Astro 迁移计划

## 1. 项目概述
- 原项目：Next.js 16 + React 19 + TypeScript + Tailwind CSS + shadcn/ui + Zustand
- 目标项目：Astro 4.x + React 集成 + 相同技术栈
- 迁移目标：保留所有功能，提升性能，减少客户端 JavaScript 体积

---

## 2. 项目目录结构规划

```
my-app-astro/
├── public/                  # 静态资源文件
│   ├── images/             # 图片资源
│   ├── fonts/              # 字体文件
│   └── favicon.ico         # 网站图标
├── src/
│   ├── assets/             # 静态资源（会被 Astro 处理）
│   │   ├── styles/         # 全局样式
│   │   └── images/         # 需要优化的图片
│   ├── components/         # 通用组件
│   │   ├── ui/             # shadcn/ui 组件库
│   │   ├── gallery/        # 业务组件
│   │   └── layout/         # 布局组件
│   ├── content/            # 内容集合（Markdown/MDX）
│   │   ├── journal/        # 日志内容
│   │   └── config.ts       # 内容集合配置
│   ├── layouts/            # 页面布局模板
│   │   └── MainLayout.astro
│   ├── lib/                # 工具库
│   │   ├── db.ts           # 数据库操作
│   │   └── utils.ts        # 通用工具函数
│   ├── hooks/              # React Hooks
│   │   ├── use-toast.ts
│   │   └── use-mobile.ts
│   ├── store/              # 状态管理
│   │   └── gallery-store.ts
│   ├── data/               # 静态数据
│   │   ├── content.ts
│   │   └── images.json
│   ├── pages/              # 页面路由
│   │   ├── index.astro     # 首页
│   │   ├── galleries.astro # 画廊页
│   │   ├── journal.astro   # 日志页
│   │   ├── booking.astro   # 预约页
│   │   └── api/            # API 路由
│   │       └── [...endpoint].ts
│   ├── scripts/            # 工具脚本
│   │   └── generate-images.ts
│   └── env.d.ts            # TypeScript 环境声明
├── astro.config.ts         # Astro 配置
├── tsconfig.json           # TypeScript 配置
├── tailwind.config.ts      # Tailwind CSS 配置
├── package.json            # 依赖配置
└── .gitignore              # Git 忽略配置
```

---

## 3. 依赖配置清单（package.json）

```json
{
  "name": "astro-gallery-app",
  "version": "0.2.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev --port 3000",
    "build": "astro build",
    "preview": "astro preview --port 3000",
    "lint": "eslint .",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:reset": "prisma migrate reset"
  },
  "dependencies": {
    "@astrojs/react": "^3.6.2",
    "@astrojs/node": "^8.3.4",
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@hookform/resolvers": "^5.1.1",
    "@mdxeditor/editor": "^3.39.1",
    "@prisma/client": "^6.11.1",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@reactuses/core": "^6.0.5",
    "@tanstack/react-query": "^5.82.0",
    "@tanstack/react-table": "^8.21.3",
    "astro": "^4.16.7",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.23.2",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.525.0",
    "next-auth": "^4.24.11",
    "next-intl": "^4.3.4",
    "next-themes": "^0.4.6",
    "prisma": "^6.11.1",
    "react": "^19.0.0",
    "react-day-picker": "^9.8.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.60.0",
    "react-markdown": "^10.1.0",
    "react-resizable-panels": "^3.0.3",
    "react-syntax-highlighter": "^15.6.1",
    "recharts": "^2.15.4",
    "sharp": "^0.34.3",
    "sonner": "^2.0.6",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7",
    "uuid": "^11.1.0",
    "vaul": "^1.1.2",
    "z-ai-web-dev-sdk": "^0.0.17",
    "zod": "^4.0.2",
    "zustand": "^5.0.6"
  },
  "devDependencies": {
    "@astrojs/tailwind": "^5.1.2",
    "@tailwindcss/postcss": "^4",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "bun-types": "^1.3.4",
    "eslint": "^9",
    "eslint-plugin-astro": "^1.3.1",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.3.5",
    "typescript": "^5"
  }
}
```

---

## 4. 迁移步骤（按优先级排序）

### 优先级 1：项目初始化（1-2 天）
### 优先级 2：基础配置迁移（1 天）
### 优先级 3：静态内容和布局迁移（2 天）
### 优先级 4：组件迁移（3-4 天）
### 优先级 5：状态管理和交互迁移（2-3 天）
### 优先级 6：API 路由迁移（1-2 天）
### 优先级 7：功能测试和优化（2 天）
### 优先级 8：部署配置（1 天）

---

## 5. 每个步骤的具体操作和注意事项

### 步骤 1：项目初始化
**操作：**
1. 创建新的 Astro 项目：`npm create astro@latest my-app-astro`
2. 选择 "React" 集成，TypeScript 支持
3. 安装基础依赖：`npm install`
4. 复制原项目的 `public` 目录到新的 Astro 项目

**注意事项：**
- 确保使用最新稳定版的 Astro
- 验证 React 集成是否正确安装
- 保留原项目的所有静态资源文件结构

### 步骤 2：基础配置迁移
**操作：**
1. 迁移 Tailwind CSS 配置
2. 迁移 TypeScript 配置
3. 配置 Astro 主配置文件
4. 安装所有需要的依赖包

**注意事项：**
- Astro 的 Tailwind 配置与 Next.js 略有不同
- 路径别名需要在 `tsconfig.json` 和 `astro.config.ts` 中都配置
- 注意依赖版本兼容性

### 步骤 3：静态内容和布局迁移
**操作：**
1. 创建主布局组件 `MainLayout.astro`
2. 迁移 Header 和 Footer 组件
3. 迁移全局样式和 CSS 变量
4. 配置内容集合（Content Collections）

**注意事项：**
- Astro 布局使用 `.astro` 格式，支持插槽（slots）
- 全局样式可以在布局组件中引入
- 内容集合是 Astro 的强大功能，适合管理博客、日志等内容

### 步骤 4：组件迁移
**操作：**
1. 迁移所有 shadcn/ui 组件到 `src/components/ui`
2. 迁移业务组件到 `src/components/gallery`
3. 为需要交互的组件添加 `client:` 指令
4. 逐个测试组件功能

**注意事项：**
- 默认情况下 Astro 组件是静态的，需要交互的 React 组件需要添加客户端指令
- 可选的客户端指令：`client:load`、`client:idle`、`client:visible`、`client:media`
- 组件 props 传递方式与 React 一致

### 步骤 5：状态管理和交互迁移
**操作：**
1. 迁移 Zustand 状态管理 store
2. 迁移自定义 Hooks
3. 迁移表单处理和验证逻辑
4. 迁移动画和交互效果

**注意事项：**
- Zustand 在 Astro 中使用方式与 Next.js 完全一致
- 客户端状态只在带有 `client:` 指令的组件中可用
- Framer Motion 等动画库需要在客户端组件中使用

### 步骤 6：API 路由迁移
**操作：**
1. 迁移 API 端点到 `src/pages/api` 目录
2. 调整请求和响应处理逻辑以适配 Astro API
3. 配置服务器端渲染模式
4. 测试所有 API 接口

**注意事项：**
- Astro API 路由使用标准的 Request/Response API
- 支持 Edge Runtime 和 Node.js Runtime
- 数据库操作可以在服务端直接调用，无需额外配置

### 步骤 7：功能测试和优化
**操作：**
1. 页面功能完整测试
2. 性能测试和优化
3. 响应式适配测试
4. 无障碍访问检查

**注意事项：**
- Astro 提供内置的图片优化，替换原有的 `next/image`
- 利用 Astro 的群岛架构减少不必要的客户端 JavaScript
- 测试不同渲染模式（静态生成、服务端渲染、客户端渲染）

### 步骤 8：部署配置
**操作：**
1. 配置构建输出选项
2. 选择部署平台（Vercel, Netlify, Node.js 服务器等）
3. 配置环境变量
4. 测试生产构建

**注意事项：**
- Astro 支持多种部署适配器
- 静态站点可以直接部署到任何静态文件服务器
- 服务端渲染需要选择对应的适配器

---

## 6. 配置文件示例

### astro.config.ts
```typescript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'hybrid', // 混合渲染模式，支持静态和SSR
  adapter: node({
    mode: 'standalone',
  }),
  server: {
    port: 3000,
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
```

### tsconfig.json
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": false,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "jsxImportSource": "react"
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.astro"],
  "exclude": ["node_modules"]
}
```

### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
```

---

## 7. 路由映射关系

| Next.js 路由 (app 目录) | Astro 路由 (pages 目录) | 渲染模式 | 说明 |
|-------------------------|-------------------------|----------|------|
| `/` (page.tsx)          | `/index.astro`          | 静态生成 | 首页 |
| `/galleries` (page.tsx) | `/galleries.astro`      | 静态生成 | 画廊列表页 |
| `/journal` (page.tsx)   | `/journal.astro`        | 内容集合 | 日志列表页 |
| `/journal/[slug]`       | `/journal/[slug].astro` | 静态生成 | 日志详情页 |
| `/booking` (page.tsx)   | `/booking.astro`        | SSR      | 预约表单页 |
| `/api/*` (route.ts)     | `/api/*.ts`             | API 路由 | 接口端点 |

---

## 8. 组件迁移方案

### 静态组件（无交互）
- 直接转换为 `.astro` 组件，减少客户端 JavaScript
- 示例：Header、Footer、卡片展示等

### 交互组件（需要客户端逻辑）
- 保留为 React 组件，添加 `client:` 指令
- 示例：表单、轮播、弹窗、拖拽组件等

### 组件迁移示例：
**原 Next.js 页面：**
```tsx
// app/page.tsx
import Header from '@/components/gallery/Header';
import Footer from '@/components/gallery/Footer';
import HomePage from '@/components/gallery/HomePage';

export default function Page() {
  return (
    <div>
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}
```

**迁移后 Astro 页面：**
```astro
---
// src/pages/index.astro
import MainLayout from '@/layouts/MainLayout.astro';
import HomePage from '@/components/gallery/HomePage';
---

<MainLayout>
  <HomePage client:load />
</MainLayout>
```

---

## 9. 状态管理和交互功能迁移方案

### Zustand 状态管理
- 完全兼容，无需修改代码
- 仅在客户端组件中使用
- 示例：
```tsx
// src/store/gallery-store.ts
import { create } from 'zustand';

interface GalleryState {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  selectedImage: null,
  setSelectedImage: (image) => set({ selectedImage: image }),
}));
```

### 交互功能迁移
1. **表单处理**：react-hook-form 完全兼容，在客户端组件中使用
2. **动画效果**：framer-motion 需要添加 `client:load` 指令
3. **数据获取**：
   - 静态数据：在 Astro 组件的 frontmatter 中获取
   - 动态数据：使用 React Query 在客户端组件中获取
4. **主题切换**：next-themes 可以在 Astro 中正常使用，需要在客户端组件中初始化

---

## 10. 构建和部署配置

### 构建配置
- 开发环境：`npm run dev` - 启动开发服务器，端口 3000
- 生产构建：`npm run build` - 生成构建产物到 `dist` 目录
- 预览构建：`npm run preview` - 预览生产构建结果

### 部署选项
1. **静态站点部署**（推荐）：
   - 适合大部分内容页面
   - 可以部署到 Vercel、Netlify、Cloudflare Pages 等
   - 配置：`output: 'static'` 在 astro.config.ts 中

2. **服务端渲染部署**：
   - 适合需要动态内容和 API 的页面
   - 使用 Node.js 适配器
   - 配置：`output: 'server'` 或 `output: 'hybrid'`

3. **Docker 部署**：
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/server/entry.mjs"]
```

### 环境变量
- 公共环境变量：以 `PUBLIC_` 前缀开头，可在客户端访问
- 私有环境变量：仅在服务端可用，无前缀
- 配置文件：`.env`、`.env.local`、`.env.production`

---

## 迁移风险和应对方案

1. **组件兼容性问题**：
   - 风险：部分 React 组件可能在 Astro 环境下出现兼容性问题
   - 应对：逐个测试组件，必要时使用 Astro 生态的替代方案

2. **性能下降**：
   - 风险：不当使用客户端组件可能导致性能不如预期
   - 应对：充分利用 Astro 的群岛架构，尽量减少客户端组件的使用

3. **构建时间增加**：
   - 风险：大量静态页面生成可能导致构建时间变长
   - 应对：合理使用增量静态生成和服务端渲染

4. **SEO 影响**：
   - 风险：路由变化可能影响搜索引擎收录
   - 应对：配置正确的重定向规则，保持 URL 结构不变
