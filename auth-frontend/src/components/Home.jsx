
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../components/Home.css";



const Home = () => {
  const [recentFiles, setRecentFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/files/recent")
      .then((res) => setRecentFiles(res.data))
      .catch((err) => console.error("Failed to fetch recent files", err));
  }, []);

  const handlePreview = (file) => {
    setSelectedFile(file);
  };



  return (
    <div className="home-wrapper">
      <div className="hero-box">
        <h1>🎓 Welcome to EduHub</h1>
        <p>Your centralized place for academic uploads, notes & PYQs.</p>
      </div>

      <div className="home-container">
        <h2>📥 Recently Uploaded</h2>
        {recentFiles.length === 0 ? (
          <p>No uploads yet!</p>
        ) : (
          recentFiles.map((file) => (
            <div key={file._id} className="file-card">
              <strong>{file.subject}</strong> ({file.type})<br /> <br/>
              
              <small>Year: {file.year}</small> <br /> <br/>
              <small>Uploaded on {new Date(file.createdAt).toLocaleDateString()}</small><br /> <br/>
              

              <button onClick={() => handlePreview(file)}>Preview</button>

              {selectedFile && selectedFile._id === file._id && (
                <div className="preview-container">
                  <h4>Preview: {selectedFile.filename}</h4>
                  <iframe
                    src={selectedFile.url}
                    width="100%"
                    height="600px"
                    title="PDF Preview"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      marginTop: "10px",
                    }}
                  />
                  <a href={selectedFile.url} download><br/>
                    📥 Download PDF
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
