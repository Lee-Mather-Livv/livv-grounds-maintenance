import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function SubmitRequest() {
  const [location, setLocation] = useState("");
  const [issue, setIssue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "requests"), {
      location,
      issue,
      status: "Pending",
      createdAt: new Date(),
    });
    alert("Request submitted!");
    setLocation("");
    setIssue("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Submit Maintenance Request</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g., Park South)"
          required
          style={{ display: "block", margin: "10px 0", padding: "8px" }}
        />
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Describe the issue..."
          required
          style={{ display: "block", margin: "10px 0", padding: "8px", width: "300px", height: "100px" }}
        />
        <button 
          type="submit"
          style={{ background: "#0070f3", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
