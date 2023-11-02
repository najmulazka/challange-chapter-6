const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Imagekit = require('../libs/imagekit');
const path = require('path');

module.exports = {
  // menambahkan gambar bersama judul dan deskripsi
  inputArt: async (req, res, next) => {
    try {
      let { judul, deskripsi } = req.body;

      let strFile = req.file.buffer.toString('base64');

      const { url, fileId } = await Imagekit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
      });

      const art = await prisma.arts.create({
        data: {
          judul,
          deskripsi,
          gambar: url,
          fileId: fileId,
        },
      });

      if (!art) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request!',
          err: err.message,
          data: null,
        });
      }

      return res.status(201).json({
        status: true,
        message: 'Created!',
        err: null,
        data: { art },
      });
    } catch (err) {
      next(err);
    }
  },

  // Melihat daftar gambar yang telah diunggah beserta informasi terkait
  indexArts: async (req, res, next) => {
    try {
      const art = await prisma.arts.findMany();

      if (!art) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request!',
          err: err.message,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Ok!',
        err: null,
        data: { art },
      });
    } catch (err) {
      next(err);
    }
  },

  // Melihat detail gambar beserta informasi terkait.
  showDetailArt: async (req, res, next) => {
    try {
      let { id } = req.params;
      const art = await prisma.arts.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!art) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request!',
          err: 'Post with id does not exist',
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Ok!',
        err: null,
        data: { art },
      });
    } catch (err) {
      next(err);
    }
  },

  // Menghapus gambar berdasarkan fileId tanpa menghapus judul dan deskripsi
  deleteImage: async (req, res, next) => {
    try {
      const { fileId } = req.params;
      const deleteImage = await Imagekit.deleteFile(fileId, (error, result) => {
        if (error) {
          return res.status(400).json({
            status: false,
            message: 'Bad Request!',
            err: error.message,
            data: null,
          });
        } else {
          return res.status(200).json({
            status: true,
            message: 'Deleted image success!',
            err: null,
            data: null,
          });
        }
      });
    } catch (err) {
      next(err);
    }
  },

  // Mengedit judul dan deskripsi gambar yang telah diunggah.
  updateArt: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { judul, deskripsi } = req.body;

      const art = await prisma.arts.findUnique({ where: { id: Number(id) } });
      if (!art) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request!',
          err: 'post with id does not exist',
          data: null,
        });
      }

      const updateArt = await prisma.arts.update({
        where: {
          id: Number(id),
        },
        data: {
          judul,
          deskripsi,
        },
      });

      if (!updateArt) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request!',
          err: err.message,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Ok!',
        err: null,
        data: { art: updateArt },
      });
    } catch (err) {
      next(err);
    }
  },
};
