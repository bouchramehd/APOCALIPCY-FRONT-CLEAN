import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FiUploadCloud } from 'react-icons/fi';
import { uploadPDF } from '../services/api';

const words = [
  'Summarize PDFs instantly',
  'AI-powered document tools',
  'Generate concise overviews',
  'Unlock hidden insights',
  'Smart knowledge extraction',
];

const Container = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom right, #f3f4f6, #dce3dc);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
`;

const Circle = styled.div<{ size: number; opacity: number }>`
  position: absolute;
  border-radius: 9999px;
  background-color: #d0dad4;
  opacity: ${(props) => props.opacity};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  left: calc(50% - ${(props) => props.size / 2}px);
  top: calc(50% - ${(props) => props.size / 2}px);
  animation: ripple 15s infinite ease-in-out;

  @keyframes ripple {
    0%, 100% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.2);
    }
  }
`;

const CyclingWord = styled.div`
  position: absolute;
  top: 10%;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2e3d35;
  z-index: 5;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 3rem;
  border-radius: 25px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(18px);
  z-index: 10;
`;

const Title = styled.h1`
  text-align: center;
  color: #2e3d35;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2e3d35;
  font-weight: 500;
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileButton = styled.label`
  width: 100%;
  padding: 0.75rem;
  background-color: #6ca48d;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    opacity: 0.95;
    transform: scale(1.03);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
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
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    opacity: 0.95;
    transform: scale(1.03);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
  margin-top: 0.5rem;
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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
      setError('');
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'envoi du fichier.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Circle size={1000} opacity={0.08} />
      <Circle size={800} opacity={0.1} />
      <Circle size={600} opacity={0.15} />
      <Circle size={400} opacity={0.2} />
      <Circle size={200} opacity={0.25} />

      <CyclingWord>{words[index]}</CyclingWord>

      <Card>
        <Title>Upload & Summarize PDF</Title>
        <Label htmlFor="file-upload">Choose a PDF file:</Label>
        <HiddenInput
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <FileButton htmlFor="file-upload">
          <FiUploadCloud size={20} />
          {file ? file.name : 'Select a PDF file'}
        </FileButton>

        <Button onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload & Summarize'}
        </Button>

        {error && <ErrorText>{error}</ErrorText>}
      </Card>

      {summary && (
        <SummarySection>
          <h3>📄 Summary</h3>
          <p>{summary.summary}</p>

          {summary.keyPoints && summary.keyPoints.length > 0 && (
            <>
              <h4>🔑 Key Points</h4>
              <ul>
                {summary.keyPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </>
          )}

          {summary.suggestedActions && summary.suggestedActions.length > 0 && (
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
