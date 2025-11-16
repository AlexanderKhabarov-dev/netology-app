import 'express'
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    PORT?: string
    DB_URI: string
  }
}

declare global {
  namespace Express {
    interface User {
      id: string
    }
  }
}
