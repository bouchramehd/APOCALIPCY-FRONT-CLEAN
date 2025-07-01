import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  background: rgba(255, 255, 255, 0.98);
  border-radius: 1.5rem;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });

      alert('Registered successfully!');
      console.log(res.data);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert('Registration failed');
    }
  };

  return (
    <Container>
      <Card>
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Create Account
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-medium">
            Join us and start your journey
          </p>
          <p className="text-sm md:text-base text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-purple-600 transition-colors duration-200"
            >
              Login →
            </Link>
          </p>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Username</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
              placeholder="your_username"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
              required
            />
          </div>
          <Button
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg
                       transform transition-all duration-200 hover:opacity-90 hover:scale-[1.01] focus:ring-4 ring-purple-200"
            type="submit"
          >
            Sign Up
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
