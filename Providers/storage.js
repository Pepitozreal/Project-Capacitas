import {FileSystem as FS} from 'expo';
import Topic from "../Classes/Topic.js"

// WORKING DIRECTORY
dir = Expo.FileSystem.documentDirectory + 'user_images/'


//CHECK IF DIRECTORY EXISTS
FS.getInfoAsync(dir).then(r => {
    // IF NOT, CREATE DERIECTORY
    if (!r.exists) {
        FS.makeDirectoryAsync(dir).then(() => {
            //ALSO ADD .NOMEDIA
            FS.writeAsStringAsync(dir + '.NOMEDIA', '').catch(e => alert(e))
        }).catch((e) => {
            alert(e)
        })
    }
})



export default Storage = {


    createTopic: async (topic) => {
        topic_dir = dir + "/" + "topic_" + topic.id;
        await FS.makeDirectoryAsync(topic_dir)
        topic_dir = dir + "/topic_" + topic.id + "/.tda";
        await FS.writeAsStringAsync(topic_dir, JSON.stringify(topic))
    },

    saveTopic: (topic) => {
        topic_dir = dir + "/topic_" + topic.id + "/.tda";
        FS.writeAsStringAsync(topic_dir, JSON.stringify(topic))
    },

    loadAllTopics: async () => {
        return new Promise((resolve) => {

            FS.readDirectoryAsync(dir).then(async (dirs) => {
                topics = []
                for (i = 0; i < dirs.length; i++) {

                    if (dirs[i].substring(0,5) == "topic") {
                        await FS.readAsStringAsync(dir + "/" + dirs[i] + "/.tda").then((top) => {

                            top = JSON.parse(top);
                            newTop = new Topic("")
                            newTop.clone(top)
                            topics.push(newTop)
                        }).catch(() => {
                            
                        })
                        
                    }
                }

                resolve(topics)

            })
        });
        return {}
    },

    saveImage: (data, topic) => {
        // Get path to image
        uri = data.uri;
        //Extract new path
        newUri = dir + "/topic_" + topic.id + "/" + getFilename()
        // Move image to working directory
        FS.moveAsync({from:uri, to:newUri}).catch(e => alert(e))
        topic.push(newUri)
    },
    loadImage: async (topic, image_url) => {
        image_uri = dir + "/" + topic.id + "/" + image_url;
        const image = await FS.readAsStringAsync(image_url)
        Storage.image = image

    },
    loadAllImages: () => {
        // Loads all images from storage
    },
    deleteDir: (direc) => {
        FS.deleteAsync(direc).then(() => {
            alert("deleted")
        }).catch((e) => {
            alert(e)
        })
    },
    delete: async (topic) => {
        FS.deleteAsync(dir + "/topic_" + topic.id).then(() => {
            alert("deleted")
        }).catch((e) => {
            alert(e)
        })
    },
    Image: null
}

// SUPPLEMENTARY FUNCTIONS
let getFilename = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    let hh = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    if(dd<10) {
        dd = '0' + dd
    } 

    if(mm<10) {
        mm = '0' + mm
    }

    if(hh<10) {
        hh = '0' + hh
    } 

    if(min<10) {
        min = '0' + min
    } 
    if(sec<10) {
        sec = '0' + sec
    } 
    return yyyy + ':' + mm + ':' + dd + ':' + hh + ':' + min + ':' + sec + ':' + Math.floor(Math.random()*10000) + '.jpg';
}