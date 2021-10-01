### ToDo

1. Реализовать все Api:
    * POST /upload **DONE** — загрузка изображения (сохраняет его на диск и возвращает идентификатор сохраненного изображения)
    * GET /list **DONE** - получить список изображений в формате json (должен содержать их id, размер, дата загрузки)
    * GET /image/:id **DONE** — скачать изображение с заданным id
    * DELETE /image/:id **DONE** — удалить изображение
    * GET /merge?front=<id>&back=<id>&color=145,54,32&threshold=5 — замена фона у изображения
2. **DONE** Сохранять информацию о существующих пикчах в JSON - сделать базу данных, объект JSON, в котором хранится информация id, createdAt 