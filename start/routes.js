'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// User
// Create
Route.post('register', 'UserController.create')
// login
Route.post('login', 'UserController.login')
Route.post('refreshToken', 'UserController.refreshT')
Route.get('loggedIn', 'UserController.loggedIn').middleware('auth')
Route.get('loginCheck', 'UserController.loginCheck').middleware('auth')
Route.post('logout', 'UserController.logout').middleware('auth')
// Read
Route.get('getUser/:id', 'UserController.show').middleware(['auth', 'FindUser'])
Route.get('getAllUsers', 'UserController.index').middleware('auth')
// Update
Route.put('update/:id', 'UserController.update').middleware(['auth', 'FindUser'])
// Delete
Route.delete('delete/:id', 'UserController.destroy').middleware(['auth', 'FindUser'])

//API routes
Route.group(() => {
  // //Imagenes
  // Route.post('uploadImage', 'ImageController.create')
  // // Route.get('getImage', 'ImageController.show')
  // Route.get('getImageID', 'ImageController.index')
  // Route.delete('deleteImage', 'ImageController.destroy')
  //
  // //Avatar
  // Route.post('uploadAvatar', 'AvatarController.create')
  // Route.get('getAvatar', 'AvatarController.show')
  // Route.get('getAvatarID', 'AvatarController.index')
  // Route.delete('deleteAvatar', 'AvatarController.destroy')

  // Publications
  // Create
  Route.post('newPost', 'PublicationController.create')
  // Read
  Route.get('showPosts', 'PublicationController.index')
  Route.get('showPost/:id', 'PublicationController.show').middleware('FindPublicationById')
  Route.get('showPosts/byTitle', 'PublicationController.selectPublicationByTitle')
  Route.get('showPosts/byUser', 'PublicationController.selectPublicationByUserID')
  // Update
  Route.put('updatePost/:id', 'PublicationController.update').middleware('FindPublicationById')
  // Delete
  Route.delete('deletePost/:id', 'PublicationController.destroy').middleware('FindPublicationById')

  // Commentaries
  //Create commentary
  Route.post('newComment', 'CommentController.create')
  //Read commentary
  Route.get('showComments', 'CommentController.index')
  Route.get('showComment/:id', 'CommentController.show').middleware('FindCommentById')
  Route.get('showComments/byPost', 'CommentController.selectCommentByPublication')
  Route.get('showComments/byUser', 'PublicationController.selectCommentByUserID')
  //Update commentary
  Route.put('updateComment/:id', 'CommentController.update').middleware('FindCommentById')
  //Delete commentary
  Route.delete('deleteComment/:id', 'CommentController.destroy').middleware('FindCommentById')

  // MongoCommentaries
  //Create commentary
  Route.post('mNewComment', 'MongoCommentController.create')
  //Read commentary
  Route.get('mShowComments', 'MongoCommentController.index')
  Route.get('mShowComment/', 'MongoCommentController.show')
  Route.get('mShowComments/byPost', 'MongoCommentController.mongoCommentByPID')
  Route.get('mShowComments/byUser', 'MongoCommentController.mongoCommentByUID')
  //Update commentary
  Route.put('mUpdateComment', 'MongoCommentController.update')
  //Delete commentary
  Route.delete('mDeleteComment', 'MongoCommentController.destroy')

}).middleware('auth').prefix('api/')
