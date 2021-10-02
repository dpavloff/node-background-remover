**WORK IN PROGRESS**

Usage:

- POST /upload - upload JPG file to server.
- GET /list - return JSON with meta info about uploaded JPGs.
- GET /image/:id - return image with this id.
- DELETE /image/:id - delete image from server.
- **WIP** GET /merge?front={id}&back={id}&color=(int1,int2,int3)&threshold={int} - return new picture with "back" as background and "front" as foreground. Color and threshold are optional parameters.
