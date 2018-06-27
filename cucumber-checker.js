const preparedLines = [];
const stepsLines = [];

let cucumberLineNumber = 1;

const prepareLineToCheck = (line, number) => {
    const prefix = line.split(' ').filter(x => x !== '').shift();
    let preparedLine = line.replace(prefix, '').replace(/".*"/gm, '"([^"]*)"').replace(/<.*>/gm, '([^"]*)').trim();
    preparedLines.push({line: preparedLine, number});
};

const cucumberScriptChecker = line => {
    if (cucumberLineNumber === 1 && !line.includes('Feature:')) {
        throw new Error('You have to provide Feature at the beginning');
    }
    if (line.includes('Given') || line.includes('When') || line.includes('Then')) {
        prepareLineToCheck(line, cucumberLineNumber);
    }
    cucumberLineNumber++;
};

const stepDefinitionChecker = line => {
    if (line.includes('given') || line.includes('when') || line.includes('then')) {
        stepsLines.push(line.trim());
    }
};

const verifyCucumber = () => {
    let allLinesAreFine = true;
    preparedLines.forEach(cucumberLine => {
        let thisLineIsFine = false;
        stepsLines.forEach(stepDefinitionLine => {
            if (stepDefinitionLine.includes(cucumberLine.line)) {
                thisLineIsFine = true;
            }
        });

        if (!thisLineIsFine) {
            console.log('\x1b[31m%s\x1b[0m', `Line ${cucumberLine.number} is not defined`);
            allLinesAreFine = false;
        }
    });

    if (allLinesAreFine) {
        console.log('\x1b[32m%s\x1b[0m', '\u{1f44d} Everything is right \u{1f60e}');
    }
};

module.exports.cucumberScriptChecker = cucumberScriptChecker;
module.exports.stepDefinitionChecker = stepDefinitionChecker;
module.exports.verifyCucumber = verifyCucumber;
