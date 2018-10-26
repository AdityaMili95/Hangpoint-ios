import ImagePicker from "react-native-image-picker";


const options = {
          title: 'Select Image',
          //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
      };
      
export function selectImage(callback){

    ImagePicker.showImagePicker(options, (response) => {

        if (response.didCancel) {
            
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          
        } else {
          const source = response.uri;
          const displaySource = 'data:image/jpeg;base64,' + response.data;

          if (callback){
          	callback(displaySource);
          }

          return;
        }

        if (callback){
          	callback("");
        }
    });

 }