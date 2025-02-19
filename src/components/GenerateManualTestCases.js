import React, { useState } from 'react';

const GenerateManualTestCases = () => {
  const [testType, setTestType] = useState({
    positive: false,
    negative: false,
    edge: false,
  });
  const [applicationUrl, setApplicationUrl] = useState('');
  const [userStory, setUserStory] = useState('');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState('');
  const [epicStory, setEpicStory] = useState('');
  const [loading, setLoading] = useState(false); // Fix: Loading state

  const handleTestTypeChange = (type) => {
    setTestType((prev) => ({ ...prev, [type]: !prev[type] })); // Fix: Using prev state properly
  };

  const generateTestCasesAndDownload = async () => {
    setLoading(true); // Start loading

    try {
      let response = await fetch("http://localhost:8080/api/generateTestCases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testType,
          userStoryDescription: userStory,
          applicationUrl,
          acceptanceCriteria,
          epicDescription: epicStory,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate test cases");

      let jsonResponse = await response.json(); // Fix: Using 'let' instead of 'const'

      let excelResponse = await fetch("http://localhost:8080/api/downloadTestCases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonResponse),
      });

      if (!excelResponse.ok) throw new Error("Failed to convert test cases to Excel");

      let blob = await excelResponse.blob(); // Fix: Using 'let'
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = url;
      link.download = "test_cases.xlsx";
      link.click();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false); // Stop loading after API call completes
    }
  };

  return (
    <div className="section generate-manual-testcases">
      <h2>Generate Manual Test Cases</h2>
      <div className="form-group">
        <label>Application URL:</label>
        <input
          type="text"
          value={applicationUrl}
          onChange={(e) => setApplicationUrl(e.target.value)}
          placeholder="Enter Application URL"
        />
      </div>
      <div className="form-group">
        <label>User Story Description:</label>
        <textarea
          value={userStory}
          onChange={(e) => setUserStory(e.target.value)}
          placeholder="Enter user story description"
        />
      </div>
      <div className="form-group">
        <label>Acceptance Criteria:</label>
        <textarea
          value={acceptanceCriteria}
          onChange={(e) => setAcceptanceCriteria(e.target.value)}
          placeholder="Enter acceptance criteria"
        />
      </div>
      <div className="form-group">
        <label>Epic Story Description (Optional):</label>
        <textarea
          value={epicStory}
          onChange={(e) => setEpicStory(e.target.value)}
          placeholder="Enter epic story description (optional)"
        />
      </div>
      <div className="form-group">
        <label>Test Type:</label>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" checked={testType.positive} onChange={() => handleTestTypeChange('positive')} />
            Positive
          </label>
          <label>
            <input type="checkbox" checked={testType.negative} onChange={() => handleTestTypeChange('negative')} />
            Negative
          </label>
          <label>
            <input type="checkbox" checked={testType.edge} onChange={() => handleTestTypeChange('edge')} />
            Edge
          </label>
        </div>
      </div>

      <button onClick={generateTestCasesAndDownload} disabled={loading}>
        {loading ? "Generating & Downloading..." : "Generate and Download Test Cases"}
      </button>

      {loading && <div className="spinner">Loading...</div>}
    </div>
  );
};

export default GenerateManualTestCases;
