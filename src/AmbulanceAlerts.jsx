import { useState } from "react";
import styles from "./AmbulanceAlerts.module.css";

export default function AmbulanceAlerts({ onBack }) {
  const [alertEnabled, setAlertEnabled] = useState(true);

  const ambulances = [
    {
      id: 1,
      name: "LifeLink Ambulance",
      distance: "1.4 km",
      eta: "5 min",
      phone: "112",
      status: "Nearby",
    },
    {
      id: 2,
      name: "Emergency Ambulance",
      distance: "2.8 km",
      eta: "9 min",
      phone: "112",
      status: "On Route",
    },
  ];

  return (
    <main className={styles.page}>

      {/* HEADER */}
      <header className={styles.header}>

        <button
          className={styles.backBtn}
          onClick={onBack}
          type="button"
        >
          ←
        </button>

        <div>
          <h1>Nearby Ambulances</h1>
          <p>Find emergency medical help near you</p>
        </div>

      </header>


      {/* ALERT STATUS */}
      <section className={styles.alertCard}>

        <div className={styles.alertIcon}>
          🚑
        </div>

        <div className={styles.alertContent}>

          <span className={styles.liveBadge}>
            ● LIVE ALERT
          </span>

          <h2>
            Ambulance detected nearby
          </h2>

          <p>
            We found emergency medical assistance
            near your current location.
          </p>

        </div>

      </section>


      {/* LOCATION */}
      <section className={styles.locationCard}>

        <div className={styles.locationIcon}>
          📍
        </div>

        <div>
          <span>Your Location</span>
          <h3>Location sharing active</h3>
        </div>

      </section>


      {/* AMBULANCES */}
      <section className={styles.section}>

        <div className={styles.sectionHeading}>
          <h2>Nearby Ambulances</h2>
          <p>Available emergency assistance</p>
        </div>


        <div className={styles.ambulanceList}>

          {ambulances.map((ambulance) => (

            <article
              className={styles.ambulanceCard}
              key={ambulance.id}
            >

              <div className={styles.ambulanceIcon}>
                🚑
              </div>


              <div className={styles.ambulanceInfo}>

                <div className={styles.nameRow}>

                  <h3>
                    {ambulance.name}
                  </h3>

                  <span className={styles.status}>
                    {ambulance.status}
                  </span>

                </div>

                <div className={styles.details}>

                  <span>
                    📍 {ambulance.distance}
                  </span>

                  <span>
                    ⏱️ {ambulance.eta}
                  </span>

                </div>


                <div className={styles.buttons}>

                  <button
                    className={styles.trackBtn}
                    type="button"
                  >
                    📍 Track
                  </button>

                  <a
                    className={styles.callBtn}
                    href={`tel:${ambulance.phone}`}
                  >
                    📞 Call
                  </a>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* ALERT SETTINGS */}
      <section className={styles.settingsCard}>

        <div>

          <h3>
            🔔 Ambulance Alerts
          </h3>

          <p>
            Get notified when an ambulance is detected nearby.
          </p>

        </div>

        <button
          className={`${styles.toggle} ${
            alertEnabled ? styles.toggleActive : ""
          }`}
          onClick={() => setAlertEnabled(!alertEnabled)}
          type="button"
          aria-label="Toggle ambulance alerts"
        >

          <span></span>

        </button>

      </section>


      {/* EMERGENCY CALL */}
      <a
        href="tel:112"
        className={styles.emergencyBtn}
      >
        🚨 Call Emergency Services
      </a>

    </main>
  );
}