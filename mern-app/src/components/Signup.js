import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Typography, Select } from 'antd';
import { GoogleOutlined, FacebookFilled, TwitterOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { SignUp } from '../action/login';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function Signup() {
  const navigate = useNavigate();
  const { isloading, userData, success } = useSelector((state) => state.signup);
  useEffect(() => {
    if (success) {
      navigate('/home');
    }
  }, [success, navigate]);

  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async () => {
    // Create formData object
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('password', password);
    formData.append('passwordConfirmation', passwordConfirmation);
    formData.append('profileImage', profileImage); 

    // Handle signup submission here
    console.log('Form data:', formData);
    await dispatch(SignUp(formData));
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Signup form */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-opacity-20 bg-white bg-blur-md p-8 rounded-md shadow-md w-full max-w-xl">
        <Form encType="multipart/form-data" method="post" layout="vertical">
          <Form.Item label="Full Name" className='mb-4'>
            <Input name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Enter your full name' />
          </Form.Item>
          <Form.Item label="Username" className='mb-4'>
            <Input name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter your username' />
          </Form.Item>
          <Form.Item label="Email" className='mb-4'>
            <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
          </Form.Item>
          <Form.Item label="Gender" className='mb-4'>
            <Select placeholder="Select gender" onChange={handleGenderChange}>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Password" className='mb-4'>
            <Input.Password name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
          </Form.Item>
          <Form.Item label="Confirm Password" className='mb-4'>
            <Input.Password name="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder='Confirm your password' />
          </Form.Item>
          <Form.Item label="Profile Image" className='mb-4'>
            <input type="file" name="profileImage" onChange={(e)=>setProfileImage(e.target.files[0])} />
          </Form.Item>
          <Typography.Text className="text-center mb-4 block">Already have an account? <a href="/" className="text-blue-500">Login</a></Typography.Text>
          <Button type='primary' onClick={handleSubmit} block>Sign Up</Button>

          <Divider className="my-6">or sign up with</Divider>

          <div className="flex justify-center gap-20 text-34 cursor-pointer">
            <GoogleOutlined style={{ color: 'red' }} />
            <FacebookFilled style={{ color: "blue" }} />
            <TwitterOutlined style={{ color: 'cyan' }} />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
