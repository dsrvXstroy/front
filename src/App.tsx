import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ScrollToTop from "./components/common/ScrollTop";
import NFTRegistrationPage from "./pages/NFTRegistration";

const Home = lazy(() => import("./pages/Home"));
const ScentMarket = lazy(() => import("./pages/ScentMarket"));
const ScentDetail = lazy(() => import("./pages/ScentDetail"));
const ScentStudio = lazy(() => import("./pages/ScentStudio"));
const ScentImageStudio = lazy(() => import("./pages/ScentImageStudio"));
const ScentPublish = lazy(() => import("./pages/ScentPublish"));
const GalleryZone = lazy(() => import("./pages/GalleryZone"));
const AllScents = lazy(() => import("./pages/AllScents"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MyStudio = lazy(() => import("./pages/MyStudio"));
const ScentContest = lazy(() => import("./pages/ScentStadium"));
const ScentUpload = lazy(() => import("./pages/ScentUpload"));

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0;
  position: relative;
`;

const App: React.FC = () => {
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    timeoutId = setTimeout(() => {
      setShowLoading(true);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      setShowLoading(false);
    };
  }, [location]);

  return (
    <AppContainer>
      <ScrollToTop />
      <Header />
      <MainContent>
        <Suspense fallback={showLoading ? <LoadingSpinner /> : <NotFound />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scentmarket" element={<ScentMarket />} />
            <Route path="/scentstudio" element={<ScentStudio />} />
            <Route path="/scentimagestudio" element={<ScentImageStudio />} />
            <Route path="/scentpublish" element={<ScentPublish />} />
            <Route path="/marketplace/:id" element={<ScentDetail />} />
            <Route path="/galleryzone" element={<GalleryZone />} />
            <Route path="/scents/all" element={<AllScents />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/mystudio" element={<MyStudio />} />
            <Route path="/scentcontest" element={<ScentContest />} />
            <Route path="/scentupload" element={<ScentUpload />} />
            <Route path="/nft/register" element={<NFTRegistrationPage />} />
          </Routes>
        </Suspense>
      </MainContent>
      <Footer />
    </AppContainer>
  );
};

export default App;
