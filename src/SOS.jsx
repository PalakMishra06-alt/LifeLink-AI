import { useEffect, useState } from "react";
import styles from "./SOS.module.css";

import { useEmergency } from "./context/EmergencyContext";

export default function SOS({
  onBack,
  onTracking,
}) {
  const [state, setState] = useState("initial");

  const {
    setEmergencyActive,
    setLocationSharing,
    addHistory,
    updateHistory,
  } = useEmergency();

  const [currentEmergencyId, setCurrentEmergencyId] =
    useState(null);

  // =====================================
  // ACTIVATE SOS
  // =====================================

  const handleActivate = () => {
    setState("activating");
  };

  // =====================================
  // ACTIVATING → ACTIVE
  // =====================================

  useEffect(() => {
    if (state !== "activating") return;

    const timer = setTimeout(() => {
      setState("active");

      // Emergency ON
      setEmergencyActive(true);

      // Location sharing ON
      setLocationSharing(true);

      // Save emergency history
      const id = Date.now();

      setCurrentEmergencyId(id);

      addHistory({
        id,
        status: "active",
        location: "New Delhi, India",
        locationShared: true,
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [
    state,
    setEmergencyActive,
    setLocationSharing,
    addHistory,
  ]);

  // =====================================
  // CANCEL SOS
  // =====================================

  const handleCancel = () => {
    setState("initial");

    setEmergencyActive(false);

    setLocationSharing(false);

    if (currentEmergencyId) {
      updateHistory(currentEmergencyId, {
        status: "cancelled",
      });
    }

    setCurrentEmergencyId(null);
  };

  return (
    <main className={styles.screen}>

      {/* =================================
          HEADER
      ================================= */}

      <header className={styles.header}>

        {state === "initial" && (
          <button
            className={styles.backBtn}
            onClick={onBack}
            aria-label="Go back"
          >
            ←
          </button>
        )}

        <h1 className={styles.headerTitle}>
          {state === "initial"
            ? "Emergency SOS"
            : "LifeLink AI"}
        </h1>

        {state !== "initial" && (
          <span className={styles.headerIcon}>
            🛡️
          </span>
        )}

      </header>


      {/* =================================
          INITIAL
      ================================= */}

      {state === "initial" && (

        <section className={styles.content}>

          <p className={styles.subtitle}>
            Get immediate help when you need it
          </p>

          <div className={styles.warningIcon}>
            ⚠️
          </div>

          <h2 className={styles.question}>
            Need Emergency Help?
          </h2>

          <p className={styles.description}>
            Press the SOS button to alert your
            emergency contacts and share your
            current location.
          </p>

          <button
            className={styles.sosButton}
            onClick={handleActivate}
          >
            <span className={styles.sosLabel}>
              SOS
            </span>

            <span className={styles.sosSubLabel}>
              PRESS TO ACTIVATE
            </span>
          </button>

          <ul className={styles.infoList}>

            <li className={styles.infoItem}>
              <span className={styles.infoIcon}>
                📍
              </span>

              Your location will be shared
            </li>

            <li className={styles.infoItem}>
              <span className={styles.infoIcon}>
                👥
              </span>

              Your saved contacts will be alerted
            </li>

            <li className={styles.infoItem}>
              <span className={styles.infoIcon}>
                📞
              </span>

              Quick access to emergency services
            </li>

          </ul>

        </section>
      )}


      {/* =================================
          ACTIVATING
      ================================= */}

      {state === "activating" && (

        <section className={styles.content}>

          <h2 className={styles.initiatingTitle}>
            Initiating SOS
          </h2>

          <p className={styles.description}>
            Alerting emergency services and
            designated contacts.
          </p>

          <div className={styles.pulseWrapper}>

            <div
              className={styles.pulseRingOuter}
            />

            <div
              className={styles.pulseRingInner}
            >
              <span>!</span>
            </div>

          </div>

          <div className={styles.statusBar}>

            <span className={styles.statusDot} />

            EMERGENCY ALERT ACTIVATING...

          </div>

          <button
            className={styles.cancelOutlineBtn}
            onClick={handleCancel}
          >
            ✕ Cancel SOS Alert
          </button>

        </section>
      )}


      {/* =================================
          ACTIVE
      ================================= */}

      {state === "active" && (

        <section className={styles.content}>

          <div className={styles.activeIconWrapper}>
            <span>✳️</span>
          </div>

          <h2 className={styles.activeTitle}>
            Emergency Alert Active
          </h2>

          <p className={styles.description}>
            Your emergency contacts have been
            alerted and your location is being
            shared. Stay calm, help is on the way.
          </p>


          {/* CHECKLIST */}

          <ul className={styles.checklist}>

            <li>
              <span className={styles.checkDot}>
                ✔
              </span>

              Emergency Alert Sent
            </li>

            <li>
              <span className={styles.checkDot}>
                ✔
              </span>

              Location Sharing Active
            </li>

            <li>
              <span className={styles.checkDot}>
                ✔
              </span>

              Contacts Notified
            </li>

          </ul>


          {/* TRACKING */}

          <button
            className={styles.callBtn}
            onClick={onTracking}
          >
            📍 View Live Tracking
          </button>


          {/* EMERGENCY CALL */}

          <button
            className={styles.callBtn}
            onClick={() => {
              window.location.href =
                "tel:112";
            }}
          >
            📞 Call Emergency Services
          </button>


          {/* CANCEL */}

          <button
            className={styles.cancelBtn}
            onClick={handleCancel}
          >
            Cancel Emergency
          </button>

        </section>
      )}

    </main>
  );
}