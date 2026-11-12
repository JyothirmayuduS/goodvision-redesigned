import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  scattered: boolean;
  onReveal: () => void;
};

/** Compact stamp footprint */
const CSS_W = 200;
const CSS_H = 232;

export default function ScratchReveal({ scattered, onReveal }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const drawing = useRef(false);
  const done = useRef(false);
  const [ready, setReady] = useState(false);
  const [opened, setOpened] = useState(false);

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(CSS_W * dpr);
    canvas.height = Math.round(CSS_H * dpr);
    canvas.style.width = `${CSS_W}px`;
    canvas.style.height = `${CSS_H}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    ctx.fillStyle = '#2b4bff';
    ctx.fillRect(0, 0, CSS_W, CSS_H);

    ctx.fillStyle = 'rgba(0,0,0,0.16)';
    ctx.beginPath();
    ctx.moveTo(CSS_W / 2 - 28, CSS_H / 2 - 48);
    ctx.lineTo(CSS_W / 2 + 34, CSS_H / 2 - 20);
    ctx.lineTo(CSS_W / 2 + 10, CSS_H / 2 + 52);
    ctx.lineTo(CSS_W / 2 - 34, CSS_H / 2 + 20);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = '700 12px "Plus Jakarta Sans", Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH TO REVEAL', CSS_W / 2, CSS_H - 36);

    done.current = false;
    setReady(true);
  }, []);

  useEffect(() => {
    if (opened) return;
    paintCover();
  }, [opened, paintCover]);

  const toLocal = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * CSS_W,
      y: ((clientY - rect.top) / rect.height) * CSS_H,
    };
  };

  const erase = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || opened || done.current) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 46;
    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#000';

    const prev = last.current;
    if (prev) {
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 23, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    last.current = { x, y };

    const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    const step = 28;
    for (let i = 3; i < sample.length; i += step) {
      if (sample[i] < 32) cleared += 1;
    }
    if (cleared / Math.ceil(sample.length / step) > 0.28) {
      done.current = true;
      setOpened(true);
      onReveal();
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    drawing.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    last.current = null;
    const p = toLocal(e.clientX, e.clientY);
    erase(p.x, p.y);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    e.preventDefault();
    const p = toLocal(e.clientX, e.clientY);
    erase(p.x, p.y);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = false;
    last.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  return (
    <div className={`scratch-deck ${scattered ? 'is-scattered' : ''}`}>
      <div
        className={`scratch-card-wrap stamp ${opened ? 'is-open' : ''}`}
        style={{ width: CSS_W, height: CSS_H }}
      >
        <article className="scratch-under">
          <p className="scratch-under-quote">
            DAD CAME HOME FROM SURGERY. A NURSE WAS AT OUR DOOR THE NEXT MORNING.
          </p>
          <footer className="poster-foot">
            <div className="poster-who">
              <b>Priya S.</b>
              <span>Nellore · Post-surgery</span>
            </div>
            <img
              className="poster-avatar"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80"
              alt=""
              width={40}
              height={40}
            />
          </footer>
        </article>

        <canvas
          ref={canvasRef}
          className={`scratch-canvas ${ready ? 'ready' : ''} ${opened ? 'faded' : ''}`}
          onPointerDown={opened ? undefined : onPointerDown}
          onPointerMove={opened ? undefined : onPointerMove}
          onPointerUp={opened ? undefined : onPointerUp}
          onPointerCancel={opened ? undefined : onPointerUp}
          aria-label="Scratch this card to reveal family reviews"
        />
      </div>

      {!scattered && (
        <p className="scratch-hint sealed-label">Scratch the stamp</p>
      )}
    </div>
  );
}
