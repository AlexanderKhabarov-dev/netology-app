import { createCommentSocket, deleteCommentSocket } from "../controllers/websocket/websocketCommentsController.js"

export const setupCommentsSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('connection websocket')

    const user = {
      username: socket?.handshake?.session?.passport?.user
    }

    socket.on('createComment', (body, callback) => {
      createCommentSocket({ user, body }, socket, callback)
    })

    socket.on('deleteComment', (body, callback) => {
      deleteCommentSocket({ user, body }, socket, callback)
    })
  })
}