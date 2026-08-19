import { useState } from "react";
import styles from "./AISeverity.module.css";

export default function AISeverity({ onBack }) {
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const symptomList = [
    {
      id: "chest",
      name: "Chest Pain",
      icon: "💔",
      severity: 4,
    },
    {
      id: "breathing",
      name: "Breathing Difficulty",
      icon: "🫁",
      severity: 4,
    },
    {
      id: "unconscious",
      name: "Unconscious / Unresponsive",
      icon: "⚠️",
      severity: 5,
    },
    {
      id: "bleeding",
      name: "Heavy Bleeding",
      icon: "🩸",
      severity: 5,
    },
    {
      id: "accident",
      name: "Major Accident",
      icon: "🚗",
      severity: 5,
    },
    {
      id: "pain",
      name: "Severe Pain",
      icon: "😣",
      severity: 3,
    },
    {
      id: "dizziness",
      name: "Dizziness",
      icon: "😵",
      severity: 2,
    },
    {
      id: "fever",
      name: "High Fever",
      icon: "🌡️",
      severity: 2,
    },
  ];

  const toggleSymptom = (id) => {
    setSymptoms((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id);
      }

      return [...previous, id];
    });

    setResult(null);
  };

  const analyzeEmergency = () => {
    if (symptoms.length === 0) {
      alert("Please select at least one symptom.");
      return;
    }

    setAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const selectedSymptoms = symptomList.filter((item) =>
        symptoms.includes(item.id)
      );

      const score = selectedSymptoms.reduce(
        (total, item) => total + item.severity,
        0
      );

      let severity;
      let recommendation;

      if (
        score >= 7 ||
        symptoms.includes("unconscious") ||
        symptoms.includes("bleeding") ||
        symptoms.includes("accident")
      ) {
        severity = "HIGH";
        recommendation =
          "Immediate emergency assistance is recommended. Activate SOS and contact emergency services.";
      } else if (score >= 4) {
        severity = "MEDIUM";
        recommendation =
          "Medical assistance may be required soon. Keep monitoring the situation and consider contacting a medical professional.";
      } else {
        severity = "LOW";
        recommendation =
          "The situation appears less severe based on the selected symptoms. Continue monitoring and seek medical help if symptoms worsen.";
      }

      setResult({
        severity,
        score,
        recommendation,
      });

      setAnalyzing(false);
    }, 1500);
  };

  const resetAnalysis = () => {
    setSymptoms([]);
    setResult(null);
  };

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
          <p className={styles.headerLabel}>
            LIFELINK AI
          </p>

          <h1>
            AI Severity Analysis
          </h1>

          <p>
            Assess the urgency of an emergency
          </p>
        </div>

      </header>


      {/* INTRO */}

      <section className={styles.introCard}>

        <div className={styles.aiIcon}>
          🤖
        </div>

        <div>
          <h2>
            Emergency AI Assistant
          </h2>

          <p>
            Select the symptoms you are experiencing.
            Our emergency assessment will estimate the
            severity level.
          </p>
        </div>

      </section>


      {/* SYMPTOMS */}

      <section className={styles.section}>

        <div className={styles.sectionHeading}>
          <h2>
            What is happening?
          </h2>

          <p>
            Select all symptoms that apply.
          </p>
        </div>


        <div className={styles.symptomGrid}>

          {symptomList.map((symptom) => {

            const selected = symptoms.includes(symptom.id);

            return (
              <button
                key={symptom.id}
                type="button"
                className={`${styles.symptomCard} ${
                  selected ? styles.selected : ""
                }`}
                onClick={() => toggleSymptom(symptom.id)}
              >

                <div className={styles.symptomIcon}>
                  {symptom.icon}
                </div>

                <div className={styles.symptomText}>
                  <h3>
                    {symptom.name}
                  </h3>

                  {selected && (
                    <span>
                      ✓ Selected
                    </span>
                  )}
                </div>

              </button>
            );
          })}

        </div>

      </section>


      {/* ANALYZE BUTTON */}

      {!result && (

        <button
          className={styles.analyzeBtn}
          onClick={analyzeEmergency}
          disabled={analyzing}
          type="button"
        >

          {analyzing
            ? "🤖 Analyzing Emergency..."
            : "✨ Analyze Emergency"}

        </button>

      )}


      {/* RESULT */}

      {result && (

        <section className={styles.resultCard}>

          <div className={styles.resultHeader}>

            <div className={styles.resultAI}>
              🤖
            </div>

            <div>
              <span>
                AI EMERGENCY ANALYSIS
              </span>

              <h2>
                Severity Detected
              </h2>
            </div>

          </div>


          <div
            className={`${styles.severityBox} ${
              result.severity === "HIGH"
                ? styles.high
                : result.severity === "MEDIUM"
                ? styles.medium
                : styles.low
            }`}
          >

            <div className={styles.severityIcon}>

              {result.severity === "HIGH"
                ? "🚨"
                : result.severity === "MEDIUM"
                ? "⚠️"
                : "🟢"}

            </div>

            <div>

              <span>
                EMERGENCY LEVEL
              </span>

              <h3>
                {result.severity}
              </h3>

            </div>

          </div>


          <div className={styles.scoreBox}>

            <span>
              Assessment Score
            </span>

            <strong>
              {result.score}
            </strong>

          </div>


          <div className={styles.recommendation}>

            <h3>
              Recommended Action
            </h3>

            <p>
              {result.recommendation}
            </p>

          </div>


          {result.severity === "HIGH" && (

            <div className={styles.emergencyWarning}>

              🚨 <strong>Emergency assistance recommended</strong>

              <p>
                Keep your phone accessible and share your
                location with emergency contacts.
              </p>

            </div>

          )}


          <button
            className={styles.resetBtn}
            onClick={resetAnalysis}
            type="button"
          >
            Analyze Again
          </button>

        </section>

      )}


      {/* DISCLAIMER */}

      <p className={styles.disclaimer}>
        ⚕️ This AI assessment is a prototype for emergency
        assistance and does not replace professional medical
        diagnosis.
      </p>

    </main>
  );
}