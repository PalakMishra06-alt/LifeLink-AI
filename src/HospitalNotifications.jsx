import { useState } from "react";
import styles from "./HospitalNotifications.module.css";

export default function HospitalNotifications({ onBack }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Emergency Accepted",
      hospital: "City Care Hospital",
      message:
        "Your emergency request has been accepted. The hospital is preparing for your arrival.",
      time: "Just now",
      status: "accepted",
      icon: "🏥",
    },
    {
      id: 2,
      type: "Emergency Department",
      hospital: "Metro Emergency Center",
      message:
        "Emergency department is currently available for incoming patients.",
      time: "5 min ago",
      status: "available",
      icon: "🚑",
    },
    {
      id: 3,
      type: "Hospital Alert",
      hospital: "LifeCare Medical Center",
      message:
        "Emergency medical team has been notified about your emergency.",
      time: "12 min ago",
      status: "notified",
      icon: "🔔",
    },
  ]);

  const markAllRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

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
          <p className={styles.label}>
            LIFELINK AI
          </p>

          <h1>
            Hospital Notifications
          </h1>

          <p className={styles.subtitle}>
            Stay updated with emergency hospital alerts
          </p>
        </div>

      </header>


      {/* ================= STATUS ================= */}

      <section className={styles.statusCard}>

        <div className={styles.statusIcon}>
          🏥
        </div>

        <div className={styles.statusInfo}>

          <span>
            HOSPITAL NETWORK
          </span>

          <h2>
            Emergency services connected
          </h2>

          <p>
            Nearby hospitals can receive your emergency
            information and prepare for your arrival.
          </p>

        </div>

        <div className={styles.online}>
          <span></span>
          Online
        </div>

      </section>


      {/* ================= TITLE ================= */}

      <section className={styles.notificationSection}>

        <div className={styles.sectionHeader}>

          <div>
            <h2>
              Emergency Updates
            </h2>

            <p>
              Latest hospital notifications
            </p>
          </div>

          {notifications.length > 0 && (
            <span className={styles.count}>
              {notifications.length}
            </span>
          )}

        </div>


        {/* ================= NOTIFICATIONS ================= */}

        {notifications.length === 0 ? (

          <div className={styles.emptyCard}>

            <div>
              🔕
            </div>

            <h3>
              No notifications
            </h3>

            <p>
              You are all caught up. New hospital alerts
              will appear here.
            </p>

          </div>

        ) : (

          <div className={styles.notificationList}>

            {notifications.map((notification) => (

              <article
                key={notification.id}
                className={`${styles.notificationCard} ${
                  notification.read ? styles.read : ""
                }`}
              >

                <div className={styles.notificationIcon}>
                  {notification.icon}
                </div>

                <div className={styles.notificationContent}>

                  <div className={styles.notificationTop}>

                    <span className={styles.notificationType}>
                      {notification.type}
                    </span>

                    <span className={styles.time}>
                      {notification.time}
                    </span>

                  </div>

                  <h3>
                    {notification.hospital}
                  </h3>

                  <p>
                    {notification.message}
                  </p>

                  <div className={styles.notificationStatus}>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[notification.status]
                      }`}
                    >
                      {notification.status === "accepted"
                        ? "✓ Accepted"
                        : notification.status === "available"
                        ? "● Available"
                        : "✓ Notified"}
                    </span>
                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>


      {/* ================= ACTIONS ================= */}

      {notifications.length > 0 && (

        <div className={styles.actions}>

          <button
            className={styles.readBtn}
            onClick={markAllRead}
            type="button"
          >
            ✓ Mark All Read
          </button>

          <button
            className={styles.clearBtn}
            onClick={clearNotifications}
            type="button"
          >
            Clear
          </button>

        </div>

      )}


      {/* ================= INFO ================= */}

      <section className={styles.infoCard}>

        <div className={styles.infoIcon}>
          ℹ️
        </div>

        <div>

          <h3>
            How hospital notifications work
          </h3>

          <p>
            When an emergency is activated, LifeLink AI can
            notify connected emergency hospitals with your
            emergency status and location information.
          </p>

        </div>

      </section>


      {/* ================= EMERGENCY CALL ================= */}

      <a
        href="tel:112"
        className={styles.emergencyBtn}
      >
        📞 Call Emergency Services — 112
      </a>

    </main>
  );
}