import fs from 'fs';
import { debounce } from 'lodash';
import EventEmitter from 'events';

export class DirWatcher extends EventEmitter{
    constructor() {
        super();
        this.CHANGED_EVENT = 'dirwatcher:changed';
    }

    watch(path, delay) {
        const handler = (eventType, filename) => {
            this.emit(this.CHANGED_EVENT, eventType, filename);
        };

        fs.watch(path, delay ? debounce(handler, delay) : handler);
    }
}
