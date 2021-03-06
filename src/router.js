const { Router } = require("express");
const api = require("./api"); // routes for /api
const apiRouter = new Router();
const multerMiddleware = require("./middlewares/multerMiddleware");

// POST /upload — загрузка изображения (сохраняет его на диск и возвращает идентификатор сохраненного изображения)
apiRouter.post("/upload", multerMiddleware().single("image"), api.postJpg);

// GET /image/:id — скачать изображение с заданным id
apiRouter.get("/image/:id", api.getJpg);

// GET /list - получить список изображений в формате json (должен содержать их id, размер, дата загрузки)
apiRouter.get("/list", api.getJpgs);

// DELETE /image/:id — удалить изображение
apiRouter.delete("/image/:id", api.deleteJpg);

// GET /merge?front=<id>&back=<id>&color=145,54,32&threshold=5 — замена фона у изображения
apiRouter.get("/merge?*", api.mergeJpg);

exports.apiRouter = apiRouter;
