const fs = require('fs');
const readLine = require('readline')
const { cucumberScriptChecker, stepDefinitionChecker, verifyCucumber } = require('./cucumber-checker');

const [nodePath, scriptPath, cucumberScript, stepsDefinitionDir, ...restParams] = process.argv;
if (!cucumberScript || !stepsDefinitionDir) {
    throw new Error('You have to specify cucumber script path and steps definition directory');
}

const cucumberLineReader = readLine.createInterface({
    input: fs.createReadStream(cucumberScript),
});
cucumberLineReader.on('line', cucumberScriptChecker);
cucumberLineReader.on('close', () => {
    fs.readdir(stepsDefinitionDir, (err, fileNames) => {
        if(err) throw new Error('Error occured while reading directory');
        fileNames.forEach(fileName => {
            const filePath = `${stepsDefinitionDir}/${fileName}`;
            const stepDefinitionReader = readLine.createInterface({
                input: fs.createReadStream(filePath),
            });
            stepDefinitionReader.on('line', stepDefinitionChecker);
            stepDefinitionReader.on('close', verifyCucumber);
        });
    });
});
