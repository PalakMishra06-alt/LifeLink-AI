import { useEffect, useState } from "react";

import SplashScreen from "./SplashScreen";
import Home from "./Home";
import SOS from "./SOS";
import Tracking from "./Tracking";
import History from "./History";
import BloodDonor from "./BloodDonor";
import EmergencyDashboard from "./EmergencyDashboard";
import AmbulanceAlerts from "./AmbulanceAlerts";
import HospitalNotifications from "./HospitalNotifications";

import { EmergencyProvider } from "./context/EmergencyContext";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState("home");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <EmergencyProvider>

      {showSplash ? (
        <SplashScreen />
      ) : (

        <>

          {/* ================= HOME ================= */}

          {page === "home" && (
            <Home
              onSOS={() => setPage("sos")}
              onTracking={() => setPage("tracking")}
              onHistory={() => setPage("history")}
              onBloodDonor={() => setPage("blood")}
              onDashboard={() => setPage("dashboard")}
              onAmbulance={() => setPage("ambulance")}
              onHospital={() => setPage("hospital")}
            />
          )}


          {/* ================= SOS ================= */}

          {page === "sos" && (
            <SOS
              onBack={() => setPage("home")}
              onTracking={() => setPage("tracking")}
            />
          )}


          {/* ================= TRACKING ================= */}

          {page === "tracking" && (
            <Tracking
              onBack={() => setPage("home")}
            />
          )}


          {/* ================= HISTORY ================= */}

          {page === "history" && (
            <History
              onBack={() => setPage("home")}
            />
          )}


          {/* ================= BLOOD ================= */}

          {page === "blood" && (
            <BloodDonor
              onBack={() => setPage("home")}
            />
          )}


          {/* ================= DASHBOARD ================= */}

          {page === "dashboard" && (
            <EmergencyDashboard
              onBack={() => setPage("home")}
              onSOS={() => setPage("sos")}
              onTracking={() => setPage("tracking")}
              onBloodDonor={() => setPage("blood")}
              onHistory={() => setPage("history")}
              onAmbulance={() => setPage("ambulance")}
              onHospital={() => setPage("hospital")}
            />
          )}


          {/* ================= AMBULANCE ================= */}

          {page === "ambulance" && (
            <AmbulanceAlerts
              onBack={() => setPage("dashboard")}
            />
          )}


          {/* ================= HOSPITAL ================= */}

          {page === "hospital" && (
            <HospitalNotifications
              onBack={() => setPage("dashboard")}
            />
          )}

        </>

      )}

    </EmergencyProvider>
  );
}