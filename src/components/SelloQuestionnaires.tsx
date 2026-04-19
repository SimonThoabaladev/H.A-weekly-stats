import React, { useState, useEffect } from 'react';
import './SelloQuestionnaires.css';

interface QuestionResponse {
  id: number;
  question: string;
  answer: string;
  questionType: 'text' | 'textarea' | 'rating' | 'multiselect' | 'yesno';
  options?: string[];
}

interface SubmissionRecord {
  recordId: string;
  submittedAt: string;
  responses: QuestionResponse[];
  pdfContent: string;
}

type ViewType = 'form' | 'results' | 'records';

const SelloQuestionnaires: React.FC = () => {
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [formData, setFormData] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('form');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [submissionRecords, setSubmissionRecords] = useState<SubmissionRecord[]>([]);

  useEffect(() => {
    loadRecordsFromStorage();
  }, []);

  const loadRecordsFromStorage = () => {
    try {
      const stored = localStorage.getItem('selloQuestionnairesRecords');
      if (stored) {
        setSubmissionRecords(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading records:', error);
    }
  };

  const saveRecordsToStorage = (records: SubmissionRecord[]) => {
    try {
      localStorage.setItem('selloQuestionnairesRecords', JSON.stringify(records));
    } catch (error) {
      console.error('Error saving records:', error);
    }
  };

  const questions: QuestionResponse[] = [
    {
      id: 1,
      question: 'Can you tell me about yourself — what you study, how you spend your time, and what a typical week looks like?',
      answer: '',
      questionType: 'textarea'
    },
    {
      id: 2,
      question: 'Tell me about the last time you got materials that prepare you for the exam and got a job online. Walk me through what happened from start to finish.',
      answer: '',
      questionType: 'textarea'
    },
    {
      id: 3,
      question: 'What was the most frustrating part of that process for you?',
      answer: '',
      questionType: 'textarea'
    },
    {
      id: 4,
      question: 'What have you tried before to solve that frustration? How did that go?',
      answer: '',
      questionType: 'textarea'
    },
    {
      id: 5,
      question: 'How often does this situation come up for you? And when it does — how much does it affect you?',
      answer: '',
      questionType: 'textarea'
    },
    {
      id: 6,
      question: 'If this problem were completely solved, what would that look like for you? What would be different?',
      answer: '',
      questionType: 'textarea'
    },
    {
      id: 7,
      question: 'Is there anything about this topic I haven\'t asked that you think I should know?',
      answer: '',
      questionType: 'textarea'
    },
    {
      id: 8,
      question: 'When your revision gets off-track, how much does it affect your exam performance?',
      answer: '',
      questionType: 'rating'
    },
    {
      id: 9,
      question: 'What do you currently do to keep track of what to study? (Select all that apply)',
      answer: '',
      questionType: 'multiselect',
      options: ['Paper notes', 'Phone reminders', 'WhatsApp', 'Nothing', 'Other']
    },
    {
      id: 10,
      question: 'What is the biggest challenge you face when preparing for exams? (Open text — 2–3 sentences)',
      answer: '',
      questionType: 'textarea'
    },
    {
      id: 11,
      question: 'If a tool helped you build and stick to a revision schedule in under 5 minutes — how interested would you be?',
      answer: '',
      questionType: 'rating'
    },
    {
      id: 12,
      question: 'Would you be willing to speak to us for 15 minutes about your study habits? (Yes / No — if Yes, leave contact details)',
      answer: '',
      questionType: 'text'
    }
  ];

  const handleAnswerChange = (questionId: number, value: string) => {
    setFormData({
      ...formData,
      [questionId]: value
    });
  };

  const handleMultiSelectChange = (questionId: number, option: string) => {
    const currentValue = formData[questionId] || '';
    const selectedOptions = currentValue ? currentValue.split('; ') : [];
    const updatedSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setFormData({
      ...formData,
      [questionId]: updatedSelection.join('; ')
    });
  };

  const handleSubmit = () => {
    const allResponses = questions.map((q) => ({
      ...q,
      answer: formData[q.id] || ''
    }));

    setResponses(allResponses);
    setSubmitted(true);
    setCurrentView('results');
  };

  const handleReset = () => {
    setFormData({});
    setResponses([]);
    setSubmitted(false);
    setEmailStatus({ type: null, message: '' });
    setCurrentView('form');
  };

  const handleSaveRecord = () => {
    const pdfContent = generatePDF();
    const newRecord: SubmissionRecord = {
      recordId: Date.now().toString(),
      submittedAt: new Date().toLocaleString(),
      responses: responses,
      pdfContent: pdfContent
    };

    const updatedRecords = [newRecord, ...submissionRecords];
    setSubmissionRecords(updatedRecords);
    saveRecordsToStorage(updatedRecords);

    setEmailStatus({
      type: 'success',
      message: '✓ Response saved to your records'
    });

    setTimeout(() => {
      setEmailStatus({ type: null, message: '' });
    }, 3000);
  };

  const downloadRecordPDF = (record: SubmissionRecord) => {
    const dataStr = record.pdfContent;
    const dataBlob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `questionnaire-${record.recordId}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const deleteRecord = (recordId: string) => {
    const updatedRecords = submissionRecords.filter(r => r.recordId !== recordId);
    setSubmissionRecords(updatedRecords);
    saveRecordsToStorage(updatedRecords);
  };

  const generatePDF = (): string => {
    let pdfContent = 'SELLO QUESTIONNAIRES - FEEDBACK REPORT\n';
    pdfContent += '='.repeat(50) + '\n\n';
    pdfContent += `Generated on: ${new Date().toLocaleString()}\n\n`;
    
    responses.forEach((response, index) => {
      pdfContent += `Question ${index + 1}:\n`;
      pdfContent += `${response.question}\n\n`;
      pdfContent += `Answer:\n${response.answer || '(No response provided)'}\n\n`;
      pdfContent += '-'.repeat(50) + '\n\n';
    });

    return pdfContent;
  };

  const handleSendEmail = async () => {
    setEmailLoading(true);
    setEmailStatus({ type: null, message: '' });

    try {
      const pdfContent = generatePDF();
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `questionnaire-feedback-${timestamp}.pdf`;

      const payload = {
        to: 'sellosthoabala@gmail.com',
        subject: 'Sello Questionnaire Feedback - ' + new Date().toLocaleString(),
        pdfContent: pdfContent,
        filename: filename,
        responses: responses
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      await response.json();
      setEmailStatus({ 
        type: 'success', 
        message: `✓ Email sent successfully to sellosthoabala@gmail.com` 
      });

      setTimeout(() => {
        setEmailStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailStatus({ 
        type: 'error', 
        message: 'Failed to send email. Please try downloading the file instead.' 
      });
    } finally {
      setEmailLoading(false);
    }
  };

  const handleExport = () => {
    const exportData = responses.map((r) => ({
      question: r.question,
      answer: r.answer
    }));

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `questionnaire-feedback-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div className="questionnaire-page">
      <div className="questionnaire-header">
        <div>
          <h1>Sello Questionnaires</h1>
          <p>User Research & Feedback Collection</p>
        </div>
        <div className="questionnaire-header-meta">
          <span className="record-count">📚 {submissionRecords.length} responses saved</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="questionnaire-tabs">
        <button
          className={`tab-button ${currentView === 'form' ? 'active' : ''}`}
          onClick={() => setCurrentView('form')}
        >
          📋 New Response
        </button>
        <button
          className={`tab-button ${currentView === 'records' ? 'active' : ''}`}
          onClick={() => setCurrentView('records')}
        >
          📂 Your Records ({submissionRecords.length})
        </button>
      </div>

      {/* Form View */}
      {currentView === 'form' && !submitted && (
        <div className="questionnaire-form-container">
          <div className="form-intro">
            <h2>User Feedback Survey</h2>
            <p>Your honest feedback helps us understand your needs and improve our services. Please take a few minutes to answer the following questions.</p>
          </div>

          <form className="questionnaire-form">
            {questions.map((question, index) => (
              <div key={question.id} className="question-block">
                <div className="question-number-badge">{index + 1}</div>
                <label className="question-label">
                  {question.question}
                </label>

                {question.questionType === 'textarea' && (
                  <textarea
                    className="question-textarea"
                    placeholder="Enter your response..."
                    value={formData[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    rows={4}
                  />
                )}

                {question.questionType === 'rating' && (
                  <div className="rating-options">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className={`rating-button ${formData[question.id] === rating.toString() ? 'active' : ''}`}
                        onClick={() => handleAnswerChange(question.id, rating.toString())}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                )}

                {question.questionType === 'multiselect' && question.options && (
                  <div className="multiselect-options">
                    {question.options.map((option) => {
                      const selectedValues = formData[question.id] ? formData[question.id].split('; ') : [];
                      const isSelected = selectedValues.includes(option);
                      return (
                        <label key={option} className={`checkbox-option ${isSelected ? 'selected' : ''}`}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleMultiSelectChange(question.id, option)}
                          />
                          {option}
                        </label>
                      );
                    })}
                  </div>
                )}

                {question.questionType === 'text' && (
                  <input
                    type="text"
                    className="question-input"
                    placeholder="Enter your response..."
                    value={formData[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  />
                )}
              </div>
            ))}

            <div className="form-actions">
              <button
                type="button"
                className="submit-button"
                onClick={handleSubmit}
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Results View */}
      {currentView === 'results' && submitted && (
        <div className="questionnaire-results">
          <div className="results-summary">
            <div className="summary-card success">
              <h3>✓ Feedback Recorded</h3>
              <p>{responses.length} responses collected successfully</p>
            </div>
          </div>

          <div className="results-list">
            <h2>Your Responses</h2>
            {responses.map((response, index) => (
              <div key={response.id} className="response-item">
                <div className="response-header">
                  <span className="response-number">Q{index + 1}</span>
                  <h3 className="response-question">{response.question}</h3>
                </div>
                <div className="response-answer">
                  {response.answer || '(No response provided)'}
                </div>
              </div>
            ))}
          </div>

          {emailStatus.message && (
            <div className={`email-status ${emailStatus.type}`}>
              {emailStatus.message}
            </div>
          )}

          <div className="results-actions">
            <button 
              className="save-record-button" 
              onClick={handleSaveRecord}
            >
              💾 Save to My Records
            </button>
            <button 
              className="send-email-button" 
              onClick={handleSendEmail}
              disabled={emailLoading}
            >
              {emailLoading ? '📧 Sending...' : '📧 Send to Email'}
            </button>
            <button className="export-button" onClick={handleExport}>
              Download as JSON
            </button>
            <button className="reset-button" onClick={handleReset}>
              Collect Another Response
            </button>
          </div>
        </div>
      )}

      {/* Records View */}
      {currentView === 'records' && (
        <div className="questionnaire-records">
          <div className="records-header">
            <h2>Your Saved Responses</h2>
            <p>All your submitted questionnaire responses</p>
          </div>

          {submissionRecords.length === 0 ? (
            <div className="no-records">
              <h3>📭 No saved responses yet</h3>
              <p>Submit a questionnaire and click "Save to My Records" to store your responses</p>
              <button 
                className="submit-button"
                onClick={() => setCurrentView('form')}
              >
                Start New Response
              </button>
            </div>
          ) : (
            <div className="records-list">
              {submissionRecords.map((record) => (
                <div key={record.recordId} className="record-card">
                  <div className="record-header">
                    <div className="record-info">
                      <h3>Response #{submissionRecords.indexOf(record) + 1}</h3>
                      <p className="record-date">📅 {record.submittedAt}</p>
                    </div>
                    <span className="record-question-count">
                      {record.responses.filter(r => r.answer).length}/{record.responses.length} answered
                    </span>
                  </div>

                  <div className="record-preview">
                    {record.responses.slice(0, 3).map((response, idx) => (
                      <div key={idx} className="preview-item">
                        <strong>Q{idx + 1}:</strong> {response.answer.substring(0, 80)}...
                      </div>
                    ))}
                  </div>

                  <div className="record-actions">
                    <button 
                      className="download-record-button"
                      onClick={() => downloadRecordPDF(record)}
                    >
                      📥 Download PDF
                    </button>
                    <button 
                      className="view-record-button"
                      onClick={() => {
                        setResponses(record.responses);
                        setCurrentView('form');
                      }}
                    >
                      👁️ View Full
                    </button>
                    <button 
                      className="delete-record-button"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this record?')) {
                          deleteRecord(record.recordId);
                        }
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelloQuestionnaires;
