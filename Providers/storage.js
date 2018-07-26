import {AsyncStorage} from 'react-native';



export default Storage = {
    saveImage: (image) => {
        alert(image.length)
        AsyncStorage.setItem("Image", image)
        .then(() => alert("saved!"))
        .catch((e) => alert(e))
    },
    loadImage: (key) => {
       AsyncStorage.getItem("Image")
       .then((result) => { 
            Storage.Image = result;
       })
       .catch(e => alert(e))
    },
    loadAllImages: () => {
        // Loads all images from storage
    },
    Image: null
}
