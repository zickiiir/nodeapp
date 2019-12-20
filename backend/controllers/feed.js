exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      { 
        _id: '1', 
        title: 'XD', 
        content: 'XD', 
        imageUrl: 'images/image.jpg', 
        creator: { 
          name: 'XD' 
        }, 
        createdAt: new Date() 
      }
    ]
  });
};

exports.postPosts = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // create post in DB
  res.status(201).json({
    message: 'created successfully',
    post: { id: new Date().toISOString(), title: title, content: content }
  });
};