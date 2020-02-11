import React, { useState, useEffect } from "react";
import { Nav } from "../components/Nav";

//import the Confetti component here
import { Confetti } from "src/components/Confetti/Confetti"; //does this need to be Confetti.js?

export function Calm({ user, notion }) {
  const [calm, setCalmScore] = useState();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!user || !notion) {
      return "Hello, Sophia"; //this might break
      //do I need to put the below lines in here instead of their own useEffect
    }

    useEffect(() => {
      if (user && notion) { //this might be made redundant by the above
        notion.calm().subscribe(calm => {
          const score = Number(calm.probability.toFixed(2));
          setCalmScore(score);
          if (score > 0.3) {
            setShowConfetti(true);
          } else {
            setShowConfetti(false);
          }
        });
      }
    }, [user, notion]);
  
  
    //const subscription = notion.calm().subscribe(calm => {
      //setCalm(Number(calm.probability.toFixed(2)));
    //});

    return () => {
      subscription.unsubscribe();
    };
  }, [user, notion]);

  //changed this and lifted from notion-ocean
  return (
    <main>
      <h1>Welcome.Try to stay calm!</h1>
      {user ? <Nav notion={notion} /> : null}
      <meter value={calm} min={0} max={1} />
      <Confetti calm={calm} />
      {user ? <Nav notion={notion} /> : null}
      <div className="calm-score">
        &nbsp;{calm * 100}% <div className="calm-word test">Calm</div>
      </div>
      {showConfetti ? <TheConfetti /> : null}
    </main>
  );
}
