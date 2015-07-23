module.exports = function(Post) {

   Post.observe('before save', function(ctx, next) {

    console.log('> Post before save triggered');

    var model = ctx.instance;
    var wordpressService = Post.app.dataSources.WordpressService;

    wordpressService.find(function(err, response, context) {
      if (err) throw err; //error making request
      if (response.error) {
        next('> response error: ' + response.error.stack);
      }
      model.postsByType = response;
      console.log('> coffee shops fetched successfully from remote server');
	  console.log(model.postsByType);
	  console.log('end');
      // verify via `curl localhost:3000/api/posts`
      next();
    });
  }); 
  
   Post.getTitle = function(postId, cb) {
    Post.findById( postId, function (err, instance) {
        response = "Title of POST is " + instance.title;
        cb(null, response);
        console.log(response);
    });
  }

  Post.remoteMethod (
        'getTitle',
        {
          http: {path: '/gettitle', verb: 'get'},
          accepts: {arg: 'id', type: 'number', http: { source: 'query' } },
          returns: {arg: 'title', type: 'string'}
        }
    );
	

};
