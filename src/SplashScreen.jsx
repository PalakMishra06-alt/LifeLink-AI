import styles from "./SplashScreen.module.css";

const LifeLinkLogo = () => {
  return (
    <svg
      className={styles.logo}
      viewBox="0 0 180 180"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="LifeLink AI logo"
    >
      {/* Heart */}
      <path
        d="M90 145C78 133 35 101 35 64C35 42 50 28 69 28C79 28 87 33 90 42C93 33 101 28 111 28C130 28 145 42 145 64C145 101 102 133 90 145Z"
        fill="#EF3340"
      />

      {/* ECG */}
      <path
        d="M48 79H67L76 64L87 95L99 51L110 79H132"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Hand/support */}
      <path
        d="M43 119C57 131 73 139 90 142C108 139 124 131 137 119"
        fill="none"
        stroke="#C81E2B"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default function SplashScreen() {
  return (
    <main className={styles.splashScreen}>

      {/* Decorative medical symbols */}
      <span className={`${styles.medicalSymbol} ${styles.symbolOne}`}>
        +
      </span>

      <span className={`${styles.medicalSymbol} ${styles.symbolTwo}`}>
        +
      </span>

      <span className={`${styles.medicalSymbol} ${styles.symbolThree}`}>
        ✚
      </span>

      <span className={`${styles.medicalSymbol} ${styles.symbolFour}`}>
        +
      </span>

      {/* Decorative circles */}
      <div className={`${styles.dotCircle} ${styles.dotCircleOne}`} />
      <div className={`${styles.dotCircle} ${styles.dotCircleTwo}`} />

      {/* Main content */}
      <section className={styles.content}>

        {/* Logo */}
        <div className={styles.logoWrapper}>
          <LifeLinkLogo />
        </div>

        {/* Brand */}
        <h1 className={styles.brandName}>
          LifeLink <span>AI</span>
        </h1>

        <p className={styles.brandSubtitle}>
          SMART EMERGENCY RESPONSE
        </p>

        {/* Tagline */}
        <h2 className={styles.tagline}>
          Every <span>Second</span> Matters.
        </h2>

        <p className={styles.description}>
          AI-powered emergency response
          <br />
          when you need it most.
        </p>

        {/* Loader */}
        <div className={styles.loadingSection}>
          <div className={styles.loader}>
            <span />
          </div>

          <p>Loading...</p>
        </div>
      </section>

      {/* Bottom waves */}
      <div className={styles.waveContainer}>
        <div className={`${styles.wave} ${styles.waveLight}`} />
        <div className={`${styles.wave} ${styles.waveMedium}`} />
        <div className={`${styles.wave} ${styles.waveRed}`} />
      </div>

    </main>
  );
}