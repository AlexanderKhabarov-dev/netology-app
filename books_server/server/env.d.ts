import 'express'
import 'socket.io'

declare module 'socket.io' {
  interface Handshake {
    session?: {
      passport?: {
        user?: string
      }
    }
  }
}

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
      id?: string
      username: string
    }
  }
}
