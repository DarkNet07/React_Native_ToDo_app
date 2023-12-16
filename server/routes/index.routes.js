const router = require('express').Router();
const apiToDosRouter = require('./api/toDo.routes');

router.use('/api/toDos', apiToDosRouter);

module.exports = router;
