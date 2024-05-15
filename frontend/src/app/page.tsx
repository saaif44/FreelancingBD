import Link from 'next/link';

const linkStyle = {
  marginRight: 15,
  color: 'white',
  textDecoration: 'none',
};

const navStyle = {
  backgroundColor: '#333',
  padding: '10px',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
};

export default function Home() {
  return (
    <div>
      <nav style={navStyle}>
        <Link href="/" style={linkStyle}>Home</Link>
        <Link href="/signup" style={linkStyle}>Signup</Link>
        <Link href="/signin" style={linkStyle}>Signin</Link>
      </nav>
      <h1>Welcome to My App</h1>
      <p>This is the homepage of my application.</p>
      <p>Feel free to explore and enjoy!</p>
    </div>
  );
}
