const { validationResult } = require('express-validator');

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed!',
      errors: errors.array()
    })
  }
  const title = req.body.title;
  const content = req.body.content;
  // create post in DB
  res.status(201).json({
    message: 'created successfully',
    post: { 
      _id: new Date().toISOString(), 
      title: title, 
      content: content, 
      creator: { 
        name: 'Dominik'
      },
      createdAt: new Date() 
    }
  });
};