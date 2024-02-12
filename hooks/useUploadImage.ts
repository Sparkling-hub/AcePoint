import { useState } from 'react';
import { getDownloadURL, ref, storage, uploadBytesResumable } from '@/lib/firebase'

export const useUploadImage = () => {
    const [progress, setProgress] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const  uploadImage=async(uri:string) => {
          const response = await fetch(uri);
          const blob = await response.blob();
          const storageRef = ref(storage, "profileImage/" + new Date().getTime());
          const uploadTask = uploadBytesResumable(storageRef, blob);
          // listen for events
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              //console.log("Upload is " + progress + "% done");
              setProgress(parseInt(progress.toFixed()));
            },
            (error) => {
              // handle error
              console.log(error.message)
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
               // console.log("File available at", downloadURL);
                setImage(downloadURL)
              });
            } 
          );
          
    }
    return {uploadImage ,image,progress}
    
}
