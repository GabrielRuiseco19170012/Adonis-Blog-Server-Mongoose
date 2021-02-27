'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')

class FindById {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: {id} }, next) {
    const user = await User.findBy('id', id)
    if (!user) {
      return response.status(404).json({
        message: 'User not found', id
      })
    }
    request.u = user;
    // call next to advance the request
    await next()
  }
}

module.exports = FindById
