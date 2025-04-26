import "./TeacherTracker.css";
import React, { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import { db } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";

function TeacherTracker({ teacher }) {
  const [status, setStatus] = useState(teacher.status || "Free");
  const [roomNumber, setRoomNumber] = useState("");

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          await updateDoc(doc(db, "teachers", teacher.email), {
            location: { lat: latitude, lng: longitude },
            updatedAt: new Date(),
          });
          console.log("Location updated!");
        } catch (err) {
          console.error("Location update failed:", err);
        }
      },
      (err) => console.error("Geo error:", err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [teacher.email]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      await updateDoc(doc(db, "teachers", teacher.email), {
        status: newStatus,
      });
      console.log("Status updated!");
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const handleRoomSubmit = async () => {
    if (!roomNumber.trim()) return alert("Please enter a valid room number.");
    try {
      await updateDoc(doc(db, "teachers", teacher.email), {
        room: roomNumber,
        updatedAt: new Date(),
      });
      console.log("Room number updated!");
      alert("Room number submitted!");
    } catch (err) {
      console.error("Room update failed:", err);
    }
  };

  return (
    <div className="tracker-container">
      <div className="tracker-box">
        <img src={logo} alt="Logo" />
        <h2>LocateMyProf</h2>
        <p><strong>Name:</strong> {teacher.name}</p>
        <p><strong>Designation:</strong> {teacher.designation}</p>
        <p>
          <strong>Status:</strong>{" "}
          <select value={status} onChange={handleStatusChange}>
            <option>Free</option>
            <option>Busy</option>
            <option>In Class</option>
          </select>
        </p>
        <div className="room-entry">
          <input
            type="text"
            placeholder="Enter Room Number (e.g. B-101)"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="room-input"
          />
          <button className="submit-room-btn" onClick={handleRoomSubmit}>
             Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherTracker;
