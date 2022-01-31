import { collection, doc, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/loading";
import { SectionRow } from "../../components/section-row";
import { firebaseApp } from "../../firebase/app";
import { useFirebaseDocument } from "../../firebase/hooks";

export function Show() {
  const { id } = useParams();
  const [post, loading, error] = useFirebaseDocument('public/posts_planner/posts', id);
  const [edit, setEdit] = useState(true)

  if (loading) return <Loading />

  if (error) return <div>Error: {error}</div>

  if (!edit) {
    return (
      <article>
        <p>{post.data().content}</p>
      </article>
    )
  }

  return (
    <div className="flex w-full bg-blue-200">
      <SectionRow title="Content" description={<div>
        <div>The main content of the post that will be visible on our social media pages.</div>
        <div>This includes the text of the page with the tags, along with the marketing category you think they fit to.</div>
      </div>}>
        <label htmlFor="body">
          Body
        </label>
        <div className="">
          <textarea id="body"
            rows={10}
            name="body" type="text"
            placeholder="New post ..."
            className="form-input rounded-md w-full" />
        </div>
      </SectionRow>
    </div>
  )
}
