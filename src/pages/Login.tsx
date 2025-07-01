import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #4f46e5, #7c3aed);
`;

const Card = styled.div`
  width: 100%;
  max-width: 28rem;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1),
              0 0 0 1px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e9f0;
  backdrop-filter: blur(10px);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', {
        email,
        password,
      });

      // Save token if provided
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      alert('Login successful!');
      navigate('/'); // Redirect to homepage or dashboard
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed. Check your credentials.');
    }
  };

  return (
    <Container>
      <Card>
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-extrabold text-indigo-700">Welcome Back</h1>
          <p className="text-base text-gray-600">Please enter your credentials</p>
          <p className="text-sm text-gray-500">
            New here?{' '}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-purple-600 transition-colors duration-200"
            >
              Create Account →
            </Link>
          </p>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg
                       transform transition-all duration-200 hover:opacity-90 hover:scale-[1.01] focus:ring-4 ring-purple-200"
            type="submit"
          >
            Sign In
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
