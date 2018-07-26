import {AsyncStorage} from 'react-native';



export default Storage = {
    saveImage: (image) => {
        AsyncStorage.setItem("Image", image)
        .then(() => alert("saved!"))
        .catch((e) => alert(e))
    },
    loadImage: (key) => {
       AsyncStorage.getItem("Image", (result) => {
            Storage.Image = result;
       })
    },
    loadAllImages: () => {
        // Loads all images from storage
    },
    Image: null
}
