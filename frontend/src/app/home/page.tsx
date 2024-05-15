import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/signup">signup</Link>
        <Link href="/signin">signin</Link>
      </nav>
      <h1>Welcome to My App</h1>
      <p>This is the homepage of my application.</p>
      <p>Feel free to explore and enjoy!</p>
    </div>
  );
}
