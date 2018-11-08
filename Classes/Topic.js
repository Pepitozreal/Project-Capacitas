import Storage from "../Providers/storage.js"

export default class Topic {

    name;
    date;
    version = 1;
    images;
    id;

    constructor(name) {
        this.name = name;
        this.date = Date.now();
        this.images = [];
        this.id = this.date + ":" + Math.round(Math.random()*1000)
    }

    create() {
        Storage.createTopic(this)
    }

    clone(topic) {
        this.name = topic.name;
        this.date = topic.date;
        this.version = topic.version;
        this.images = topic.images;
        this.id = topic.id;
    }
  

    push(uri) {
        this.images.push({uri: uri, timestamp: Date.now()});
        this.save();
    }

    save() {
        Storage.saveTopic(this)
    }

    delete() {
        Storage.delete(this)
    }
}