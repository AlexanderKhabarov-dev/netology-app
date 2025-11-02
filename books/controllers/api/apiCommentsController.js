import commentsRepository from '../../repositories/comments/commentsRepository.js'

export const createComment = async ({ user, body }, res) => {
  const newComment = {
    userId: user.id,
    userName: user.username,
    bookId: body.bookId,
    text: body.text
  }

  try {
    const createdComment = await commentsRepository.createComment(newComment)
    const { userName, text, _id, createdAt } = createdComment

    res.render('components/comment', { 
      comment: { 
        userName, 
        canDelete: true,
        createdAt: new Date(createdAt),
        text,
        _id,
      } 
    })
  } catch(e) {
    return res.status(500).send({ errorMessage: 'Ошибка сервера' })
  }
}

export const deleteComment = async ({ params, user }, res) => {
  try {
    const { canDelete } = await commentsRepository.getCommentsPermissionFromUserId({ 
      commentId: params.id, 
      userId: user.id
    })

    if (!canDelete) {
      return res.status(403).send({ errorMessage: 'Нельзя удалить комментарий' })
    }

    await commentsRepository.deleteComment(params.id);
    return res.status(200).send({ message: 'Комментарий удалён' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ errorMessage: 'Ошибка сервера' })
  }
}