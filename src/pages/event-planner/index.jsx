import { Container } from "../../components/container";
import { NavbarLayout } from "../../layouts/navbar-layout";
import { BrowserRouter as Router, Link, Route, Routes, useRoutes } from "react-router-dom";
import { List } from "./list";
import { Show } from "./show";

export function Index() {

  return (
    <NavbarLayout>
      <Routes>
        <Route path="" element={<List />} />
        <Route path="/:id" element={<Show />} />
      </Routes>
    </NavbarLayout>
  )
}
