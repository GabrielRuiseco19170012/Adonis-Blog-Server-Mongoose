'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.string('imageName', 120).notNullable()
      table.string('path', 120).notNullable()
      table.integer('publication_id').notNullable().unsigned().references('id').inTable('publications').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImageSchema
