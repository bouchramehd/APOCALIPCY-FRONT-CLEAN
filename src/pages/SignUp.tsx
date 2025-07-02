import { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';

const words = [
  'Start summarizing PDFs',
  'Turn documents into insights',
  'Upload and generate briefs',
  'Fast, accurate summaries',
  'Your knowledge hub',
];

// Styled Components
const Container = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom right, #f3f4f6, #dce3dc);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
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

const SignUp = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });
      alert('Registered successfully!');
      navigate('/login');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Registration failed.');
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
        <Title>Create Account 📄</Title>
        <Subtitle>Join LeafDocs and simplify your document workflow</Subtitle>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <Button type="submit">Sign Up</Button>
        </form>
        <Footer>
          Already have an account? <Link to="/login">Log in →</Link>
        </Footer>
      </Card>
    </Container>
  );
};

export default SignUp;
