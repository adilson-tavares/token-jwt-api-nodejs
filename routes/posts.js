const router = require('express').Router();
const Users = require('../model/Users');
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {

    res.send(req.user);
    //Users.findOne({_id: req.user});
    // res.json({  
    //     posts: {
    //         title: 'my first post',
    //         description: 'random data you shouldnt access', 
    //     }
    // });

});

module.exports = router;