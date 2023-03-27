
class LangChainTool {
    constructor() {
        if (!LangChainTool.instance) {
            LangChainTool.instance = this;
        }
        return LangChainTool.instance;
    }
    async inint(){
        const { PDFLoader } = await import( "langchain/document_loaders");
        this.PDFLoader=PDFLoader;
/*
        const loader = new PDFLoader("src/document_loaders/example_data/example.pdf");
        const docs = await loader.load();
        console.log({ docs });*/
    }
}

const langChainTool = new LangChainTool();

module.exports = langChainTool;