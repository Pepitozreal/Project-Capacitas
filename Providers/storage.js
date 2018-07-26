import {AsyncStorage} from 'react-native';



export default Storage = {
    saveImage: (image) => {
        AsyncStorage.setItem("Image", image)
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
