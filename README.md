# `generateEtags: false` does not disable ETag on `/_next/image` responses

## Reproduction

### 1. Install and run

```bash
npm install
npm run build
npm start
```

### 2. Steps to reproduce

1. Start the production server (`npm run build && npm start`)
2. Request the any static chunk and inspect headers:
   ```bash
   curl -sI http://localhost:3000/_next/static/chunks/<hash>.js
   ```
   **No `ETag` header** — `generateEtags: false` is respected.

3. Request an optimized image and inspect headers:
   ```bash
   curl -sI "http://localhost:3000/_next/image?url=%2Ftest.jpg&w=256&q=75"
   ```
   **`ETag` header is present** — `generateEtags: false` is ignored.

### 3. Current vs Expected behavior

| | Static Chunk response (`/_next/static`) | Image response (`/_next/image`) |
|---|---|---|
| **Current** | No ETag | `ETag: ShcaA9NGqTgNzqbW_aUlcSAMwHNXQgV1ETUl6XvyXdw` |
| **Expected** | No ETag | No ETag |

`generateEtags: false` correctly suppresses ETags on page responses but has no effect on `/_next/image` responses.

### 4. Environment info

```
Operating System:
  Platform: darwin
  Arch: arm64
  Version: Darwin Kernel Version 25.0.0: Wed Sep 17 21:38:03 PDT 2025; root:xnu-12377.1.9~141/RELEASE_ARM64_T8112
  Available memory (MB): 24576
  Available CPU cores: 8
Binaries:
  Node: 24.14.0
  npm: 11.9.0
  Yarn: N/A
  pnpm: 10.14.0
Relevant Packages:
  next: 16.2.1-canary.1 // Latest available version is detected (16.2.1-canary.1).
  eslint-config-next: N/A
  react: 19.2.4
  react-dom: 19.2.4
  typescript: 5.9.3
Next.js Config:
  output: N/A
```

### 5. Affected area

Images (`/_next/image`)

### 6. Affected stage

- Local development (`next dev`)
- Local build (`next build`)
- Production start (`next start`)

### next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  generateEtags: false,
};

export default nextConfig;
```
