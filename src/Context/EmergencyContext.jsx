import { createContext, useContext, useState } from "react";

const EmergencyContext = createContext(null);

export const EmergencyProvider = ({ children }) => {

  // =========================
  // EMERGENCY STATE
  // =========================

  const [emergencyActive, setEmergencyActive] =
    useState(false);

  // =========================
  // LOCATION SHARING
  // =========================

  const [locationSharing, setLocationSharing] =
    useState(false);

  // =========================
  // HISTORY
  // =========================

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "lifelinkEmergencyHistory"
      );

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // =========================
  // ADD HISTORY
  // =========================

  const addHistory = (data) => {

    const newRecord = {
      id: data.id || Date.now(),

      date: data.date || new Date().toISOString(),

      location:
        data.location || "New Delhi, India",

      locationShared:
        data.locationShared ?? true,

      status:
        data.status || "active",

      ...data,
    };

    setHistory((previous) => {

      const updated = [
        newRecord,
        ...previous,
      ];

      localStorage.setItem(
        "lifelinkEmergencyHistory",
        JSON.stringify(updated)
      );

      return updated;
    });

    return newRecord.id;
  };

  // =========================
  // UPDATE HISTORY
  // =========================

  const updateHistory = (id, data) => {

    setHistory((previous) => {

      const updated = previous.map((item) =>
        item.id === id
          ? {
              ...item,
              ...data,
            }
          : item
      );

      localStorage.setItem(
        "lifelinkEmergencyHistory",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  // =========================
  // CLEAR HISTORY
  // =========================

  const clearHistory = () => {

    localStorage.removeItem(
      "lifelinkEmergencyHistory"
    );

    setHistory([]);
  };

  // =========================
  // PROVIDER
  // =========================

  return (
    <EmergencyContext.Provider
      value={{
        emergencyActive,
        setEmergencyActive,

        locationSharing,
        setLocationSharing,

        history,

        addHistory,

        updateHistory,

        clearHistory,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};


// =========================
// CUSTOM HOOK
// =========================

export const useEmergency = () => {

  const context = useContext(EmergencyContext);

  if (!context) {
    throw new Error(
      "useEmergency must be used inside EmergencyProvider"
    );
  }

  return context;
};