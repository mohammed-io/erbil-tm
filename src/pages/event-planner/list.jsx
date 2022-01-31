import { Link } from "react-router-dom";
import { Container } from "../../components/container";
import { Loading } from "../../components/loading";
import { useFirebaseCollection } from "../../firebase/hooks";

export function List() {
  const [templates, loading, error] = useFirebaseCollection("public/event_planner/templates");

  if (loading) return <Loading />

  console.log(templates)

  return (
    <Container className="mx-auto">
      <div className="py-8">
        <main>
          <div>
            <h2 className="font-bold text-lg">
              Templates:
            </h2>
            {templates.empty && (<p>No templates yet!.</p>)}
            <ul>
              {templates.docs.map(template => (
                <li key={template.id}>
                  <Link to={`/event-planner/${template.id}`}>{template.data().title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </Container>
  )
}