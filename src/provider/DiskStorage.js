// Salvar e deletar imagem

const fs = require("fs"); // renomear ou mover arquivos
const path = require("path");
const uploadConfig = require("../configs/upload");

class diskStorage {

  async saveFile(file) {
       //MOVER O ARQUIVO
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file), // Pré-carregamento da imagem
      path.resolve(uploadConfig.UPLOADS_FOLDER, file) // salvar na pasta de imagem

    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      await fs.promises.stat(filePath) // estado do arquivo
    } catch {
      return
    }

    await fs.promises.unlink(filePath) // remove o arquivo
  }
}

module.exports = diskStorage;