import React, { useState } from "react";
import Login from "./Login";
import TeacherTracker from "./TeacherTracker";

function App() {
  const [teacher, setTeacher] = useState(null);

  return (
    <div>
      {teacher ? (
        <TeacherTracker teacher={teacher} />
      ) : (
        <Login onLogin={setTeacher} />
      )}
    </div>
  );
}

export default App;