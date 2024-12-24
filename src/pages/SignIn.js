import React, { useState } from "react"
import firebase from "../FirebaseConfig";

export default function SignIn() {
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    otp: '',
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //otp verification
  const [verificationId, setVerificationId] = useState("");
  const [message, setMessage] = useState("");


  const toggleLoginMethod = () => {
    setShowLogin((prev) => !prev);
    setFormData({
      email: "", phone: "", otp: ""
    })
    setError("");
    setSuccess("");
  }

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  //otp
  const sendOTPFunction = () => {

    const formattedPhone = formData.phone.startsWith('+') ? formData.phone: `+91${formData.phone}`;

    const recaptchaVerification = new firebase.auth.RecaptchaVerifier('recaptcha-container',{
      size:"invisible"
    });

    firebase
    .auth()
    .signInWithPhoneNumber(formattedPhone, recaptchaVerification)
    .then((confirmationResult)=> {
      setVerificationId(confirmationResult.verificationId);
      setMessage("OTP sent Successfully!");
    })
    .catch((err)=>{
      console.error("Error sending Phone OTP: ", err);
      setMessage(err.message);
    });
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log("Login Details", formData);
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, formData.otp);
      firebase
      .auth()
      .signInWithCredential(credential)
      .then(()=>{
        setMessage("Phone Number verified. Login Successfull!!");
      })
      .catch((err)=>{
        console.error("Error verifying Phone OTP: ", err);
        setMessage(err.message);
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Error during Login');
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {showLogin ? "Login With Email" : "Login with Phone Number"}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onFormSubmit} action="#" method="POST" className="space-y-6">
            {showLogin ? (
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChnage}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="text" className="block text-sm/6 font-medium text-gray-900">
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="number"
                    required
                    autoComplete="number"
                    value={formData.phone}
                    onChange={handleChnage}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            )}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="text" className="block text-sm/6 font-medium text-gray-900">
                    Enter OTP
                  </label>
                </div>
                <div className="text-right my-0 py-0">
                  <button onClick={sendOTPFunction} className="p-1 text-white bg-blue-500 rounded">Send OTP</button>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="otp"
                  name="otp"
                  type="number"
                  required
                  autoComplete="current-otp"
                  value={formData.otp}
                  onChange={handleChnage}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Login in
              </button>
            </div>
          </form>
          {message && <p className="mt-4 text-center text-sm text-red-900">{message}</p>}
          {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
          {success && <p className="mt-4 text-center text-sm text-green-600">{success}</p>}

          <div id="recaptcha-container"></div>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            {showLogin ? (
              <>
                login with Phone?{' '}
                <button onClick={toggleLoginMethod} type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  try now
                </button>
              </>
            ) : (
              <>
                login with Email?{' '}
                <button onClick={toggleLoginMethod} type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  try now
                </button>
              </>
            )}
          </p>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Dont have account?{' '}
            <a href="/signUp" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Create new account
            </a>
          </p>
        </div>
      </div>
    </>
  )
}








