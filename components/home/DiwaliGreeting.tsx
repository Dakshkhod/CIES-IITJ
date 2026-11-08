'use client';

import { useEffect, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import styles from './DiwaliGreeting.module.css';

// Keep the seasonal greeting limited to Diwali and the following two days, in IST.
const CELEBRATION_START = Date.parse('2026-11-08T00:00:00+05:30');
const CELEBRATION_END = Date.parse('2026-11-11T00:00:00+05:30');
const DISMISS_KEY = 'cies-diwali-2026-dismissed';

export default function DiwaliGreeting() {
  const [visible, setVisible] = useState(false);
  const [celebration, setCelebration] = useState(0);

  useEffect(() => {
    const now = Date.now();
    if (now < CELEBRATION_START || now >= CELEBRATION_END) return;

    try {
      if (sessionStorage.getItem(DISMISS_KEY) === 'true') return;
    } catch {
      // The greeting still works when browser storage is unavailable.
    }

    setVisible(true);
    const expiry = window.setTimeout(() => setVisible(false), CELEBRATION_END - now);
    return () => window.clearTimeout(expiry);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, 'true');
    } catch {
      // Dismiss for this page view even if storage is unavailable.
    }
  };

  if (!visible) return null;

  return (
    <aside className={styles.greeting} aria-label="Diwali wishes from CIES IIT Jodhpur">
      <div key={celebration} className={styles.scene} aria-hidden="true">
        <span className={`${styles.spark} ${styles.sparkOne}`} />
        <span className={`${styles.spark} ${styles.sparkTwo}`} />
        <span className={`${styles.spark} ${styles.sparkThree}`} />
        <span className={styles.flame} />
        <span className={styles.wick} />
        <span className={styles.bowl} />
      </div>
      <div className={styles.message}>
        <p className={styles.title}>
          Happy Diwali <span lang="hi">· शुभ दीपावली</span>
        </p>
        <p className={styles.wish}>
          Wishing our CIES family a season of light, joy, and new beginnings.
        </p>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.action}
          onClick={() => setCelebration(value => value + 1)}
          aria-label="Replay Diwali lights"
          title="Replay Diwali lights"
        >
          <Sparkles size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={styles.action}
          onClick={dismiss}
          aria-label="Dismiss Diwali greeting"
          title="Dismiss greeting"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
