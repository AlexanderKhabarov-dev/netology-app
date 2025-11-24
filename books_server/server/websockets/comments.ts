import { Server } from 'socket.io'

import {
  createCommentSocket,
  deleteCommentSocket,
} from '../controllers/websocket/websocketCommentsController.js'
import { CreateCommentPayloadType, DeleteCommentType } from './types.ts'

export const setupCommentsSocketHandlers = (io: Server) => {
  io.on('connection', socket => {
    console.log('connection websocket')

    const user = {
      // @ts-expect-error
      username: socket?.handshake?.session?.passport?.user,
    }

    socket.on(
      'createComment',
      async (body: CreateCommentPayloadType, callback: (...args: unknown[]) => void) => {
        await createCommentSocket({ user, body }, socket, callback)
      }
    )

    socket.on(
      'deleteComment',
      async (body: DeleteCommentType, callback: (...args: unknown[]) => void) => {
        await deleteCommentSocket({ user, body }, socket, callback)
      }
    )
  })
}
