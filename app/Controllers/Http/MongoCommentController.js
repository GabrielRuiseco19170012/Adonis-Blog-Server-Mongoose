'use strict'
// mongoose.connect('mongodb://localhost:27017/adonismongo', {useNewUrlParser: true});
const MongoComment = use('App/Models/MongoComment')
const {validate} = use('Validator')

class MongoCommentController {
  /**
   * Show a list of all comments.
   * GET comments
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({response}) {
    const data = await MongoComment.find({});
    try {
      return response.status(200).json(data);
    } catch (e) {
      return response.status(400).send({'Error': e});
    }
  }

  /**
   * Render a form to be used for creating a new comment.
   * GET comments/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create({request, response}) {
    const data = await MongoComment.find({})
    const idN = data.length + 1
    const id = idN.toString()
    const rules =
      {
        publication_id: 'required|integer',
        user_id: 'required|integer',
        username: 'required|string',
        content: 'required|string',
      }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    } else {
      try {
        const {publication_id, user_id, content, username} = request.only([
          'publication_id',
          'user_id',
          'content',
          'username'
        ])
        console.log(username)
        await MongoComment.create({
          id: id,
          publication_id: publication_id,
          user_id: user_id,
          username: username,
          content: content,
        })
        console.log(id);
        return response.status(201).send({message: 'Comment has been created'})
      } catch (e) {
        return response.status(400).send({'Error': e.toString()});
      }
    }
  }

  /**
   * Create/save a new comment.
   * POST comments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
  }

  /**
   * Display a single comment.
   * GET comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({request, response}) {
    try {
      const id = request.only(['id'])
      const res = await MongoComment.find({id: id.id}).exec()
      return response.status(200).json(res)
    } catch (e) {
      return response.status(404).send({'Error': e.toString()});
    }
  }

  /**
   * Display commentaries by user_ID.
   * GET publications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async mongoCommentByUID({request, response}) {
    try {
      const user_id = request.only(['user_id'])
      const data = await MongoComment.find({user_id: user_id.user_id}).exec()
      return response.status(200).json(data)
    } catch (e) {
      return response.status(404).send({message: e.toString})
    }
  }

  /**
   * Display commentaries by publication_ID.
   * GET publications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async mongoCommentByPID({request, response}) {
    try {
      const publication_id = request.only(['publication_id'])
      const data = await MongoComment.find({publication_id: publication_id.publication_id}).exec()
      return response.status(200).json(data)
    } catch (e) {
      return response.status(404).send({message: e.toString})
    }
  }

  /**
   * Render a form to update an existing comment.
   * GET comments/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({params, request, response, view}) {
  }

  /**
   * Update comment details.
   * PUT or PATCH comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({request, response}) {
    try {
      const data = request.only(['id', 'publication_id', 'user_id', 'content']);
      const newDate = Date.now()
      const date = newDate.toString()
      await MongoComment.updateOne({id: data.id},
        {
          id: data.id,
          publication_id: data.publication_id,
          user_id: data.user_id,
          username: data.username,
          content: data.content,
          date: date
        }
      );
      return response.status(200).send({message: "updated"});
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

  /**
   * Delete a comment with id.
   * DELETE comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({request, response}) {
    try {
      const id = request.only(['id'])
      await MongoComment.deleteOne({id: id})
      return response.status(204).send({message: 'Comment has been destroyed'});
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }
}

module.exports = MongoCommentController
