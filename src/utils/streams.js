const path = require('path');
const fs = require('fs');
const through2 = require('through2');
const request = require('request');
const csvParse = require('csv-parse');
const yargs = require('yargs');

init();

module.exports = {
    init
};

function init() {
    const args = yargs
        .options({
            'action': {
                alias: 'a',
                describe: 'choose an action',
                choices: [
                    'read-file',
                    'transform-string',
                    'read-file-as-json',
                    'parse-file',
                    'bundle-css'
                ],
                demandOption: true
            },
            'file': {
                alias: 'f',
                describe: 'choose a file'
            },
            'path': {
                alias: 'p',
                describe: 'Specify the path'
            }
        })
        .help('help')
        .alias('help', 'h')
        .argv;

    switch (args.action) {
        case 'read-file':
            readFile(args.file);
            break;
        case 'transform-string':
            transformString();
            break;
        case 'read-file-as-json':
            readAsJSON(args.file);
            break;
        case 'parse-file':
            parseFile(args.file);
            break;
        case 'bundle-css':
            bundleCSS(args.path);
            break;
        default:
            break;
    }
}

function readFile(file) {
    if(!file) {
        console.error('File is not specified');
        return;
    }

    fs.createReadStream(file)
        .pipe(csvParse())
        .pipe(parseCSVToString())
        .pipe(process.stdout);
}

function transformString(file) {
    console.log('Type smth, please:\n');
    process.stdin
        .pipe(toUpperCase())
        .pipe(process.stdout);
}

function readAsJSON(file) {
    if(!file) {
        console.error('File is not specified');
        return;
    }

    fs.createReadStream(file)
        .pipe(csvParse())
        .pipe(parseCSVToObject())
        .pipe(stringify())
        .pipe(process.stdout);
}

function parseFile(file) {
    if(!file) {
        console.error('File is not specified');
        return;
    }

    const writeStream = fs.createWriteStream(file.replace('.csv', '.json'));

    fs.createReadStream(file)
        .pipe(csvParse())
        .pipe(parseCSVToObject())
        .pipe(stringify())
        .pipe(writeStream);
}

function bundleCSS(directory) {
    if(!directory) {
        console.error('Path is not specified');
        return;
    }

    const CSS_URL = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';

    fs.readdir(directory, (err, files) => {
        const writeStream = fs.createWriteStream(directory + '/bundle.css')
        const filesStreams = files.reduce((streams, file) => {
            if ( file.indexOf('.css') === -1 || file.indexOf('bundle.css') > -1) {
                return streams;
            }
            const currentFile = path.join(directory, file);
            const fileStream = fs.createReadStream(currentFile);
            streams.push(fileStream);

            return streams;
        }, []);

        filesStreams.forEach(fileStream => {
            fileStream.pipe(writeStream, {end: false} );
            fileStream.once('end', () => {
                if ( filesStreams.every(stream => stream.closed) ) {
                    request(CSS_URL).pipe(writeStream);
                };
            });
        });
    });
};

function parseCSVToString() {
    return through2.obj(function(chunk, encoding, callback) {
        this.push(chunk + '\n');
        callback();
    });
}

function parseCSVToObject() {
    let titles = null;

    return through2.obj(function(chunk, encoding, callback) {
        if ( !titles && chunk ) {
            titles = chunk;
        } else {
            const value = titles.reduce((result, value, index) => {
                result[value] = chunk[index];

                return result;
            }, {});

            this.push(value);
        }
        callback();
    });
}

function stringify() {
    return through2.obj(function(chunk, encoding, callback) {
        this.push(JSON.stringify(chunk, null, 4));
        callback();
    });
}

function toUpperCase() {
    return through2.obj(function(chunk, encoding, callback) {
        const string = chunk
            .toString()
            .toUpperCase();

        this.push(string);
        callback();
    });
}
