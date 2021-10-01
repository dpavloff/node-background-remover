const { Router } = require('express');
const api = require('./api'); // routes for /api
const apiRouter = new Router();
const upload = require('./middlewares/multer');

// POST /upload 
// — загрузка изображения (сохраняет его на диск и возвращает идентификатор сохраненного изображения)
// GET /list 
// - получить список изображений в формате json (должен содержать их id, размер, дата загрузки)
// GET /image/:id 
// — скачать изображение с заданным id
// DELETE /image/:id 
// — удалить изображение
// GET /merge?front=<id>&back=<id>&color=145,54,32&threshold=5 
// — замена фона у изображения

apiRouter.post('/upload', api.postJpg);
apiRouter.get('/image/:id', api.getJpg);
apiRouter.get('/list', api.getAllJpg);
apiRouter.delete('/image/:id', api.deleteJpg);
apiRouter.get('/merge?front=<id>&back=<id>&color=145,54,32&threshold=5', api.mergeJpg);

exports.apiRouter = apiRouter;
