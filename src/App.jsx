import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import MostriInGita from "./pages/MostriInGita";
import ProgrammaOrario from "./pages/ProgrammaOrario";
import Trasporti from "./pages/Trasporti";
import GuidaColonia from "./pages/GuidaColonia";
import MenuMoselstuebchen from "./pages/MenuMoselstuebchen";

function PageWithNavbar({ children }) {
  return (
    <>
      <Navbar />
      <main className="container">{children}</main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MostriInGita />} />

        <Route
          path="/programma"
          element={
            <PageWithNavbar>
              <ProgrammaOrario />
            </PageWithNavbar>
          }
        />

        <Route
          path="/trasporti"
          element={
            <PageWithNavbar>
              <Trasporti />
            </PageWithNavbar>
          }
        />
        <Route
          path="/menu-moselstuebchen"
          element={
            <PageWithNavbar>
              <MenuMoselstuebchen />
            </PageWithNavbar>
          }
        />
        <Route
          path="/guida"
          element={
            <PageWithNavbar>
              <GuidaColonia />
            </PageWithNavbar>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
