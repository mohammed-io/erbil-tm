import { Container } from "../components/container";
import { AppLayout } from "../layouts/app-layout";
import { NavbarLayout } from "../layouts/navbar-layout";

export function Index() {
  return (
    <NavbarLayout>
      <main>
        <div className="bg-gray-200 h-[32rem]">
          <Container className="mx-auto py-8">
            <h1 className="text-xl font-bold">Hello Toastmasters!</h1>
          </Container>
        </div>
      </main>
    </NavbarLayout>
  )
}