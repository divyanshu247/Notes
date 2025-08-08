import React, { useState,useEffect } from "react";
import axios from "axios";
import "../components/Notes.css";

/*const Notes = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [files, setFiles] = useState([]);

  const years = ["First", "Second", "Third", "Fourth"];

  const handleYearClick = (year) => {
    setSelectedYear(year);
    axios
      .get(`http://localhost:8000/api/files?year=${year}&type=notes`)
      .then((res) => {
        setFiles(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="notes-container">
      <h2 className="notes-title">Available Notes</h2>
      <div className="notes-year-list">
        {years.map((year) => (
          <button
            key={year}
            className="notes-year-button"
            onClick={() => handleYearClick(year)}
          >
            {year}
          </button>
        ))}
        
      </div>

      {selectedYear && (
        <div className="notes-subject-section">
          <h3>Aktu Notes for {selectedYear} Year</h3>
          <ul>
            {files.map((file) => (
              <li key={file._id}>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.filename}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};*/
const courseOptions = {
  "B.Tech": ["First", "Second", "Third", "Fourth"],
  "M.Tech": ["First", "Second"],
  "BCA": ["First", "Second", "Third"],
  "BBA": ["First", "Second", "Third"]
};

const subjectOptions = {
  "B.Tech": {
    First: ["Maths", "Physics","Chemistry","PPS","C Programming","Maths II","Electrical","Elecrtonics"],
    Second: ["DBMS", "DSA","TAFL","DSTL","Maths IV","OOPS","Python","Opearating System"],
    Third: ["Compiler Design", "CN","Machine Learning","Software Engineering","SPM","Big Data","Data Analytics"],
    Fourth: ["AI", "ML"]
  },
  BCA: {
    First: ["C Programming", "Computer Fundamentals"],
    Second: ["DBMS", "Java"],
    Third: ["Web Dev", "Python"]
  }
};
const Notes = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (selectedCourse && selectedYear && selectedSubject) {
      axios
        .get("http://localhost:8000/api/files", {
          params: {
            course: selectedCourse,
            year: selectedYear,
            subject: selectedSubject,
            type: "notes"
          }
        })
        .then((res) => setFiles(res.data))
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [selectedCourse, selectedYear, selectedSubject]);

  

  return (
    <div className="notes-container">
      <h2 className="notes-title">Available Notes</h2>

      {/* Course Dropdown */}
      <select
        value={selectedCourse}
        onChange={(e) => {
          setSelectedCourse(e.target.value);
          setSelectedYear("");
          setSelectedSubject("");
          setFiles([]);
          setSelectedFile(null);
        }}
      >
        <option value="">-- Select Course --</option>
        {Object.keys(courseOptions).map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>

      {/* Year Buttons */}
      {selectedCourse && (
        <div className="notes-year-list">
          {courseOptions[selectedCourse].map((year) => (
            <button
              key={year}
              className={`pyq-year-button ${
                year === selectedYear ? "active" : ""
              }`}
              onClick={() => {
                setSelectedYear(year);
                setSelectedSubject("");
                setFiles([]);
                setSelectedFile(null);
              }}
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {/* Subject Dropdown */}
      {selectedYear && (
        <select
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            setSelectedFile(null);
          }}
        >
          <option value="">-- Select Subject --</option>
          {(subjectOptions[selectedCourse]?.[selectedYear] || []).map(
            (subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            )
          )}
        </select>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="notes-subject-section">
          <h3>
            Notes for {selectedSubject} ({selectedYear}, {selectedCourse})
          </h3>
          <ul>
            {files.map((file, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                <strong>{file.filename}</strong>{" "}
                <button onClick={() => setSelectedFile(file)}>Preview</button>{" "}
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginLeft: "10px" }}
                >
                  Download
                </a>
                
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Preview */}
      {selectedFile && (
        <div className="pdf-preview-section" style={{ marginTop: "30px" }}>
          <h4>Preview: {selectedFile.filename}</h4>
          <iframe
            src={selectedFile.url}
            width="100%"
            height="600px"
            title="PDF Preview"
            style={{
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginTop: "10px"
            }}
          />
        </div>
      )}
    </div>
  );
};






export default Notes;
