import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { GoogleOutlined, FacebookFilled, TwitterOutlined } from '@ant-design/icons';
import { login } from '../action/login';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { token, success } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (success) {
      navigate('/home');
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    await dispatch(login(formData)); // Dispatch the login action with form data
  };

  const [color, setColor] = useState('#FFFFFF'); // Initial color is white

  useEffect(() => {
    // Array of colors for disco effect
    const discoColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

    // Interval to update the color every second
    const interval = setInterval(() => {
      // Randomly select a color from discoColors array
      const randomIndex = Math.floor(Math.random() * discoColors.length);
      setColor(discoColors[randomIndex]);
    }, 1000);

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[363px] flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
      <div className="relative z-10 bg-opacity-20 bg-white bg-blur-md p-5 rounded-md shadow-md w-full max-w-md">
        <Form>
          <Typography.Title className="text-white text-center mb-8" style={{ color: color , fontWeight: 'bold'}}>Let's Chat</Typography.Title>
          <Form.Item label="Email " style={{ paddingLeft: '20px' }} className="mb-4">
            <Input name="email" value={formData.email} onChange={handleChange} className="px-4 py-2 border rounded-md w-full bg-opacity-20 bg-white" placeholder="Enter your e-mail" />
          </Form.Item>
          <Form.Item label="Password" className="mb-4">
            <Input.Password name="password" value={formData.password} onChange={handleChange} className="px-4 py-2 border rounded-md w-full bg-opacity-20 bg-white" placeholder="Enter your Password" />
          </Form.Item>
          <Typography.Text className="text-white text-center mb-4 block">Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a></Typography.Text>
          <Button onClick={handleSubmit} block className="bg-gray-500 text-white border-none hover:bg-gray-600">Login</Button>
          <Divider className="text-white my-6">or login with</Divider>
          <div className="flex justify-center gap-20 text-white text-34 cursor-pointer">
            <GoogleOutlined style={{ color: 'red', fontSize: '20px' }} />
            <FacebookFilled style={{ color: 'blue', fontSize: '20px' }} />
            <TwitterOutlined style={{ color: 'cyan', fontSize: '20px' }} />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
