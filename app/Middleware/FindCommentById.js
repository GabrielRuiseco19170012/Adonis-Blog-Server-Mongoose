'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Comment = use('App/Models/Comment')

class FindCommentById {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    const comment = await Comment.findBy('id', id)
    if (!comment) {
      return response.status(404).json({
        message: 'Comment not found', id
      })
    }
    request.c = comment;
    // call next to advance the request
    await next()
  }
}

module.exports = FindCommentById
