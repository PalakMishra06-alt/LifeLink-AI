import styles from "./EmergencyDashboard.module.css";

export default function EmergencyDashboard({
  onBack,
  onSOS,
  onTracking,
  onBloodDonor,
  onHistory,
  onAmbulance,
  onSeverity,
}) {
  return (
    <main className={styles.page}>

      {/* ================= HEADER ================= */}

      <header className={styles.header}>

        <button
          className={styles.backBtn}
          onClick={onBack}
          type="button"
        >
          ←
        </button>

        <div>
          <h1>Emergency Dashboard</h1>
          <p>
            Everything you need during an emergency
          </p>
        </div>

      </header>


      {/* ================= ACTIVE EMERGENCY ================= */}

      <section className={styles.emergencyCard}>

        <div className={styles.statusRow}>

          <div className={styles.statusDot}></div>

          <div>

            <span className={styles.statusLabel}>
              EMERGENCY ACTIVE
            </span>

            <h2>
              Help is on the way
            </h2>

          </div>

        </div>

        <p className={styles.statusText}>
          Your emergency request has been activated.
          Stay calm and keep your phone accessible.
        </p>

        <button
          className={styles.sosBtn}
          onClick={onSOS}
          type="button"
        >
          🚨 View Emergency
        </button>

      </section>


      {/* ================= LOCATION ================= */}

      <section className={styles.locationCard}>

        <div className={styles.locationIcon}>
          📍
        </div>

        <div className={styles.locationInfo}>

          <span>
            YOUR CURRENT LOCATION
          </span>

          <h3>
            Location sharing active
          </h3>

          <p>
            Emergency responders can track your location.
          </p>

        </div>

        <button
          className={styles.trackBtn}
          onClick={onTracking}
          type="button"
        >
          Track
        </button>

      </section>


      {/* ================= AI SEVERITY ================= */}

      <section className={styles.aiSeverityCard}>

        <div className={styles.aiSeverityTop}>

          <div className={styles.aiSeverityIcon}>
            🤖
          </div>

          <div>

            <span className={styles.aiLabel}>
              AI EMERGENCY ANALYSIS
            </span>

            <h2>
              Analyze Emergency
            </h2>

          </div>

          <span className={styles.highBadge}>
            AI
          </span>

        </div>


        <p className={styles.aiSeverityText}>
          Let LifeLink AI analyze the emergency situation
          and estimate its severity.
        </p>


        <button
          className={styles.sosBtn}
          onClick={onSeverity}
          type="button"
        >
          ✨ Analyze Emergency
        </button>

      </section>


      {/* ================= QUICK ACTIONS ================= */}

      <section className={styles.section}>

        <div className={styles.sectionTitle}>

          <h2>
            Quick Actions
          </h2>

          <p>
            Get help quickly
          </p>

        </div>


        <div className={styles.actionGrid}>

          {/* BLOOD DONOR */}

          <button
            className={styles.actionCard}
            onClick={onBloodDonor}
            type="button"
          >

            <div className={styles.actionIcon}>
              🩸
            </div>

            <h3>
              Blood Donor
            </h3>

            <p>
              Find nearby donors
            </p>

          </button>


          {/* LIVE TRACKING */}

          <button
            className={styles.actionCard}
            onClick={onTracking}
            type="button"
          >

            <div className={styles.actionIcon}>
              📍
            </div>

            <h3>
              Live Tracking
            </h3>

            <p>
              View your location
            </p>

          </button>


          {/* AI SEVERITY */}

          <button
            className={styles.actionCard}
            onClick={onSeverity}
            type="button"
          >

            <div className={styles.actionIcon}>
              🤖
            </div>

            <h3>
              AI Severity
            </h3>

            <p>
              Analyze emergency severity
            </p>

          </button>


          {/* AMBULANCE */}

          <button
            className={styles.actionCard}
            onClick={onAmbulance}
            type="button"
          >

            <div className={styles.actionIcon}>
              🚑
            </div>

            <h3>
              Nearby Ambulance
            </h3>

            <p>
              Find emergency medical help
            </p>

          </button>


          {/* EMERGENCY CALL */}

          <a
            className={styles.actionCard}
            href="tel:112"
          >

            <div className={styles.actionIcon}>
              📞
            </div>

            <h3>
              Emergency Call
            </h3>

            <p>
              Call emergency services
            </p>

          </a>


          {/* HISTORY */}

          <button
            className={styles.actionCard}
            onClick={onHistory}
            type="button"
          >

            <div className={styles.actionIcon}>
              📋
            </div>

            <h3>
              History
            </h3>

            <p>
              View past emergencies
            </p>

          </button>

        </div>

      </section>


      {/* ================= AMBULANCE ALERT ================= */}

      <section className={styles.ambulanceAlert}>

        <div className={styles.ambulanceAlertIcon}>
          🚑
        </div>

        <div className={styles.ambulanceAlertInfo}>

          <span>
            LIVE ALERT
          </span>

          <h3>
            Ambulance nearby
          </h3>

          <p>
            Emergency ambulance detected approximately
            1.4 km away.
          </p>

        </div>

        <button
          onClick={onAmbulance}
          type="button"
          className={styles.viewBtn}
        >
          View
        </button>

      </section>


      {/* ================= RECENT EMERGENCY ================= */}

      <section className={styles.recentCard}>

        <div>

          <span>
            RECENT EMERGENCY
          </span>

          <h3>
            Emergency request activated
          </h3>

          <p>
            Your emergency information has been recorded.
          </p>

        </div>

        <button
          onClick={onHistory}
          type="button"
        >
          View History →
        </button>

      </section>


      {/* ================= CANCEL ================= */}

      <button
        className={styles.cancelBtn}
        type="button"
      >
        Cancel Emergency
      </button>

    </main>
  );
}