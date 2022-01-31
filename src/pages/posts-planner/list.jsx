import { getFirestore, collection } from 'firebase/firestore';
import { firebaseApp } from "../../firebase/app";
import { useCollection } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { useFirebaseCollection } from '../../firebase/hooks';
import { Container } from '../../components/container';

export function List() {
  const [posts, loading, error] = useFirebaseCollection('public/posts_planner/posts')

  const futurePosts = posts && posts.docs

  return (
    <Container className="mx-auto">
      <div className="py-8">
        <main>
          <div>
            <h2 className="font-bold text-lg">
              Future Posts: ABC
            </h2>
            <ul>
              {posts && futurePosts.map(post => (
                <li key={post.id}>
                  <Link to={`/posts-planner/${post.id}`}>{post.data().content}</Link>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </Container>
  )
}