import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  RefreshCw,
  Plus,
  Minus,
  Share2,
  ShieldCheck,
  Siren,
  LocateFixed,
  CircleAlert,
} from "lucide-react";

import styles from "./Tracking.module.css";
import { useEmergency } from "./context/EmergencyContext";

const DEMO_LOCATION = {
  latitude: 28.6139,
  longitude: 77.209,
  accuracy: 10,
};

export default function Tracking({ onBack }) {
  const {
    emergencyActive,
    locationSharing,
    setLocationSharing,
  } = useEmergency();

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [message, setMessage] = useState("");

  const watchId = useRef(null);

  // =========================
  // LOCATION SUCCESS
  // =========================

  const handleSuccess = (position) => {
    const { latitude, longitude, accuracy } =
      position.coords;

    setLocation({
      latitude,
      longitude,
      accuracy,
    });

    setLastUpdated(new Date());
    setLoading(false);
    setLocationError("");
  };

  // =========================
  // LOCATION ERROR
  // =========================

  const handleError = (error) => {
    setLoading(false);

    if (error.code === 1) {
      setLocationError(
        "Location permission is required."
      );
    } else if (error.code === 2) {
      setLocationError(
        "Unable to determine your location."
      );
    } else if (error.code === 3) {
      setLocationError(
        "Location request timed out."
      );
    } else {
      setLocationError(
        "Unable to access your location."
      );
    }

    // Prototype fallback
    setLocation(DEMO_LOCATION);
    setLastUpdated(new Date());
  };

  // =========================
  // GET LOCATION
  // =========================

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by this browser."
      );

      setLocation(DEMO_LOCATION);
      setLoading(false);
      return;
    }

    setLoading(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );
  };

  // =========================
  // START LIVE TRACKING
  // =========================

  const startTracking = () => {
    if (!navigator.geolocation) return;

    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(
        watchId.current
      );
    }

    watchId.current =
      navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5000,
        }
      );
  };

  // =========================
  // STOP TRACKING
  // =========================

  const stopTracking = () => {
    if (
      navigator.geolocation &&
      watchId.current !== null
    ) {
      navigator.geolocation.clearWatch(
        watchId.current
      );

      watchId.current = null;
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    if (locationSharing) {
      getLocation();
      startTracking();
    } else {
      setLoading(false);
    }

    return () => {
      stopTracking();
    };
  }, []);

  // =========================
  // SOS BECOMES ACTIVE
  // =========================

  useEffect(() => {
    if (emergencyActive) {
      setLocationSharing(true);
      getLocation();
      startTracking();
    }
  }, [emergencyActive]);

  // =========================
  // TOGGLE LOCATION
  // =========================

  const toggleLocation = () => {
    if (locationSharing) {
      stopTracking();
      setLocationSharing(false);

      showMessage(
        "Location sharing paused."
      );
    } else {
      setLocationSharing(true);
      getLocation();
      startTracking();

      showMessage(
        "Location sharing enabled."
      );
    }
  };

  // =========================
  // REFRESH
  // =========================

  const refreshLocation = () => {
    getLocation();
  };

  // =========================
  // SHARE LOCATION
  // =========================

  const shareLocation = async () => {
    if (!location) {
      showMessage(
        "Location is not available yet."
      );
      return;
    }

    const text =
      `LifeLink AI Emergency Location\n` +
      `Latitude: ${location.latitude.toFixed(6)}\n` +
      `Longitude: ${location.longitude.toFixed(6)}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "LifeLink AI Location",
          text,
        });

        showMessage(
          "Location shared successfully."
        );
      } else {
        await navigator.clipboard.writeText(text);

        showMessage(
          "Location copied to clipboard."
        );
      }
    } catch {
      showMessage(
        "Location sharing cancelled."
      );
    }
  };

  // =========================
  // STOP SHARING
  // =========================

  const stopSharing = () => {
    stopTracking();
    setLocationSharing(false);

    showMessage(
      "Location sharing stopped."
    );
  };

  // =========================
  // MESSAGE
  // =========================

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // =========================
  // FORMAT LOCATION
  // =========================

  const latitudeText = location
    ? `${Math.abs(location.latitude).toFixed(4)}° ${
        location.latitude >= 0 ? "N" : "S"
      }`
    : "--";

  const longitudeText = location
    ? `${Math.abs(location.longitude).toFixed(4)}° ${
        location.longitude >= 0 ? "E" : "W"
      }`
    : "--";

  const timeText = lastUpdated
    ? lastUpdated.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--";

  return (
    <main className={styles.page}>

      {/* =========================
          HEADER
      ========================== */}

      <header className={styles.header}>

        <button
          className={styles.backButton}
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1>Live Tracking</h1>

          <p>
            Track your location and emergency status
          </p>
        </div>

      </header>


      {/* =========================
          EMERGENCY ACTIVE BANNER
      ========================== */}

      {emergencyActive && (
        <div className={styles.emergencyBanner}>

          <div className={styles.emergencyIcon}>
            <Siren size={20} />
          </div>

          <div>
            <strong>
              Emergency Tracking Active
            </strong>

            <p>
              Your location is being continuously
              shared during this emergency.
            </p>
          </div>

        </div>
      )}


      <section className={styles.container}>

        {/* =========================
            LOCATION STATUS
        ========================== */}

        <div className={styles.statusCard}>

          <div className={styles.statusIcon}>
            <MapPin size={21} />
          </div>

          <div className={styles.statusContent}>

            <span>
              LOCATION SHARING
            </span>

            <h3>
              {locationSharing
                ? "Location Sharing Active"
                : "Location Sharing Paused"}
            </h3>

            <p>
              {locationSharing
                ? "Your current location is being shared securely."
                : "Your location sharing is currently paused."}
            </p>

          </div>

          <span
            className={`${styles.statusDot} ${
              locationSharing
                ? styles.statusOn
                : styles.statusOff
            }`}
          />

          <button
            className={styles.refreshButton}
            onClick={refreshLocation}
          >
            <RefreshCw
              size={17}
              className={
                loading ? styles.spinning : ""
              }
            />
          </button>

        </div>


        {/* =========================
            MAP
        ========================== */}

        <div className={styles.mapCard}>

          <div className={styles.map}>

            <div className={`${styles.road} ${styles.roadOne}`} />
            <div className={`${styles.road} ${styles.roadTwo}`} />
            <div className={`${styles.road} ${styles.roadThree}`} />
            <div className={`${styles.road} ${styles.roadFour}`} />

            <div
              className={styles.accuracyCircle}
              style={{
                transform: `scale(${zoom})`,
              }}
            />

            <div className={styles.locationMarker}>
              <div className={styles.markerPulse} />
              <div className={styles.markerDot} />
            </div>

            <div className={styles.youAreHere}>
              <MapPin size={13} />
              You are here
            </div>

            {/* Zoom */}

            <div className={styles.mapControls}>

              <button
                onClick={() =>
                  setZoom((value) =>
                    Math.min(value + 0.15, 1.8)
                  )
                }
              >
                <Plus size={17} />
              </button>

              <button
                onClick={() =>
                  setZoom((value) =>
                    Math.max(value - 0.15, 0.7)
                  )
                }
              >
                <Minus size={17} />
              </button>

            </div>

            {/* Re-center */}

            <button
              className={styles.recenterButton}
              onClick={() => setZoom(1)}
            >
              <LocateFixed size={18} />
            </button>

          </div>

        </div>


        {/* =========================
            LOCATION DETAILS
        ========================== */}

        <div className={styles.detailsGrid}>

          <div className={styles.detailCard}>
            <span>Current Location</span>
            <strong>
              New Delhi, India
            </strong>
          </div>

          <div className={styles.detailCard}>
            <span>Coordinates</span>

            <strong>
              {latitudeText}, {longitudeText}
            </strong>
          </div>

          <div className={styles.detailCard}>
            <span>Accuracy</span>

            <strong>
              ±
              {location
                ? Math.round(location.accuracy)
                : "--"}{" "}
              meters
            </strong>
          </div>

          <div className={styles.detailCard}>
            <span>Last Updated</span>
            <strong>{timeText}</strong>
          </div>

        </div>


        {/* =========================
            LOCATION SHARING
        ========================== */}

        <div className={styles.card}>

          <div className={styles.cardHeader}>

            <div className={styles.cardIcon}>
              <ShieldCheck size={20} />
            </div>

            <div className={styles.cardTitle}>
              <h3>Location Sharing</h3>

              <p>
                Manage your location visibility
              </p>
            </div>

            <button
              className={`${styles.toggle} ${
                locationSharing
                  ? styles.toggleActive
                  : ""
              }`}
              onClick={toggleLocation}
            >
              <span />
            </button>

          </div>

          <div className={styles.divider} />

          <p className={styles.sharingText}>
            {locationSharing
              ? "Your location is currently being shared with your emergency contacts."
              : "Your location is not currently being shared."}
          </p>

        </div>


        {/* =========================
            EMERGENCY TRACKING
        ========================== */}

        <div
          className={`${styles.card} ${
            emergencyActive
              ? styles.activeEmergencyCard
              : ""
          }`}
        >

          <div className={styles.cardHeader}>

            <div
              className={`${styles.cardIcon} ${
                emergencyActive
                  ? styles.emergencyCardIcon
                  : ""
              }`}
            >
              {emergencyActive ? (
                <Siren size={20} />
              ) : (
                <ShieldCheck size={20} />
              )}
            </div>

            <div className={styles.cardTitle}>

              <h3>
                Emergency Tracking
              </h3>

              <p>
                {emergencyActive
                  ? "Emergency tracking is currently active."
                  : "No active emergency."}
              </p>

            </div>

          </div>

          <div
            className={`${styles.emergencyStatus} ${
              emergencyActive
                ? styles.emergencyActive
                : styles.emergencyInactive
            }`}
          >

            <span />

            {emergencyActive
              ? "Emergency Tracking Active"
              : "Emergency Tracking Inactive"}

          </div>

        </div>


        {/* =========================
            ACTIONS
        ========================== */}

        <div className={styles.actions}>

          <button
            className={styles.primaryButton}
            onClick={shareLocation}
          >
            <Share2 size={18} />
            Share My Location
          </button>

          <button
            className={styles.secondaryButton}
            onClick={stopSharing}
          >
            Stop Location Sharing
          </button>

        </div>


        {/* =========================
            LOCATION ERROR
        ========================== */}

        {locationError && (

          <div className={styles.errorMessage}>

            <CircleAlert size={18} />

            <span>
              {locationError}
            </span>

            <button onClick={getLocation}>
              Try Again
            </button>

          </div>

        )}

      </section>


      {/* =========================
          TOAST
      ========================== */}

      {message && (
        <div className={styles.toast}>
          {message}
        </div>
      )}

    </main>
  );
}