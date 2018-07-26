import {FileSystem as FS} from 'expo';

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
    saveImage: (data) => {
        // Get path to image
        uri = data.uri;
        //Extract new path
        newUri = dir + getFilename()
        // Move image to working directory
        FS.moveAsync({from:uri, to:newUri}).catch(e => alert(e))
    },
    loadImage: async (key) => {
        const files = await FS.readDirectoryAsync(dir)
        if (files.length > 0) {
            Storage.Image = dir + files[files.length-1];
        }

    },
    loadAllImages: () => {
        // Loads all images from storage
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