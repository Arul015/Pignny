/*import styles from "@/styles/Home.module.css";*/
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from "react";

const Home = () => {
  // States for form input and posts
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch posts when the page loads
  useEffect(() => {
    setLoading(true);
    fetchPosts();
  }, []);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/list");
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body || !authCode) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          PinggyAuthHeader: authCode,
        },
        body: JSON.stringify({ title, body }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the post");
      }

      // Reset form fields
      setTitle("");
      setBody("");
      setAuthCode("");

      // Fetch updated posts
      fetchPosts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className='text-center'>Submit and View Posts</h1>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="Title" class="form-label">Title</label>
          <input type="text" class="form-control" id="text" value={title}
            onChange={(e) => setTitle(e.target.value)}
            required/>
        </div>
        <div class="mb-3">
          <label for="value" class="form-label">Value</label>
          <textarea type="text" class="form-control" id="text" value={body}
            onChange={(e) => setBody(e.target.value)}
            required/>
        </div>
        <div class="mb-3">
          <label for="authcode" class="form-label">authCode</label>
          <input type="text" class="form-control" id="text" value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            required/>
        </div>
        <button type="submit" class="btn btn-primary" >
          {loading ? "Submitting..." : "Submit Post"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="posts-list text-center">
          <h2>Existing Posts</h2>
          {posts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;



