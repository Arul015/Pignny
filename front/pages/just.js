import PostForm from '../pages/api/postform';
import PostList from '../pages/api/postlist';
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {
  const handleNewPost = (post) => {
    // This can be used to update the posts in state when a new post is added
    console.log('New post submitted:', post);
  };

  return (
    <div className="container-fluid " >
      <h1 class="justify-content-center">Welcome to the Post App</h1>
      <PostForm onPostSubmit={handleNewPost} />
      <PostList />
    </div>
  );
}