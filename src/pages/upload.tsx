import React, { useState } from 'react';
import styled from '@emotion/styled';
import { uploadPDF } from '../services/api';

const Container = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom right, #f3f4f6, #dce3dc);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  overflow-y: auto;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 2rem;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  backdrop-filter: blur(15px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #2e3d35;
  margin-bottom: 1rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid #cad3cb;
  background-color: #edf1ee;
  color: #2e3d35;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #6ca48d;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
`;

const SummarySection = styled.div`
  margin-top: 2rem;
  background: #f6f9f7;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  color: #2e3d35;
`;

type SummaryResult = {
  summary: string;
  keyPoints?: string[];
  suggestedActions?: string[];
};

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState<SummaryResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Veuillez sélectionner un fichier.');
      return;
    }

    try {
      setLoading(true);
      const result = await uploadPDF(file);
      setSummary(result);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'envoi du fichier.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Upload a PDF to Summarize</Title>
        <Input type="file" accept="application/pdf" onChange={handleFileChange} />
        <Button onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload & Summarize'}
        </Button>
        {error && <ErrorText>{error}</ErrorText>}
      </Card>

      {summary && (
        <SummarySection>
          <h3>📄 Summary</h3>
          <p>{summary.summary}</p>

          {Array.isArray(summary.keyPoints) && summary.keyPoints.length > 0 && (
            <>
              <h4>🔑 Key Points</h4>
              <ul>
                {summary.keyPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </>
          )}

          {Array.isArray(summary.suggestedActions) && summary.suggestedActions.length > 0 && (
            <>
              <h4>✅ Suggested Actions</h4>
              <ul>
                {summary.suggestedActions.map((action, idx) => (
                  <li key={idx}>{action}</li>
                ))}
              </ul>
            </>
          )}
        </SummarySection>
      )}
    </Container>
  );
};

export default FileUpload;
// export default FileUpload