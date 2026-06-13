import React from 'react';
import { getMotivationMessage } from '../../utils/gamification';
import './MotivationSection.css';

function MotivationSection({ stats, levelProgress }) {
  const messages = getMotivationMessage(stats, levelProgress);

  return (
    <section className="motivation-section" aria-label="Motivational messages">
      <h2 className="section-heading">Keep Going!</h2>
      <div className="motivation-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`motivation-card motivation-${msg.type}`}>
            <span className="motivation-icon">
              {msg.type === 'streak' && '🔥'}
              {msg.type === 'level' && '⬆️'}
              {msg.type === 'badge' && '🎖️'}
              {msg.type === 'default' && '💪'}
            </span>
            <p className="motivation-text">{msg.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MotivationSection;
