import { useParams } from 'react-router-dom';

function BlogPost() {
  const { postId } = useParams();
  return <h2>Viewing Blog Post #{postId}</h2>;
}

export default BlogPost;
