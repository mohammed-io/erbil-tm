import { Navbar } from "../components/navbar";
import { AppLayout } from "./app-layout";

export function NavbarLayout({ children }) {
  return (
    <AppLayout>
      <Navbar></Navbar>
      {children}
    </AppLayout>
  )
}