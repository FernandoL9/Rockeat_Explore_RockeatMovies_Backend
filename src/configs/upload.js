// função: fazer o upload de fotos para o Back-end

const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp") // armazenar informação e configuração CAIXA ALTA
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads"); // local do armazenamento da imagem

const MULTER = {
  storage: multer.diskStorage({
    // destinatino
    destination: TMP_FOLDER,
    
    //função 
    filename( request, file, callback ) {
      const fileHash = crypto.randomBytes(10).toString("hex")
      const filename = `${fileHash}-${file.originalname}`

      return callback(null, filename)
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}