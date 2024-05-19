import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import * as FileSystem from "expo-file-system";
//Custom hook to handle image picking and processing.
export const useImage = () => {
  const [image, setImage] = useState();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  // Function to pick an image from the library.
  //  If an image is selected, it reads the image file as a base64 string and sets the image state.
  const pickImage = async () => {
    // Launch image library picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result);
      try {
        const imageBuffer = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );
        // Set the image state with the selected image's details
        setImage({
          uri: result.assets[0].uri,
          buffer: imageBuffer,
          name: result.assets[0].name, // Fixed the property name to fileName
        });
      } catch (error) {
        console.error("Error reading image file:", error);
      }
    }
    console.log(result);
  };
  return { pickImage, image };
};

//RESULT SHAPE:
// {
// "assets":[
//  {
// "assetId":null,
// "base64":null,
// "duration":null,
// "exif":null,
// "fileName":null,
// "fileSize":16726258,
// "height":4285,
// "mimeType":"image/jpeg",
// "type":"image",
// "uri": ""
// "width":4284
//  }
// ],
// "canceled":false
// }
//
