import { useEffect, useState } from "react";
import styles from "./Profile.module.css";

export default function Profile({ onBack }) {
  const [profile, setProfile] = useState({
    name: "Emergency User",
    bloodGroup: "",
    phone: "",
    address: "",
  });

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  // ================= LOAD SAVED PROFILE =================

  useEffect(() => {
    const savedProfile = localStorage.getItem("lifelinkProfile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  // ================= SAVE =================

  const handleSave = () => {
    localStorage.setItem(
      "lifelinkProfile",
      JSON.stringify(profile)
    );

    setEditing(false);
    setSaved(true);
  };

  // ================= CANCEL =================

  const handleCancel = () => {
    const savedProfile = localStorage.getItem("lifelinkProfile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    setEditing(false);
    setSaved(false);
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
            My Profile
          </h1>

          <p>
            Manage your emergency information
          </p>
        </div>

      </header>


      {/* ================= PROFILE HEADER ================= */}

      <section className={styles.profileCard}>

        <div className={styles.avatar}>
          👤
        </div>

        <div className={styles.profileInfo}>

          <h2>
            {profile.name || "Emergency User"}
          </h2>

          <p>
            LifeLink AI Member
          </p>

        </div>

        {!editing && (
          <button
            className={styles.editTopBtn}
            onClick={() => {
              setEditing(true);
              setSaved(false);
            }}
            type="button"
          >
            ✏️ Edit
          </button>
        )}

      </section>


      {/* ================= SAVED MESSAGE ================= */}

      {saved && (
        <div className={styles.successMessage}>
          ✓ Profile saved successfully
        </div>
      )}


      {/* ================= EMERGENCY INFORMATION ================= */}

      <section className={styles.section}>

        <div className={styles.sectionHeading}>

          <div>
            <h2>
              Emergency Information
            </h2>

            <p>
              This information can help during an emergency.
            </p>
          </div>

        </div>


        {/* NAME */}

        <div className={styles.inputCard}>

          <div className={styles.infoIcon}>
            👤
          </div>

          <div className={styles.field}>

            <label>
              Full Name
            </label>

            {editing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            ) : (
              <p>
                {profile.name || "Not added yet"}
              </p>
            )}

          </div>

        </div>


        {/* BLOOD GROUP */}

        <div className={styles.inputCard}>

          <div className={styles.infoIcon}>
            🩸
          </div>

          <div className={styles.field}>

            <label>
              Blood Group
            </label>

            {editing ? (
              <select
                name="bloodGroup"
                value={profile.bloodGroup}
                onChange={handleChange}
              >
                <option value="">
                  Select blood group
                </option>

                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            ) : (
              <p>
                {profile.bloodGroup || "Not added yet"}
              </p>
            )}

          </div>

        </div>


        {/* PHONE */}

        <div className={styles.inputCard}>

          <div className={styles.infoIcon}>
            📞
          </div>

          <div className={styles.field}>

            <label>
              Emergency Contact
            </label>

            {editing ? (
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter emergency contact"
              />
            ) : (
              <p>
                {profile.phone || "Not added yet"}
              </p>
            )}

          </div>

        </div>


        {/* ADDRESS */}

        <div className={styles.inputCard}>

          <div className={styles.infoIcon}>
            🏠
          </div>

          <div className={styles.field}>

            <label>
              Emergency Address
            </label>

            {editing ? (
              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Enter your emergency address"
                rows="3"
              />
            ) : (
              <p>
                {profile.address || "Not added yet"}
              </p>
            )}

          </div>

        </div>


        {/* ================= BUTTONS ================= */}

        {editing && (
          <div className={styles.buttonRow}>

            <button
              className={styles.cancelBtn}
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>

            <button
              className={styles.saveBtn}
              onClick={handleSave}
              type="button"
            >
              💾 Save Changes
            </button>

          </div>
        )}

      </section>


      {/* ================= SAFETY STATUS ================= */}

      <section className={styles.safetyCard}>

        <div className={styles.shield}>
          🛡️
        </div>

        <div className={styles.safetyText}>

          <h3>
            Safety Status
          </h3>

          <p>
            Your LifeLink emergency services are ready.
          </p>

        </div>

        <span className={styles.active}>
          Active
        </span>

      </section>


      {/* ================= INFO ================= */}

      <p className={styles.footerText}>
        Your information is stored locally on this device.
      </p>

    </main>
  );
}