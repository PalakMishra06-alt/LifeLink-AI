import { useState } from "react";
import {
  ArrowLeft,
  History as HistoryIcon,
  MapPin,
  Clock3,
  CheckCircle2,
  XCircle,
  Trash2,
  ChevronRight,
} from "lucide-react";

import styles from "./History.module.css";
import { useEmergency } from "./context/EmergencyContext";

export default function History({ onBack }) {
  const {
    history,
    clearHistory,
  } = useEmergency();

  const [selectedItem, setSelectedItem] = useState(null);

  // =========================
  // DATE
  // =========================

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================
  // TIME
  // =========================

  const formatTime = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =========================
  // CLEAR
  // =========================

  const handleClearHistory = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to clear all emergency history?"
    );

    if (confirmDelete) {
      clearHistory();
    }
  };

  return (
    <main className={styles.page}>

      {/* =========================
          HEADER
      ========================= */}

      <header className={styles.header}>

        <button
          className={styles.backButton}
          onClick={onBack}
          type="button"
        >
          <ArrowLeft size={20} />
        </button>

        <div className={styles.headerText}>

          <h1>
            Emergency History
          </h1>

          <p>
            View your previous emergency activities
          </p>

        </div>

      </header>


      <section className={styles.container}>

        {/* =========================
            SUMMARY
        ========================= */}

        <div className={styles.summaryCard}>

          <div className={styles.summaryIcon}>
            <HistoryIcon size={22} />
          </div>

          <div>

            <span>
              Total Emergencies
            </span>

            <strong>
              {history.length}
            </strong>

          </div>

        </div>


        {/* =========================
            SECTION HEADER
        ========================= */}

        <div className={styles.sectionHeader}>

          <div>

            <h2>
              Recent Activity
            </h2>

            <p>
              Your emergency requests and alerts
            </p>

          </div>


          {history.length > 0 && (

            <button
              className={styles.clearButton}
              onClick={handleClearHistory}
              type="button"
            >
              <Trash2 size={15} />
              Clear
            </button>

          )}

        </div>


        {/* =========================
            EMPTY STATE
        ========================= */}

        {history.length === 0 && (

          <div className={styles.emptyState}>

            <div className={styles.emptyIcon}>
              <HistoryIcon size={28} />
            </div>

            <h3>
              No Emergency History
            </h3>

            <p>
              Your previous emergency activities
              will appear here.
            </p>

            <button
              className={styles.backHomeButton}
              onClick={onBack}
              type="button"
            >
              Back to Home
            </button>

          </div>

        )}


        {/* =========================
            HISTORY LIST
        ========================= */}

        {history.length > 0 && (

          <div className={styles.historyList}>

            {history.map((item) => {

              const isCancelled =
                item.status === "cancelled";

              const isActive =
                item.status === "active";

              return (

                <button
                  key={item.id}
                  className={styles.historyCard}
                  onClick={() =>
                    setSelectedItem(item)
                  }
                  type="button"
                >

                  {/* ICON */}

                  <div
                    className={`${styles.historyIcon} ${
                      isCancelled
                        ? styles.cancelledIcon
                        : styles.completedIcon
                    }`}
                  >

                    {isCancelled ? (
                      <XCircle size={20} />
                    ) : (
                      <CheckCircle2 size={20} />
                    )}

                  </div>


                  {/* CONTENT */}

                  <div className={styles.historyContent}>

                    <div className={styles.historyTop}>

                      <h3>
                        Emergency SOS
                      </h3>

                      <span
                        className={`${styles.statusBadge} ${
                          isCancelled
                            ? styles.cancelledBadge
                            : styles.completedBadge
                        }`}
                      >
                        {isCancelled
                          ? "Cancelled"
                          : isActive
                          ? "Active"
                          : "Completed"}
                      </span>

                    </div>


                    <div className={styles.historyInfo}>

                      <span>
                        <Clock3 size={13} />

                        {formatDate(item.date)}
                        {" · "}
                        {formatTime(item.date)}
                      </span>


                      <span>
                        <MapPin size={13} />

                        {item.location ||
                          "Location unavailable"}
                      </span>

                    </div>

                  </div>


                  <ChevronRight
                    size={18}
                    className={styles.arrow}
                  />

                </button>

              );
            })}

          </div>

        )}

      </section>


      {/* =========================
          DETAIL MODAL
      ========================= */}

      {selectedItem && (

        <div
          className={styles.modalOverlay}
          onClick={() =>
            setSelectedItem(null)
          }
        >

          <div
            className={styles.modal}
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className={styles.modalHeader}>

              <div>

                <span>
                  EMERGENCY DETAILS
                </span>

                <h2>
                  Emergency SOS
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedItem(null)
                }
                type="button"
              >
                ×
              </button>

            </div>


            <div className={styles.detailList}>

              <div className={styles.detailRow}>

                <span>
                  Status
                </span>

                <strong>
                  {selectedItem.status ===
                  "cancelled"
                    ? "Cancelled"
                    : selectedItem.status ===
                      "active"
                    ? "Active"
                    : "Completed"}
                </strong>

              </div>


              <div className={styles.detailRow}>

                <span>
                  Date
                </span>

                <strong>
                  {formatDate(
                    selectedItem.date
                  )}
                </strong>

              </div>


              <div className={styles.detailRow}>

                <span>
                  Time
                </span>

                <strong>
                  {formatTime(
                    selectedItem.date
                  )}
                </strong>

              </div>


              <div className={styles.detailRow}>

                <span>
                  Location
                </span>

                <strong>
                  {selectedItem.location ||
                    "Location unavailable"}
                </strong>

              </div>


              <div className={styles.detailRow}>

                <span>
                  Location Sharing
                </span>

                <strong>
                  {selectedItem.locationShared
                    ? "Active"
                    : "Not Available"}
                </strong>

              </div>

            </div>


            <button
              className={styles.closeButton}
              onClick={() =>
                setSelectedItem(null)
              }
              type="button"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </main>
  );
}