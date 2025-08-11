// components/GoogleLoginButton.jsx
const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5001/api/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-red-500 text-white py-2 rounded-lg mt-4 hover:bg-red-600 transition"
    >
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
