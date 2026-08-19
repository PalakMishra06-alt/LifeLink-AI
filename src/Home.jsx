import styles from "./Home.module.css";

export default function Home({
  onSOS,
  onTracking,
  onHistory,
  onBloodDonor,
  onDashboard,
  onAmbulance,
  onHospital,
  onProfile,
}) {
  return (
    <main className={styles.page}>

      {/* ================= HEADER ================= */}

      <header className={styles.header}>

        <div className={styles.brand}>

          <div className={styles.logo}>
            ♥
          </div>

          <div>
            <h2>LifeLink AI</h2>
            <p>Your Safety Companion</p>
          </div>

        </div>

        {/* PROFILE BUTTON */}

        <button
          className={styles.profileBtn}
          onClick={onProfile}
          type="button"
        >
          👤
        </button>

      </header>


      {/* ================= CONTENT ================= */}

      <div className={styles.container}>

        {/* ================= WELCOME ================= */}

        <section className={styles.welcome}>

          <p className={styles.label}>
            WELCOME BACK
          </p>

          <h1>
            Stay Safe.
            <br />
            <span>Stay Connected.</span>
          </h1>

          <p className={styles.description}>
            Your AI-powered emergency companion is
            always ready when you need it.
          </p>

        </section>


        {/* ================= SOS CARD ================= */}

        <section className={styles.sosCard}>

          <div className={styles.sosIcon}>
            SOS
          </div>

          <div className={styles.sosInfo}>

            <h2>
              Emergency SOS
            </h2>

            <p>
              Quickly alert your emergency contacts
              and share your live location.
            </p>

          </div>

          <button
            className={styles.sosButton}
            onClick={onSOS}
            type="button"
          >
            🚨 Activate SOS
          </button>

        </section>


        {/* ================= QUICK ACTIONS ================= */}

        <section className={styles.quickSection}>

          <div className={styles.sectionHeading}>

            <h2>
              Quick Actions
            </h2>

            <p>
              Everything you need, one tap away.
            </p>

          </div>


          <div className={styles.grid}>

            {/* LIVE LOCATION */}

            <button
              className={styles.card}
              onClick={onTracking}
              type="button"
            >

              <div className={`${styles.cardIcon} ${styles.location}`}>
                📍
              </div>

              <div className={styles.cardText}>

                <h3>
                  Live Location
                </h3>

                <p>
                  Share your location
                </p>

              </div>

              <span className={styles.arrow}>
                →
              </span>

            </button>


            {/* EMERGENCY DASHBOARD */}

            <button
              className={styles.card}
              onClick={onDashboard}
              type="button"
            >

              <div className={`${styles.cardIcon} ${styles.contacts}`}>
                🚨
              </div>

              <div className={styles.cardText}>

                <h3>
                  Emergency Dashboard
                </h3>

                <p>
                  Manage your emergency
                </p>

              </div>

              <span className={styles.arrow}>
                →
              </span>

            </button>


            {/* TRACKING */}

            <button
              className={styles.card}
              onClick={onTracking}
              type="button"
            >

              <div className={`${styles.cardIcon} ${styles.tracking}`}>
                🛰️
              </div>

              <div className={styles.cardText}>

                <h3>
                  Tracking
                </h3>

                <p>
                  Track emergency status
                </p>

              </div>

              <span className={styles.arrow}>
                →
              </span>

            </button>


            {/* HISTORY */}

            <button
              className={styles.card}
              onClick={onHistory}
              type="button"
            >

              <div className={`${styles.cardIcon} ${styles.history}`}>
                🕘
              </div>

              <div className={styles.cardText}>

                <h3>
                  Emergency History
                </h3>

                <p>
                  View previous alerts
                </p>

              </div>

              <span className={styles.arrow}>
                →
              </span>

            </button>


            {/* BLOOD DONOR */}

            <button
              className={styles.card}
              onClick={onBloodDonor}
              type="button"
            >

              <div className={`${styles.cardIcon} ${styles.blood}`}>
                🩸
              </div>

              <div className={styles.cardText}>

                <h3>
                  Blood Donor
                </h3>

                <p>
                  Find a nearby donor
                </p>

              </div>

              <span className={styles.arrow}>
                →
              </span>

            </button>


            {/* AMBULANCE */}

            <button
              className={styles.card}
              onClick={onAmbulance}
              type="button"
            >

              <div className={`${styles.cardIcon} ${styles.ambulance}`}>
                🚑
              </div>

              <div className={styles.cardText}>

                <h3>
                  Nearby Ambulance
                </h3>

                <p>
                  Find emergency medical help
                </p>

              </div>

              <span className={styles.arrow}>
                →
              </span>

            </button>


            {/* HOSPITAL */}

            <button
              className={styles.card}
              onClick={onHospital}
              type="button"
            >

              <div className={`${styles.cardIcon} ${styles.hospital}`}>
                🏥
              </div>

              <div className={styles.cardText}>

                <h3>
                  Hospital Notifications
                </h3>

                <p>
                  Check hospital emergency updates
                </p>

              </div>

              <span className={styles.arrow}>
                →
              </span>

            </button>


            {/* EMERGENCY CALL */}

            <a
              className={styles.card}
              href="tel:112"
            >

              <div className={`${styles.cardIcon} ${styles.call}`}>
                📞
              </div>

              <div className={styles.cardText}>

                <h3>
                  Emergency Call
                </h3>

                <p>
                  Call emergency services
                </p>

              </div>

              <span className={styles.arrow}>
                →
              </span>

            </a>

          </div>

        </section>


        {/* ================= SAFETY STATUS ================= */}

        <section className={styles.safetyCard}>

          <div className={styles.safetyLeft}>

            <div className={styles.shield}>
              🛡️
            </div>

            <div>

              <h3>
                Safety Status
              </h3>

              <p>
                You are currently protected
              </p>

            </div>

          </div>


          <div className={styles.active}>

            <span></span>

            Active

          </div>

        </section>


        {/* ================= AI CARD ================= */}

        <section className={styles.aiCard}>

          <div className={styles.aiIcon}>
            ✨
          </div>

          <div className={styles.aiContent}>

            <p className={styles.aiLabel}>
              LIFELINK AI
            </p>

            <h2>
              Need help?
            </h2>

            <p>
              Your AI assistant can guide you through
              emergency situations.
            </p>

            <button
              className={styles.aiButton}
              type="button"
            >
              Talk to AI →
            </button>

          </div>

        </section>

      </div>


      {/* ================= BOTTOM NAV ================= */}

      <nav className={styles.bottomNav}>

        {/* HOME */}

        <button
          className={`${styles.navItem} ${styles.active}`}
          type="button"
        >

          <span>
            ⌂
          </span>

          <small>
            Home
          </small>

        </button>


        {/* TRACKING */}

        <button
          className={styles.navItem}
          onClick={onTracking}
          type="button"
        >

          <span>
            📍
          </span>

          <small>
            Tracking
          </small>

        </button>


        {/* SOS */}

        <button
          className={styles.sosNav}
          onClick={onSOS}
          type="button"
        >

          <div className={styles.bottomSOS}>
            SOS
          </div>

        </button>


        {/* HISTORY */}

        <button
          className={styles.navItem}
          onClick={onHistory}
          type="button"
        >

          <span>
            🕘
          </span>

          <small>
            History
          </small>

        </button>


        {/* PROFILE */}

        <button
          className={styles.navItem}
          onClick={onProfile}
          type="button"
        >

          <span>
            👤
          </span>

          <small>
            Profile
          </small>

        </button>

      </nav>

    </main>
  );
}