import {AsyncStorage} from 'react-native';
export default class Storage extends React.Component { 
    constructor(props){
        super(props)

        this.state = {
            pictureBase64: null,
        }
    } 
    }



const Storage = {
    saveImage: (image) => {
        AsyncStorage.setItem("Image", this.state.pictureBase64)
    },
    loadImage: (key) => {
       AsyncStorage.getItem("Image" ), (result) => {
            this.setState({pictureBase64: result});
       }
    },
    loadAllImages: () => {
        // Loads all images from storage
    }
}

