const express = require('express');
const router = express.Router();
const <%= varDetail %>Controllers = require('<%= requireControllerPath %>');
const middleware = require('@eys/middleware/admin/answerRule');

router.get('/', <%= varDetail %>Controllers.index);
router.post('/', middleware.create, <%= varDetail %>Controllers.create);
router.get('/:<%= varDetail %>Id', <%= varDetail %>Controllers.detail);
router.patch('/:<%= varDetail %>Id', middleware.create, <%= varDetail %>Controllers.update);
router.delete('/:<%= varDetail %>Id', <%= varDetail %>Controllers.destroy);

module.exports = router;
