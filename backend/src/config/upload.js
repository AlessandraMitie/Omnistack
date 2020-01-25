// importar o multer:
const multer = require('multer');
const path = require('path');

//exportar objeto que terá várias configs:
module.exports = {
    //exportar o objeto storage que será como que o multer vai armazenar as imagens/arquivos recebidos da aplicação
    storage: multer.diskStorage({
        //diskStorage: o multer vai salvar os arquivos no disco físico (da nossa máquina)
        //qual pasta os arquivos serão salvos:
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        //dirname vem como primeiro parâmetro. É uma variável global que informa qual é o diretório deste arquivo atual
        //nome do arquivo é uma função que receberá 3 parâmetros
        filename: (req, file, cb) => {
            //req é a requisição
            //file é o arquivo em si
            //cb é callback. função que deve ser chamada assim que o nome od arquivo estiver pronto
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            //basename retorna o nome da imagem sem extensão

            cb(null, `${name}-${Date.now()}${ext}`);
            //primeiro parâmetro é nulo pq não aconteceu nenhum erro. seria para passar algo se acontecesse um erro
            //segundo parâmentro: usar crase pq vai formar o nome do arquivo pela junção de várias variáveis
            //name é o nome do arquivo que veio do cliente
            //Date.now: vai retornar o timestamp da data atual
            //ext: extensão
        },
    }),
};