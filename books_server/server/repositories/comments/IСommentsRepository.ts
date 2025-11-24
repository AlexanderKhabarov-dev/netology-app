import { CommentsPermission, CreateCommentType, ModelCommentType } from './types.ts'

export interface ICommentRepository {
  createComment(data: CreateCommentType): Promise<ModelCommentType>
  getAllCommentsFromBookId(bookId: string): Promise<ModelCommentType[]>
  getCommentFromId(commentId: string): Promise<ModelCommentType | null>
  deleteComment(commentId: string): Promise<{ deletedCount?: number }>
  getCommentsPermissionFromUserId(input: {
    userId: string
    commentId: string
  }): Promise<CommentsPermission>
}
