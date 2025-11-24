import { Request } from 'express'
import { Socket } from 'socket.io'

import { CommentsPermission, CommentType } from '../../repositories/comments/types.ts'

export type DataType<T> = {
  user: { username: string }
  body: T
}

export type CommentSocketFn<T> = (
  data: DataType<T>,
  socket: Socket,
  callback: (...args: unknown[]) => void
) => Promise<void>

export type RenderCommentType = CommentType & CommentsPermission
