'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindPost {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    const publication = await Publication.findBy('id', id)
    if (!publication) {
      return response.status(404).json({
        message: 'Publication not found', id
      })
    }
    request.p = publication;
    // call next to advance the request
    await next()
  }
}

module.exports = FindPost
