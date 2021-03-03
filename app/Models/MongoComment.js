'use strict'

const BaseModel = use('MongooseModel')

const mongoose = use('Mongoose')

const {Schema} = mongoose

const CommentSchema = new Schema(
  {
    id: String,
    publication_id: String,
    user_id: String,
    username: String,
    content: String,
    date: {type: Date, default: Date.now}
  }
)

/**
 * @class MongoComment
 */
class MComment extends BaseModel {
  /**
   * MongoComment's schema
   */
  static get schema() {
    return {}
  }
}

CommentSchema.loadClass(MComment)

module.exports = mongoose.model('MongoComment', CommentSchema)
