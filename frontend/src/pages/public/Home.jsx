import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Welcome to SPA Game Platform
      </h2>

      <p className="mb-4">
        Play simple games, compete with computer, and view rankings.
      </p>

      <div className="space-x-4">
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
        <Link to="/register" className="text-green-600 underline">
          Register
        </Link>
      </div>
    </div>
  );
}

