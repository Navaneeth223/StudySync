'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { formatTimer } from '@/lib/utils';
import { TimerPhase } from '@/types/timer.types';

interface PomodoroRingProps {
  phase: TimerPhase;
  timeRemaining: number;
  totalDuration: number;
  isRunning: boolean;
}

export function PomodoroRing({ phase, timeRemaining, totalDuration, isRunning }: PomodoroRingProps) {
  const size = 280;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  const progress = totalDuration > 0 ? timeRemaining / totalDuration : 0;
  const strokeDashoffset = circumference * (1 - progress);

  // Colors based on phase
  const colors = {
    idle: {
      stroke: 'var(--timer-ring-bg)',
      glow: 'none',
      text: 'var(--text-muted)',
    },
    focus: {
      stroke: 'var(--aurora-violet)',
      glow: 'var(--shadow-glow-v)',
      text: 'var(--aurora-violet)',
    },
    break: {
      stroke: 'var(--aurora-mint)',
      glow: 'var(--shadow-glow-t)',
      text: 'var(--aurora-mint)',
    },
    longBreak: {
      stroke: 'var(--aurora-teal)',
      glow: 'var(--shadow-glow-t)',
      text: 'var(--aurora-teal)',
    },
  };

  const phaseLabels = {
    idle: 'Ready',
    focus: 'Focus Time',
    break: 'Break Time',
    longBreak: 'Long Break',
  };

  const currentColors = colors[phase];

  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background ring */}
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--timer-ring-bg)"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={currentColors.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              filter: phase !== 'idle' ? `drop-shadow(${currentColors.glow})` : 'none',
              transition: 'stroke-dashoffset 1s linear, stroke 0.8s ease',
            }}
            initial={false}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            key={phase}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div
              className="font-mono font-bold mb-2"
              style={{
                fontSize: '64px',
                lineHeight: 1,
                color: 'var(--timer-text)',
              }}
            >
              {formatTimer(timeRemaining)}
            </div>
            <div
              className="text-sm font-medium uppercase tracking-wider"
              style={{ color: currentColors.text }}
            >
              {phaseLabels[phase]}
            </div>
          </motion.div>

          {/* Pulse effect when running */}
          {isRunning && phase !== 'idle' && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: `2px solid ${currentColors.stroke}`,
                opacity: 0.3,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
