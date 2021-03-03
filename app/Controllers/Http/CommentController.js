'use strict'
const Comment = use('App/Models/Comment')
const Database = use('Database')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with comments
 */
class CommentController {
  /**
   * Show a list of all comments.
   * GET comments
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({response}) {
    const data = await Comment.all();
    try {
      return response.status(200).send({'Data': data});
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
    const rules =
      {
        username: 'required|string',
        publication_id: 'required|integer',
        user_id: 'required|integer',
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
        await Comment.create({
          publication_id,
          user_id,
          username,
          content
        })
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
      const comment = request.c
      const res = {
        publication_id: comment.publication_id,
        user_id: comment.user_id,
        username: comment.username,
        content: comment.content,
      }
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
  async selectCommentByUserID({request, response}) {
    try {
      const user_id = request.only(['user_id'])
      const data = await Database.select('*').from('comments').where({user_id: user_id['user_id']})
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
  async selectCommentByPublication({request, response}) {
    try {
      const publication_id = request.only(['publication_id'])
      const data = await Database.select('*').from('comments').where({publication_id: publication_id['publication_id']})
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
      const data = request.only(['publication_id', 'user_id', 'content']);
      const comment = request.c
      comment.publication_id = data.publication_id;
      comment.username = data.username;
      comment.user_id = data.user_id;
      comment.content = data.content;
      await comment.save();
      return response.status(200).json(comment);
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
      const comment = request.c
      await comment.delete();
      return response.status(204).send({message: 'Comment has been destroyed'});
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }
}

module.exports = CommentController
