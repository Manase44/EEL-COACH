import React, { useState } from "react";
import axios from "axios";

const DownloadReceipt = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const apifetch = async (e) => {
    e.preventDefault();
    if (!image) {
      console.error("No image selected");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "eelcoach21preset");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dray10swl/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data && response.data.secure_url) {
        const secureUrl = response.data.secure_url;
        const previewUrl = secureUrl.replace(
          "/upload/",
          "/upload/w_400/f_auto,q_auto/",
        );

        console.log(secureUrl);
        console.log(previewUrl);
      } else {
        console.error("Invalid response structure:", response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
    }
  };

  return (
    <form onSubmit={apifetch}>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default DownloadReceipt;
