import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

const Alter = () => {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState([]);

  function handleImageChange(e) {
    const files = e.target.files; // Get the all the selected file
    setSelectedImages(Array.from(files));
  }
  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    // formData.append('image[]', selectedImage);
    selectedImages.forEach((file, index) => {
      formData.append("images[]", file);
    });
    try {
      const response = await axios.post(
        "http://127.0.0.1:3001/imgupload?token=" + token,
        formData
      );
    } catch (err) {
      console.log("errre", err);
    }

    // Append the selected image to the FormData object
    // if(response.status==200){
    //   // console.log(response.data)
    // }
  };
  useEffect(() => {
    const gettoken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
      } else {
        try {
          const response = await axios.post(
            "http://127.0.0.1:3001/validationToken?token=" + token,
            { token }
          );
          const expiryTime = response.data?.expiry;
          // console.log(Date.now());
          // console.log("yes ", expiryTime);
          if (Date.now() < expiryTime) {
            router.push("/");
          }
        } catch (error) {
          console.error("Error validating token:", error);
          localStorage.setItem("token", "");
          router.push("/");
        }
      }
    };
    gettoken();
  }, []);

  async function emailSend(){
    const response= await axios.post("http://127.0.0.1:3001/sendmail")
    alert("sucessfully email send")
  }

  return (
    <div>
      Next UI
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleImageChange(e)}
      />
      {selectedImages.length > 0 &&
        selectedImages.map((file, index) => (
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded Preview"
            style={{ maxWidth: "300px", marginTop: "10px" }}
          />
        ))}
        <div className="d-flex justify-content-between">
      <button className="btn btn-primary text-center" onClick={(e) => submit(e)}>Submit</button>

      <button className='btn btn-primary text-center' onClick={emailSend}>Send E-mail</button>
      </div>
    </div>
  );
};

export default Alter;

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';

// const Alter = () => {
//   const router = useRouter();
//   const [selectedImages, setSelectedImages] = useState([]);

//   function handleImageChange(e) {
//     const files = e.target.files;   // Get the selected files
//     const fileList = Array.from(files);  // Convert FileList to an array
//     setSelectedImages(fileList);
//   }

//   const submit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     const formData = new FormData();

//     // Append each selected image to the FormData object
//     selectedImages.forEach((image) => {
//       formData.append('images[]', image);
//     });

//     try {
//       const response = await axios.post(
//         'http://127.0.0.1:3001/imgupload?token=' + token,
//         formData
//       );

//       // Handle the response if needed
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error uploading images:', error);
//     }
//   };

//   useEffect(() => {
//     const gettoken = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/');
//       } else {
//         try {
//           const response = await axios.post(
//             'http://127.0.0.1:3001/validationToken?token=' + token,
//             { token }
//           );
//           const expiryTime = response.data?.expiry;
//           console.log('yes ', expiryTime);
//           console.log(Date.now());

//           if (Date.now() < expiryTime) {
//             router.push('/');
//           }
//         } catch (error) {
//           console.error('Error validating token:', error);
//           localStorage.setItem('token', '');
//           router.push('/');
//         }
//       }
//     };
//     gettoken();
//   }, []);

//   return (
//     <div>
//       Next UI
//       <input type="file" accept="image/*" multiple onChange={(e) => handleImageChange(e)} />
//       {selectedImages.map((image, index) => (
//         <img
//           key={index}
//           src={URL.createObjectURL(image)}
//           alt="Uploaded Preview"
//           style={{ maxWidth: '300px', marginTop: '10px' }}
//         />
//       ))}
//       <button onClick={(e) => submit(e)}>Submit</button>
//     </div>
//   );
// };

// export default Alter;
