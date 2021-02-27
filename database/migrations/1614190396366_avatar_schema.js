'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AvatarSchema extends Schema {
  up () {
    this.create('avatars', (table) => {
      table.increments()
      table.string('path', 120).notNullable()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('avatars')
  }
}

module.exports = AvatarSchema
