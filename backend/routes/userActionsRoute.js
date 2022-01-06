const { Router } = require('express');
const User = require('../models/User');
const router = Router();


router.get('/user/:id', (req, res, next) => {
    User.findById({ _id: req.params.id }).then((userId) => {
        // console.log(userId);
        res.render('/user/'+userId);
    });
});

module.exports = router;