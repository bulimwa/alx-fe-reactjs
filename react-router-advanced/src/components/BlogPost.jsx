import { useParams } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  return <h2>Viewing Blog Post #{id}</h2>;
}

export default BlogPost;
