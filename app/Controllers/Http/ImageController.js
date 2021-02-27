'use strict'
const Image = use('App/Models/Image');
const Helpers = use('Helpers');
const Drive = use('Drive');


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Show a list of all images.
   * GET images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({request, response}) {
    const publicationID = request.only(['id'])
    const image = await Image.findBy("publication_id", publicationID.id)
    return response.json(image)
  }

  /**
   * Render a form to be used for creating a new image.
   * GET images/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create({request, response}) {
    const img = request.file('image', {
      type: ['image'],
      size: '2mb',
      allowedExtensions: ['jpg', 'png']
    })
    const id = request.only(['id'])
    const imgName = 'image' + id.id + '.' + img.extname.toString();
    await img.move(Helpers.tmpPath('uploads'), {
      name: imgName,
      overwrite: true
    })
    if (!img.moved()) {
      return response.status('422').send({
        res: false,
        message: img.error()
      })
    }
    await Image.create({
      imageName: imgName,
      path: 'uploads/' + imgName.toString(),
      publication_id: id.id
    })
    return response.json({
      imagename: imgName,
      message: 'Succesfully upladed'
    })
  }

  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
  }

  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({params, request, response, view}) {
  }

  /**
   * Render a form to update an existing image.
   * GET images/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({params, request, response, view}) {
  }

  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({params, request, response}) {
  }

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({request, response}) {
    try {
      const id = request.only(['id'])
      const img = await Image.find(id.id)
      const filePath = img.path
      await Drive.delete(filePath);
      const isExist = await Drive.exists(filePath);
      if (!isExist) {
        await img.delete()
        return response.status(204).send('Succesfully Deleted');
      }
      return response.status(304).send('Not Modified');
    } catch (error) {
      return error
    }
  }
}

module.exports = ImageController
