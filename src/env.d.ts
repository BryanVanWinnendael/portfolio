/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_MAP_KEY: string
  readonly EMAIL: string
  readonly PASS: string
  readonly HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
