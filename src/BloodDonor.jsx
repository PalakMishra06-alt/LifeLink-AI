import { useState } from "react";
import styles from "./BloodDonor.module.css";

export default function BloodDonor({ onBack }) {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");

  const donors = [
    {
      name: "Rahul Sharma",
      blood: "O+",
      location: "Delhi",
      distance: "1.2 km",
      phone: "9876543210",
    },
    {
      name: "Ananya Singh",
      blood: "B+",
      location: "Noida",
      distance: "3.5 km",
      phone: "9876543211",
    },
    {
      name: "Arjun Verma",
      blood: "A+",
      location: "Ghaziabad",
      distance: "5.1 km",
      phone: "9876543212",
    },
  ];

  const filteredDonors = donors.filter((donor) => {
    const bloodMatch =
      bloodGroup === "" || donor.blood === bloodGroup;

    const locationMatch =
      location === "" ||
      donor.location
        .toLowerCase()
        .includes(location.toLowerCase());

    return bloodMatch && locationMatch;
  });

  return (
    <main className={styles.bloodPage}>

      {/* HEADER */}
      <header className={styles.bloodHeader}>

        <button
          className={styles.backBtn}
          onClick={onBack}
          type="button"
          aria-label="Go back"
        >
          ←
        </button>

        <div>
          <h1>Blood Donor</h1>
          <p>Find a donor when every second matters</p>
        </div>

      </header>


      {/* EMERGENCY BANNER */}
      <section className={styles.emergencyBanner}>

        <div className={styles.bloodIcon}>
          🩸
        </div>

        <div className={styles.emergencyText}>
          <h3>Need Blood Urgently?</h3>

          <p>
            Find nearby blood donors and connect with them instantly.
          </p>
        </div>

      </section>


      {/* SEARCH CARD */}
      <section className={styles.donorSearchCard}>

        <h2>Find a Blood Donor</h2>

        <p className={styles.searchSubtitle}>
          Enter the required blood group and location
        </p>


        {/* BLOOD GROUP */}
        <div className={styles.formGroup}>

          <label htmlFor="bloodGroup">
            Blood Group
          </label>

          <select
            id="bloodGroup"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">
              Select Blood Group
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

        </div>


        {/* LOCATION */}
        <div className={styles.formGroup}>

          <label htmlFor="location">
            Location
          </label>

          <input
            id="location"
            type="text"
            placeholder="Enter city or area"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

        </div>


        <button
          className={styles.findBtn}
          type="button"
        >
          🔍 Find Donors
        </button>

      </section>


      {/* AVAILABLE DONORS */}
      <section className={styles.donorResults}>

        <div className={styles.resultsHeading}>

          <div>
            <h2>Available Donors</h2>
            <p>People ready to help</p>
          </div>

          <span>
            {filteredDonors.length} found
          </span>

        </div>


        {filteredDonors.length > 0 ? (

          <div className={styles.donorList}>

            {filteredDonors.map((donor) => (

              <article
                className={styles.donorCard}
                key={donor.phone}
              >

                <div className={styles.donorAvatar}>
                  {donor.name.charAt(0)}
                </div>


                <div className={styles.donorInfo}>

                  <h3>
                    {donor.name}
                  </h3>


                  <div className={styles.donorDetails}>

                    <span className={styles.bloodBadge}>
                      {donor.blood}
                    </span>

                    <span>
                      📍 {donor.location}
                    </span>

                  </div>


                  <p className={styles.distance}>
                    📏 {donor.distance} away
                  </p>

                </div>


                <a
                  className={styles.callBtn}
                  href={`tel:${donor.phone}`}
                  aria-label={`Call ${donor.name}`}
                >
                  📞
                </a>

              </article>

            ))}

          </div>

        ) : (

          <div className={styles.noDonor}>

            <div className={styles.noDonorIcon}>
              🩸
            </div>

            <h3>No donors found</h3>

            <p>
              Try another blood group or location.
            </p>

          </div>

        )}

      </section>


      {/* BECOME DONOR */}
      <section className={styles.becomeDonor}>

        <div className={styles.becomeContent}>

          <div className={styles.donorHeart}>
            ♥
          </div>

          <div>
            <h3>Become a Blood Donor</h3>

            <p>
              Your one donation can save a life.
            </p>
          </div>

        </div>


        <button type="button">
          Register
        </button>

      </section>

    </main>
  );
}