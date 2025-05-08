"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Principal() {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [running, setRunning] = useState(false);

  const totalImages = 9; // Total de imagens
  const totalTime = 5 * 60; // 5 minutos em segundos

  function handleIniciar() {
    setRunning(true);
  }

  function handlePausar() {
    setRunning(false);
  }

  function handleResetar() {
    setRunning(false);
    setTime({ minutes: 0, seconds: 0 });
  }

  function formatarMinutosSegundos(tempo: number) {
    return String(tempo).padStart(2, "0");
  }

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        const totalSeconds = prevTime.minutes * 60 + prevTime.seconds + 1;
        return {
          minutes: Math.floor(totalSeconds / 60),
          seconds: totalSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const totalSecondsElapsed = time.minutes * 60 + time.seconds;

  return (
    <div>
      <div className="m-4">
        <h1 className="text-3xl font-bold text-white">Deadly Scrum</h1>
        <h2 className="text-2xl font-bold text-white">Não mate o Sr Incrível!</h2>
        <h3 className="text-2xl font-bold text-white">
          {formatarMinutosSegundos(time.minutes)}:{formatarMinutosSegundos(time.seconds)}
        </h3>
        <Button className="m-2" onClick={handleIniciar}>Iniciar</Button>
        <Button className="m-2" onClick={handlePausar}>Pausar</Button>
        <Button className="m-2" onClick={handleResetar}>Resetar</Button>
      </div>
      <div className="relative h-[300px] w-[300px]">
        {Array.from({ length: totalImages }, (_, index) => {
          let imageAppearTime;

          if (index === 0) {
            // A primeira imagem aparece imediatamente
            imageAppearTime = 0;
          } else if (index === 1) {
            // A segunda imagem aparece após 1 minuto e meio (90 segundos)
            imageAppearTime = 90;
          } else {
            // As demais imagens aparecem gradualmente entre 2 minutos e meio (150 segundos) e 5 minutos
            const remainingImages = totalImages - 2;
            const timePerImage = (totalTime - 150) / remainingImages;
            imageAppearTime = 150 + (index - 2) * timePerImage;
          }

          return (
            <div
              key={index}
              className={`absolute h-[300px] w-[300px] ${
                totalSecondsElapsed >= imageAppearTime ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
            >
              <Image
                src={`/${index + 1}.jpg`}
                alt={`Imagem ${index + 1}`}
                width={300}
                height={300}
                priority
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}