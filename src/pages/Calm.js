import React, { useState, useEffect } from "react";
import { Nav } from "../components/Nav";

import { TheConfetti } from "../components/Confetti/Confetti.js";

export function Calm({ user, notion }) {
  const [calm, setCalmScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!user || !notion) {
      return;
    }

    const subscription = notion.calm().subscribe(calm => {
      const score = Number(calm.probability.toFixed(2));
      setCalmScore(score);
      if (score > 0.2) {
        setShowConfetti(true);
      } else {
        setShowConfetti(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [user, notion]);

  return (
    <main>
      <h1>Welcome.Try to stay calm!</h1>
      {user ? <Nav notion={notion} /> : null}
      <div className="calm-score">
        &nbsp;{calm * 100}% <div className="calm-word test">Calm</div>
      </div>
      {showConfetti ? <TheConfetti /> : null}
    </main>
  );
}
