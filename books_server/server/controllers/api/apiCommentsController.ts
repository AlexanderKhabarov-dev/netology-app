import { Request, Response } from 'express'

import { container } from '../../container.ts'
import CommentsRepository from '../../repositories/comments/CommentsRepository.ts'

const repository = container.get(CommentsRepository)

export const createComment = async ({ user, body }: Request, res: Response) => {
  const newComment = {
    userId: user.id,
    userName: user.username,
    bookId: body.bookId,
    text: body.text,
  }

  try {
    const createdComment = await repository.createComment(newComment)
    const { userName, text, _id, createdAt } = createdComment

    res.render('components/comment', {
      comment: {
        userName,
        canDelete: true,
        createdAt: new Date(createdAt),
        text,
        _id,
      },
    })
  } catch {
    return res.status(500).send({ errorMessage: 'Ошибка сервера' })
  }
}

export const deleteComment = async ({ params, user }: Request, res: Response) => {
  try {
    const { canDelete } = await repository.getCommentsPermissionFromUserId({
      commentId: params.id,
      userId: user.id,
    })

    if (!canDelete) {
      return res.status(403).send({ errorMessage: 'Нельзя удалить комментарий' })
    }

    await repository.deleteComment(params.id)
    return res.status(200).send({ message: 'Комментарий удалён' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ errorMessage: 'Ошибка сервера' })
  }
}
