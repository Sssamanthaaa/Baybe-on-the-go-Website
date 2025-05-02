import React, { useState } from 'react';
import {
  BabyIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  CheckIcon,
  AlertCircleIcon,
} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth } from '../firebase'; 

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    childAge: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const requirements = [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /[0-9]/, text: 'At least one number' },
      { regex: /[a-z]/, text: 'At least one lowercase letter' },
      { regex: /[A-Z]/, text: 'At least one uppercase letter' },
      { regex: /[^A-Za-z0-9]/, text: 'At least one special character' },
    ];
    return requirements.map((req) => ({ ...req, valid: req.regex.test(password) }));
  };

  const passwordRequirements = validatePassword(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.acceptTerms)
      newErrors.acceptTerms = 'You must accept the terms and conditions';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        //setting username in profile
        await updateProfile(userCredential.user, {
            displayName: formData.fullName,
        });
        console.log('Trying login with:', formData.email, formData.password);
        alert('Account created successfully!');
        navigate('/login');
      } catch (error) {
        alert('Sign up failed: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center space-x-2">
          <BabyIcon className="h-12 w-12 text-blue-500" />
          <h1 className="text-2xl font-bold text-slate-800">Baybe On The Go</h1>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-800">Create your account</h2>
        <p className="mt-2 text-center text-sm text-slate-500">Start planning your perfect family vacation</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-slate-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/*name*/}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Full name</label>
              <input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`block w-full px-3 py-2 border ${errors.fullName ? 'border-red-300' : 'border-slate-200'} rounded-lg focus:ring-2 focus:ring-blue-500`}
              />
              {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
            </div>

            {/*email*/}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-slate-200'} rounded-lg focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            {/*pass*/}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-slate-200'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-500"
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center text-sm">
                    {req.valid ? <CheckIcon className="h-4 w-4 text-green-500 mr-2" /> : <AlertCircleIcon className="h-4 w-4 text-slate-300 mr-2" />}
                    <span className={req.valid ? 'text-green-700' : 'text-slate-500'}>{req.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/*pass pt2*/}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-slate-200'} rounded-lg focus:ring-2 focus:ring-blue-500`}
              />
              {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
            </div>

            {/*age*/}
            <div>
              <label htmlFor="childAge" className="block text-sm font-medium text-slate-700">Child's age (Optional)</label>
              <select
                id="childAge"
                value={formData.childAge}
                onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select age</option>
                <option value="newborn">Newborn (0–3 months)</option>
                <option value="infant">Infant (3–12 months)</option>
                <option value="toddler">Toddler (1–3 years)</option>
                <option value="preschool">Preschool (3–5 years)</option>
              </select>
            </div>

            {/*terms*/}
            <div className="flex items-center">
              <input
                id="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-slate-200 rounded"
              />
              <label htmlFor="acceptTerms" className="ml-2 block text-sm text-slate-700">
                I agree to the <a href="#" className="text-blue-500 hover:text-blue-600">Terms and Conditions</a>
              </label>
            </div>
            {errors.acceptTerms && <p className="text-sm text-red-600 mt-1">{errors.acceptTerms}</p>}

            {/*submit*/}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? <Loader2Icon className="h-5 w-5 animate-spin" /> : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500">Already have an account?</span>
            <a href="/login" className="ml-1 font-medium text-blue-500 hover:text-blue-600">Sign in instead</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
