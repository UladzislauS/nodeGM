import fs from 'fs';
import { DirWatcher } from './dirwatcher';

export class Importer {
    constructor(path) {
        const dirwatcher = new DirWatcher();

        dirwatcher.on(dirwatcher.CHANGED_EVENT, () => {
            this.import(path).then((result) => {
                console.log(JSON.stringify(result) );
            });
            // console.log(JSON.stringify( this.importSync(path) ) );
        });

        dirwatcher.watch(path, 100);
    }

    import(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, dir) => {
                const promises = Promise.all(dir.map((filename) => {
                    return new Promise((resolve, reject) => {
                        fs.readFile(`${path}/${filename}`, (err, data) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(  [ filename, this.parseCsvToJson( data.toString() ) ] );
                            }
                        });
                    });
                }));

                promises.then((...data) => {
                    const result = {};
                    data.forEach(([filename, value]) => {
                        result[filename] = value;
                    });
                    resolve(result);
                });
            });
        });
    }

    importSync(path) {
        const dir = fs.readdirSync(path);

        return dir.map((filename) => {
            const csv =  fs
                .readFileSync(`${path}/${filename}`)
                .toString();
            const json = this.parseCsvToJson( csv );

            return [filename, json ];
        });
    }

    parseCsvToJson(csv) {
        const lines = csv.split('\n');
        const keys = lines[0].split(',');
        const result = [];

        for (let i = 1; i < lines.length; i ++) {
            const data = {};
            const values=lines[i].split(',');

            values.forEach((value, key) => {
                data[ keys[key] ] = value;
            });

            result.push(data);
        }

        return result;
    }
}