import React, { useCallback } from 'react';
import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine, ISourceOptions } from "tsparticles-engine";

export const ParticleBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "bubble",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 200,
          duration: 2,
          opacity: 0.4,
          size: 4,
          color: { value: "#00FF9F" }
        },
      },
    },
    particles: {
      color: {
        value: ["#00FF9F", "#00C2FF"],
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: false,
        opacity: 0.1,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
        random: true,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 30,
      },
      opacity: {
        value: { min: 0.1, max: 0.3 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false
        }
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles-ninja"
      init={particlesInit}
      options={options}
      className="absolute inset-0"
    />
  );
};
