import Link from 'next/link';

const navStyle = {
  backgroundColor: '#333',
  padding: '10px',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
};

const sectionStyle = {
  marginBottom: '40px',
};

const headingStyle = {
  textAlign: 'center',
  fontSize: '3rem',
  marginBottom: '30px',
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '20px',
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

const Home = () => {
  return (
    <div>
      <nav style={navStyle}>
        <Link href="/" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link href="/signin" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>Login</Link>
        <Link href="/signup" style={{ color: 'white', textDecoration: 'none' }}>Signup</Link>
      </nav>
      <div style={containerStyle}>
        <h1 style={headingStyle}>Looking for a Freelancer and Client? <br />Here You can be BOTH</h1>

        <section style={sectionStyle}>
          <h2>Joined Freelancers</h2>
          <div style={cardStyle}>
            <p>Display the number of freelancers who have joined your platform.</p>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2>Joined Clients</h2>
          <div style={cardStyle}>
            <p>Display the number of clients who have joined your platform.</p>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2>Most Rated Freelancer</h2>
          <div style={cardStyle}>
            <p>Display the profile of the most highly rated freelancer on your platform.</p>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2>Most Rated Client</h2>
          <div style={cardStyle}>
            <p>Display the profile of the most highly rated client on your platform.</p>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2>AI Assistant</h2>
          <div style={cardStyle}>
            <p>Integrate a chatbot assistant to help clients find the right freelancer for their needs.</p>
            <button style={buttonStyle}>Chat with Assistant</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
