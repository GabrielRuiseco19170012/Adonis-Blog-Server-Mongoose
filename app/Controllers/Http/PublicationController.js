'use strict'
const Publication = use('App/Models/Publication')
const Database = use('Database')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with publications
 */
class PublicationController {
  /**
   * Show a list of all publications.
   * GET publications
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({response}) {
    const data = await Publication.all();
    try {
      return response.status(200).json(data);
    } catch (e) {
      return response.status(400).send({'Error': e});
    }
  }

  /**
   * Render a form to be used for creating a new publication.
   * GET publications/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create({request, response}) {
    const rules =
      {
        username: 'required|string',
        user_id: 'required|integer',
        title: 'required|string',
        content: 'required|string',
      }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    } else {
      try {
        const {user_id, title, content, username} = request.only([
          'user_id',
          'title',
          'content',
          'username'
        ])
        const post = await Publication.create({
          user_id,
          username,
          title,
          content
        })
        return response.status(201).json(post)
      } catch (e) {
        return response.status(400).send({'Error': e});
      }
    }
  }

  /**
   * Create/save a new publication.
   * POST publications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
  }

  /**
   * Display a single publication.
   * GET publications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({request, response}) {
    try {
      const publication = request.p
      const res = {
        user_id: publication.user_id,
        username: publication.username,
        title: publication.first_name,
        content: publication.content,
      }
      return response.status(200).json(res)
    } catch (e) {
      return response.status(404).send({'Error': e.toString()});
    }
  }

  /**
   * Display publications by user_ID.
   * GET publications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async selectPublicationByUserID({request, response}) {
    try {
      const user_id = request.only(['user_id'])
      const data = await Database.select('*').from('publications').where({user_id: user_id['user_id']})
      return response.status(200).json(data)
    } catch (e) {
      return response.status(404).send({message: e.toString})
    }
  }

  /**
   * Display publications by title.
   * GET publications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async selectPublicationByTitle({request, response}) {
    try {
      const title = request.only(['title'])
      const data = await Database.select('*').from('publications').where({title: title['title']})
      return response.status(200).json(data)
    } catch (e) {
      return response.status(404).send({message: e.toString})
    }
  }

  /**
   * Render a form to update an existing publication.
   * GET publications/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({params, request, response, view}) {
  }

  /**
   * Update publication details.
   * PUT or PATCH publications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({request, response}) {
    try {
      const data = request.only(['user_id', 'title', 'content', 'username']);
      const publication = request.p
      publication.user_id = data.user_id;
      publication.username = data.username;
      publication.title = data.title;
      publication.content = data.content;
      await publication.save();
      return response.status(200).json(publication);
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }

  /**
   * Delete a publication with id.
   * DELETE publications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({request, response}) {
    try {
      const publication = request.p
      await publication.delete();
      return response.status(204).send({message: 'Publication has been destroyed'});
    } catch (e) {
      return response.status(400).send({'Error': e.toString()});
    }
  }
}

module.exports = PublicationController
