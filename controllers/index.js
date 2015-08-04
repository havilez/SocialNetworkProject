var router = require('express').Router();
var bodyParser = require('body-parser');


router.use(bodyParser.json());

router.use('/api/posts', require('./api/posts'));

// similar to app.use('/',require('./controllers/static'))
router.use(require('./static'));

module.exports = router;