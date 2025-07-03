import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Backend sur port 3000

const words = [
  'Summarize PDFs instantly',
  'AI-powered document tools',
  'Upload your reports',
  'Generate concise overviews',
  'Actionable document summaries',
  'Unlock hidden insights',
  'Smart knowledge extraction',
  'Organize with intelligence',
  'Briefs at your fingertips',
  'The Future of Document Handling',
];

// 💄 Styled Components
const Container = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom right, #f3f4f6, #dce3dc);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Circle = styled.div`
  position: absolute;
  border-radius: 9999px;
  background-color: #d0dad4;
  opacity: ${(props: { opacity: number; size: number }) => props.opacity};
  width: ${(props: { size: number }) => props.size}px;
  height: ${(props: { size: number }) => props.size}px;
  left: calc(50% - ${(props: { size: number }) => props.size / 2}px);
  top: calc(50% - ${(props: { size: number }) => props.size / 2}px);
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

const Card = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 3rem;
  border-radius: 25px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(18px);
  z-index: 10;
`;

const Title = styled.h1`
  text-align: center;
  color: #2e3d35;
  font-size: 2rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #4e5e55;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid #cad3cb;
  background-color: #edf1ee;
  color: #2e3d35;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;

  &:focus {
    border-color: #8bb89f;
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
  margin-bottom: 1rem;

  &:hover {
    opacity: 0.95;
  }
`;

const Footer = styled.p`
  text-align: center;
  color: #4e5e55;
  font-size: 0.875rem;
`;

const CyclingWord = styled.div`
  position: absolute;
  top: 10%;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2e3d35;
  z-index: 5;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      console.log('Login response:', res.data);

      if (res.data.message === 'Login successful') {
        // Sauvegarder les données en local (token + user)
        localStorage.setItem('user', JSON.stringify(res.data.user));
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }

        // Redirection vers la page d'upload
        console.log('Redirecting to /upload...');
        navigate('/upload');
      } else {
        alert('Login failed: unexpected response.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed.');
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
        <Title>Welcome to LeafDocs 📄</Title>
        <Subtitle>Log in to manage and summarize your PDFs</Subtitle>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Sign In</Button>
        </form>
        <Footer>
          Don’t have an account? <Link to="/signup">Create one →</Link>
        </Footer>
      </Card>
    </Container>
  );
}
