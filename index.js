const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const vcardparser = require('vcardparser');

const askChromosomePositionPair = async (question) => {
    return new Promise(resolve => rl.question(question, answer => {
        resolve(answer);
    }))
}

const parseVcard = async (filename) => {
    return await new Promise((resolve, reject) => {
        vcardparser.parseFile(filename, (err, json) => {
            if (err) console.log(err)
            var data = json;
            let keys = Object.keys(json);
            for (let i = 0; i < keys.length; i++) {
                let separated = keys[i].split('\t');
                let newKey = separated[0] + ":" + separated[1];
                data[newKey] = separated[3];
                delete data[keys[i]]
            }
            resolve(data)
        })
    })
}

(async () => {
    const data = await parseVcard('input_tiny.vcf');
    let question = "-> Enter chromosome name and position (e.g: chr1:13748) type `exit` to quit: \n"
    let search;
    while (search !== 'exit') {
        search = await askChromosomePositionPair(question)
        data[search] !== undefined ? console.log(`-> Nucleic acid name: ${data[search]}`) : 
        console.log("-> Not found please check your input :(")
    }
})();