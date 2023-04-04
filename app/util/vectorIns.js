const { chatApiKey } = require('../config/config.json');
class VectorIns {
    constructor() {
        if (!VectorIns.instance) {
            VectorIns.instance = this;
        }
        return VectorIns.instance;
    }
    async inint(){
        const { RecursiveCharacterTextSplitter }= await import("langchain/text_splitter");
        const { OpenAIEmbeddings }= await import( "langchain/embeddings");
        this.embeding = new OpenAIEmbeddings({ openAIApiKey:chatApiKey});
        this.textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 100,
            separators: ["\n\n", "\n","\r\n","。",""]
        });
    }

    getTextSplit(){
        return this.textSplitter;
    }
    getEmbeding(){
        return this.embeding;
    }
}


const vectorIns = new VectorIns();

module.exports = vectorIns;