import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/Upload.css";

const Upload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course:"",
    year: "",
    subject: "",
    type: "",
    secret: "",
  });

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("file", file);
    formDataToSend.append("course", formData.course);
    formDataToSend.append("year", formData.year);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("type", formData.type);

    try {
      const res = await axios.post("http://localhost:8000/api/files/upload", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          "admin-secret": formData.secret, 
        },
        withCredentials: true,
      });

      setMessage("File uploaded successfully.");
      setFormData({course:"", year: "", subject: "", type: "", secret: "" });
      setFile(null);
      navigate("/");
    } catch (error) {
      setMessage("Upload failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Notes / PYQ</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
          <label>course:</label>
          <select name="course" value={formData.course} onChange={handleChange} required>
            <option value="">Select Course</option>
            <option value="M.Tech">M.Tech</option>
            <option value="B.Tech">B.Tech</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
          </select>
        </div>
        <div>
          <label>Year:</label>
          <select name="year" value={formData.year} onChange={handleChange} required>
            <option value="">Select Year</option>
            <option value="First">First</option>
            <option value="Second">Second</option>
            <option value="Third">Third</option>
            <option value="Fourth">Fourth</option>
          </select>
        </div>

        <div>
          <label>Subject:</label>
          
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          
        </div>

        <div>
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="notes">Notes</option>
            <option value="pyq">PYQ</option>
          </select>
        </div>

        <div>
          <label>File:</label>
          <input type="file" name="file" onChange={handleFileChange} required />
        </div>

        <div>
          <label>Admin Secret:</label>
          <input
            type="password"
            name="secret"
            value={formData.secret}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Upload</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Upload;
