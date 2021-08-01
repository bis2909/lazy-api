const express = require('express');
const router = express.Router();
const <%= varDetail %>Controllers = require('<%= requireControllerPath %>');

router.get('/', <%= varDetail %>Controllers.index);
router.post('/', <%= varDetail %>Controllers.create);
router.get('/:<%= varDetail %>Id', <%= varDetail %>Controllers.detail);
router.patch('/:<%= varDetail %>Id', <%= varDetail %>Controllers.update);
router.delete('/:<%= varDetail %>Id', <%= varDetail %>Controllers.destroy);

module.exports = router;
