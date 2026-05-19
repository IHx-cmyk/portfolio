import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const PLANETS = [
  {
    name: 'Mercury', radius: 0.38, distance: 9, speed: 4.74, rotSpeed: 0.003,
    color: '#b5b5b5', emissive: '#4a4a4a',
    atmosphere: null,
    details: 'Closest to the Sun • No atmosphere • Extreme temperatures',
    tilt: 0.03,
  },
  {
    name: 'Venus', radius: 0.95, distance: 14, speed: 3.5, rotSpeed: -0.001,
    color: '#e8cda0', emissive: '#8b6914',
    atmosphere: { color: '#f5deb3', opacity: 0.35, scale: 1.08 },
    details: 'Hottest planet • Thick toxic atmosphere • Retrograde rotation',
    tilt: 2.64,
  },
  {
    name: 'Earth', radius: 1.0, distance: 20, speed: 2.98, rotSpeed: 0.02,
    color: '#2a7fd4', emissive: '#0d3d6b',
    atmosphere: { color: '#88bbff', opacity: 0.2, scale: 1.1 },
    details: 'Our home • Only known life • Perfect conditions',
    tilt: 23.44, hasMoon: true,
    landColor: '#3a9a4a',
  },
  {
    name: 'Mars', radius: 0.53, distance: 27, speed: 2.41, rotSpeed: 0.018,
    color: '#c1440e', emissive: '#6b1f00',
    atmosphere: { color: '#e8826b', opacity: 0.12, scale: 1.06 },
    details: 'Red Planet • Largest volcano in solar system • Two moons',
    tilt: 25.19,
  },
  {
    name: 'Jupiter', radius: 2.8, distance: 40, speed: 1.31, rotSpeed: 0.04,
    color: '#c88b3a', emissive: '#5a3800',
    atmosphere: { color: '#e8b87a', opacity: 0.18, scale: 1.05 },
    details: 'Largest planet • Great Red Spot • 95 known moons',
    tilt: 3.13, hasBands: true,
  },
  {
    name: 'Saturn', radius: 2.2, distance: 56, speed: 0.97, rotSpeed: 0.038,
    color: '#e4d191', emissive: '#7a6800',
    atmosphere: { color: '#f0e09a', opacity: 0.15, scale: 1.05 },
    details: 'Ring system • Least dense planet • 146 known moons',
    tilt: 26.73, hasRings: true,
  },
  {
    name: 'Uranus', radius: 1.6, distance: 70, speed: 0.68, rotSpeed: -0.025,
    color: '#7de8e8', emissive: '#1a6868',
    atmosphere: { color: '#aaffff', opacity: 0.2, scale: 1.08 },
    details: 'Ice giant • Rotates on its side • Faint ring system',
    tilt: 97.77,
  },
  {
    name: 'Neptune', radius: 1.55, distance: 84, speed: 0.54, rotSpeed: 0.022,
    color: '#3f54ba', emissive: '#0d1a5e',
    atmosphere: { color: '#6680ff', opacity: 0.22, scale: 1.09 },
    details: 'Strongest winds • Farthest planet • 16 known moons',
    tilt: 28.32,
  },
];

function createPlanetTexture(planet) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (planet.name === 'Jupiter') {
    const bands = ['#e8c07a','#c88b3a','#f0d090','#b87030','#e0b870','#d09040','#f8e0a0','#c07828','#e8c870','#d08840'];
    const h = size / bands.length;
    bands.forEach((c, i) => {
      const g = ctx.createLinearGradient(0, i*h, 0, (i+1)*h);
      g.addColorStop(0, c);
      g.addColorStop(0.5, shiftColor(c, -15));
      g.addColorStop(1, c);
      ctx.fillStyle = g;
      ctx.fillRect(0, i * h, size, h + 2);
    });
    ctx.save();
    ctx.translate(size * 0.6, size * 0.55);
    const grs = ctx.createRadialGradient(0, 0, 0, 0, 0, 40);
    grs.addColorStop(0, 'rgba(180,60,30,0.9)');
    grs.addColorStop(0.6, 'rgba(160,50,20,0.7)');
    grs.addColorStop(1, 'rgba(140,70,30,0)');
    ctx.fillStyle = grs;
    ctx.scale(1.8, 1);
    ctx.beginPath(); ctx.arc(0,0,40,0,Math.PI*2); ctx.fill();
    ctx.restore();
  } else if (planet.name === 'Saturn') {
    const bands = ['#f0e090','#e0c870','#f8f0a0','#d0b850','#ece890'];
    const h = size / bands.length;
    bands.forEach((c, i) => {
      ctx.fillStyle = c; ctx.fillRect(0, i * h, size, h + 2);
    });
  } else if (planet.name === 'Earth') {
    ctx.fillStyle = '#1a5fa8'; ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#2d8a3e';
    [[80,120,180,140],[300,100,120,160],[200,260,160,120],[60,320,200,100],[360,200,100,140]].forEach(([x,y,w,h]) => {
      ctx.beginPath();
      ctx.ellipse(x, y, w/2, h/2, Math.random()*0.5, 0, Math.PI*2);
      ctx.fill();
    });
    ctx.fillStyle = '#e8f4ff';
    ctx.fillRect(0,0,size,40); ctx.fillRect(0,size-40,size,40);
    ctx.globalAlpha = 0.5; ctx.fillStyle = '#ffffff';
    for(let i=0;i<12;i++){
      const x=Math.random()*size, y=Math.random()*size, r=20+Math.random()*60;
      ctx.beginPath(); ctx.ellipse(x,y,r,r*0.4,0,0,Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  } else if (planet.name === 'Mars') {
    ctx.fillStyle = '#c1440e'; ctx.fillRect(0,0,size,size);
    for(let i=0;i<200;i++){
      const x=Math.random()*size, y=Math.random()*size, r=3+Math.random()*25;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
      ctx.fillStyle = `rgba(${80+Math.random()*60},${20+Math.random()*20},${Math.random()*10},0.3)`;
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(240,230,220,0.6)';
    ctx.beginPath(); ctx.ellipse(size/2,15,80,15,0,0,Math.PI*2); ctx.fill();
  } else if (planet.name === 'Mercury') {
    ctx.fillStyle = '#9a9a9a'; ctx.fillRect(0,0,size,size);
    for(let i=0;i<300;i++){
      const x=Math.random()*size, y=Math.random()*size, r=1+Math.random()*15;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
      ctx.fillStyle = `rgba(${50+Math.random()*60},${50+Math.random()*60},${50+Math.random()*60},0.5)`;
      ctx.fill();
    }
  } else if (planet.name === 'Venus') {
    const g = ctx.createLinearGradient(0,0,size,size);
    g.addColorStop(0,'#f0d890'); g.addColorStop(0.5,'#e0c070'); g.addColorStop(1,'#d0a850');
    ctx.fillStyle = g; ctx.fillRect(0,0,size,size);
    for(let i=0;i<8;i++){
      ctx.beginPath();
      ctx.moveTo(0, (size/8)*i);
      ctx.bezierCurveTo(size*0.3,(size/8)*i+20,size*0.7,(size/8)*i-20,size,(size/8)*i);
      ctx.strokeStyle=`rgba(180,150,60,0.3)`; ctx.lineWidth=15; ctx.stroke();
    }
  } else if (planet.name === 'Uranus' || planet.name === 'Neptune') {
    const g = ctx.createRadialGradient(size*0.4,size*0.35,0,size/2,size/2,size*0.6);
    if(planet.name === 'Uranus'){
      g.addColorStop(0,'#a0ffff'); g.addColorStop(0.5,'#50d0d0'); g.addColorStop(1,'#108888');
    } else {
      g.addColorStop(0,'#6680ee'); g.addColorStop(0.5,'#3344aa'); g.addColorStop(1,'#101860');
    }
    ctx.fillStyle = g; ctx.fillRect(0,0,size,size);
    for(let i=0;i<6;i++){
      const y = (size/6)*i + size*0.1;
      ctx.strokeStyle=`rgba(255,255,255,0.05)`; ctx.lineWidth=20;
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(size,y); ctx.stroke();
    }
  } else {
    ctx.fillStyle = planet.color; ctx.fillRect(0,0,size,size);
  }

  for(let i=0;i<2000;i++){
    const x=Math.random()*size, y=Math.random()*size;
    const bright = Math.random()>0.5 ? 'rgba(255,255,255,' : 'rgba(0,0,0,';
    ctx.fillStyle = bright + (Math.random()*0.04) + ')';
    ctx.fillRect(x,y,1,1);
  }

  return new THREE.CanvasTexture(canvas);
}

function shiftColor(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0,Math.min(255,((n>>16)&0xff)+amt));
  const g = Math.max(0,Math.min(255,((n>>8)&0xff)+amt));
  const b = Math.max(0,Math.min(255,(n&0xff)+amt));
  return `rgb(${r},${g},${b})`;
}

function createRingTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 1;
  const ctx = canvas.getContext('2d');
  const g = ctx.createLinearGradient(0,0,512,0);
  g.addColorStop(0,   'rgba(0,0,0,0)');
  g.addColorStop(0.05,'rgba(200,180,120,0.1)');
  g.addColorStop(0.1, 'rgba(210,190,130,0.5)');
  g.addColorStop(0.15,'rgba(180,160,100,0.3)');
  g.addColorStop(0.2, 'rgba(220,200,140,0.7)');
  g.addColorStop(0.28,'rgba(190,170,110,0.4)');
  g.addColorStop(0.33,'rgba(0,0,0,0)');
  g.addColorStop(0.38,'rgba(210,190,130,0.6)');
  g.addColorStop(0.45,'rgba(230,210,150,0.8)');
  g.addColorStop(0.5, 'rgba(210,185,125,0.6)');
  g.addColorStop(0.55,'rgba(190,170,110,0.4)');
  g.addColorStop(0.6, 'rgba(0,0,0,0)');
  g.addColorStop(0.65,'rgba(200,180,120,0.5)');
  g.addColorStop(0.72,'rgba(215,195,135,0.7)');
  g.addColorStop(0.78,'rgba(195,175,115,0.5)');
  g.addColorStop(0.85,'rgba(180,160,100,0.3)');
  g.addColorStop(0.9, 'rgba(0,0,0,0)');
  g.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,512,1);
  return new THREE.CanvasTexture(canvas);
}

function createSunTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(256,256,0,256,256,256);
  g.addColorStop(0,   '#fff8e0');
  g.addColorStop(0.3, '#ffe050');
  g.addColorStop(0.6, '#ff9800');
  g.addColorStop(0.8, '#ff5500');
  g.addColorStop(1,   '#ff200000');
  ctx.fillStyle = g; ctx.fillRect(0,0,512,512);
  for(let i=0;i<8;i++){
    const x=160+Math.random()*180, y=160+Math.random()*180, r=5+Math.random()*18;
    const sg = ctx.createRadialGradient(x,y,0,x,y,r);
    sg.addColorStop(0,'rgba(80,30,0,0.6)'); sg.addColorStop(1,'rgba(80,30,0,0)');
    ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function OrbitLine({ distance, color, opacity = 0.12 }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * distance, 0, Math.sin(a) * distance));
    }
    return pts;
  }, [distance]);
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <line geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  );
}

function Moon({ parentRadius, speedMultiplier }) {
  const ref = useRef();
  const tex = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#c8c8c8'; ctx.fillRect(0,0,128,128);
    for(let i=0;i<80;i++){
      const x=Math.random()*128, y=Math.random()*128, r=1+Math.random()*6;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
      ctx.fillStyle=`rgba(80,80,80,${0.2+Math.random()*0.4})`; ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);
  const dist = parentRadius + 2;
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 2 * speedMultiplier;
    ref.current.position.set(Math.cos(t)*dist, 0, Math.sin(t)*dist);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.27, 32, 32]} />
      <meshStandardMaterial map={tex} roughness={0.9} metalness={0} />
    </mesh>
  );
}

function Planet({ data, setFocused, setHovered, speedMultiplier }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const tex = useMemo(() => createPlanetTexture(data), [data.name]);
  const ringTex = useMemo(() => data.hasRings ? createRingTexture() : null, [data.hasRings]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * (data.speed / 30) * speedMultiplier + angleRef.current;
    groupRef.current.position.set(Math.cos(t)*data.distance, 0, Math.sin(t)*data.distance);
    meshRef.current.rotation.y += data.rotSpeed * speedMultiplier;
  });

  const tiltRad = (data.tilt || 0) * Math.PI / 180;

  return (
    <>
      <OrbitLine distance={data.distance} color={data.color} />
      <group ref={groupRef}>
        <group rotation={[0, 0, tiltRad]}>
          <mesh
            ref={meshRef}
            onClick={(e) => { e.stopPropagation(); setFocused({ ref: groupRef, planet: data }); }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(data); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(null); document.body.style.cursor = 'auto'; }}
          >
            <sphereGeometry args={[data.radius, 64, 64]} />
            <meshStandardMaterial
              map={tex}
              emissive={new THREE.Color(data.emissive)}
              emissiveIntensity={0.15}
              roughness={0.8}
              metalness={0.05}
            />
          </mesh>

          {data.atmosphere && (
            <mesh>
              <sphereGeometry args={[data.radius * data.atmosphere.scale, 64, 64]} />
              <meshStandardMaterial
                color={data.atmosphere.color}
                transparent
                opacity={data.atmosphere.opacity}
                side={THREE.BackSide}
                depthWrite={false}
              />
            </mesh>
          )}

          {data.hasRings && ringTex && (
            <>
              {[
                [data.radius*1.25, data.radius*1.85, 64],
                [data.radius*1.9,  data.radius*2.5,  64],
                [data.radius*2.55, data.radius*2.95, 64],
              ].map(([inner, outer, seg], i) => (
                <mesh key={i} rotation={[Math.PI/2, 0, 0]}>
                  <ringGeometry args={[inner, outer, seg]} />
                  <meshBasicMaterial
                    map={ringTex}
                    transparent
                    opacity={0.85 - i*0.12}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                  />
                </mesh>
              ))}
            </>
          )}

          {data.name === 'Uranus' && (
            <mesh rotation={[0, 0, Math.PI/2]}>
              <ringGeometry args={[data.radius*1.5, data.radius*1.8, 64]} />
              <meshBasicMaterial color="#88dddd" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
          )}
        </group>
        {data.hasMoon && <Moon parentRadius={data.radius} speedMultiplier={speedMultiplier} />}
      </group>
    </>
  );
}

function Sun({ setFocused, setHovered }) {
  const sunRef = useRef();
  const glowRef = useRef();
  const coronaRef = useRef();
  const tex = useMemo(() => createSunTexture(), []);

  useFrame(({ clock }) => {
    sunRef.current.rotation.y += 0.001;
    const s = 1 + Math.sin(clock.getElapsedTime() * 0.8) * 0.015;
    glowRef.current.scale.setScalar(s * 1.15);
    const s2 = 1 + Math.sin(clock.getElapsedTime() * 0.5 + 1) * 0.02;
    coronaRef.current.scale.setScalar(s2 * 1.35);
  });

  return (
    <group
      onClick={(e) => { e.stopPropagation(); setFocused({ ref: { current: new THREE.Object3D() }, planet: { name: 'Sun', details: 'Our star • 1.4M km diameter • 4.6 billion years old' } }); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered({ name: 'Sun', details: 'Our star' }); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(null); document.body.style.cursor = 'auto'; }}
    >
      <pointLight intensity={600} distance={600} decay={1.2} color="#fff4e0" />
      <pointLight intensity={200} distance={300} decay={2} color="#ff9900" />

      <mesh ref={coronaRef}>
        <sphereGeometry args={[5.5, 32, 32]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[4.8, 32, 32]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>

      <mesh ref={sunRef}>
        <sphereGeometry args={[4, 64, 64]} />
        <meshBasicMaterial map={tex} />
      </mesh>
    </group>
  );
}

function CameraController({ focused }) {
  const ctrlRef = useRef();
  const target = useRef(new THREE.Vector3());
  useFrame(() => {
    if (focused?.ref?.current && ctrlRef.current) {
      const pos = new THREE.Vector3();
      focused.ref.current.getWorldPosition(pos);
      target.current.lerp(pos, 0.04);
      ctrlRef.current.target.copy(target.current);
      ctrlRef.current.update();
    }
  });
  return <OrbitControls ref={ctrlRef} enableZoom enablePan maxDistance={250} minDistance={2} />;
}

function AsteroidBelt() {
  const meshRef = useRef();
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 1200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 33 + (Math.random() - 0.5) * 4;
      const y = (Math.random() - 0.5) * 1.5;
      pos[i*3] = Math.cos(angle)*r;
      pos[i*3+1] = y;
      pos[i*3+2] = Math.sin(angle)*r;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  return (
    <points ref={meshRef} geometry={geo}>
      <pointsMaterial color="#aaaaaa" size={0.15} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

function Scene({ setFocused, setHovered, speed, focused }) {
  return (
    <>
      <ambientLight intensity={0.08} />
      <Stars radius={200} depth={60} count={8000} factor={6} saturation={0.5} fade speed={0.5} />
      <CameraController focused={focused} />
      <Sun setFocused={setFocused} setHovered={setHovered} />
      <AsteroidBelt />
      {PLANETS.map((p, i) => (
        <Planet key={i} data={p} setFocused={setFocused} setHovered={setHovered} speedMultiplier={speed} />
      ))}
    </>
  );
}

export default function Space() {
  const [focused, setFocused] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [speed, setSpeed] = useState(1);
  const [showLegend, setShowLegend] = useState(false);

  const glassEffect = "bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10"
    >
      <div className={`w-full rounded-[2rem] p-4 md:p-8 ${glassEffect} relative`}>
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 px-2">
          <div>
            <div className="text-[10px] md:text-xs tracking-[4px] text-cyan-400 mb-1 uppercase">
              ✦ Helios Observatory
            </div>
            <div className="text-3xl md:text-4xl font-extrabold tracking-wide bg-gradient-to-br from-white via-cyan-300 to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              SOLAR SYSTEM
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowLegend(v => !v)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider border transition-all duration-300 ${
                showLegend ? 'bg-cyan-500/30 border-cyan-400' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
              }`}
            >
              PLANETS
            </button>
            <button
              onClick={() => setFocused(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wider bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all duration-300"
            >
              FREE CAM
            </button>
          </div>
        </div>

        <div className="w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden border border-white/10 bg-[#020205] shadow-[inset_0_0_80px_rgba(0,0,0,1)] relative">
          
          {showLegend && (
            <div className="absolute top-4 left-4 z-10 bg-black/60 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
              <div className="text-[10px] tracking-[3px] text-cyan-400 mb-3">SOLAR BODIES</div>
              {[{ name:'Sun', color:'#ffaa44' }, ...PLANETS].map((p, i) => (
                <div key={i} className="flex items-center gap-3 mb-2">
                  <div style={{ background: p.color, boxShadow: `0 0 6px ${p.color}80` }} className="w-2.5 h-2.5 rounded-full" />
                  <span className="text-[11px] text-gray-300 tracking-wide">{p.name}</span>
                </div>
              ))}
            </div>
          )}

          {hovered && (
            <div className="absolute top-4 right-4 z-10 bg-black/60 border border-cyan-500/30 rounded-2xl p-4 max-w-[200px] backdrop-blur-md pointer-events-none">
              <div className="text-[10px] tracking-[3px] text-cyan-400 mb-2">HOVER</div>
              <div className="text-lg font-bold text-white mb-2">{hovered.name}</div>
              {hovered.details && (
                <div className="text-[10px] text-gray-400 leading-relaxed">
                  {hovered.details.split('•').map((d, i) => (
                    d.trim() && <div key={i} className="mb-1"><span className="text-cyan-400 mr-2">◆</span>{d.trim()}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {focused && (
            <div className="absolute bottom-20 right-4 md:right-8 z-10 bg-black/70 border border-cyan-500/40 rounded-3xl p-5 max-w-[240px] backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.15)]">
              <div className="text-[10px] tracking-[3px] text-cyan-400 mb-2">FOCUSED</div>
              <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 mb-3">
                {focused.planet.name}
              </div>
              {focused.planet.details && (
                <div className="mb-4">
                  {focused.planet.details.split('•').map((d, i) => d.trim() && (
                    <div key={i} className="flex gap-2 text-[11px] text-gray-300 leading-relaxed mb-1.5">
                      <span className="text-cyan-400">◆</span>
                      <span>{d.trim()}</span>
                    </div>
                  ))}
                </div>
              )}
              <button 
                onClick={() => setFocused(null)}
                className="w-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 rounded-xl py-2 text-[10px] tracking-[2px] hover:bg-cyan-500/40 transition-colors"
              >
                RELEASE ✕
              </button>
            </div>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-black/60 border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-4 backdrop-blur-md">
            <div className="text-[10px] text-cyan-400 tracking-[2px] hidden md:block">ORBIT SPEED</div>
            <input
              type="range" min={0} max={5} step={0.05} value={speed}
              onChange={e => setSpeed(parseFloat(e.target.value))}
              className="w-24 md:w-32 accent-cyan-400"
            />
            <div className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 min-w-[40px] text-center">
              {speed.toFixed(1)}×
            </div>
          </div>

          <div className="absolute bottom-6 left-4 md:left-6 z-10 text-[9px] text-gray-500 tracking-[2px] leading-relaxed pointer-events-none hidden md:block">
            DRAG TO ROTATE · SCROLL TO ZOOM<br/>
            CLICK PLANET TO FOCUS
          </div>

          <Canvas camera={{ position: [0, 45, 90], fov: 45 }} gl={{ antialias: true, alpha: false }} onPointerMissed={() => setFocused(null)}>
            <Scene setFocused={setFocused} setHovered={setHovered} speed={speed} focused={focused} />
          </Canvas>
        </div>

      </div>
    </motion.div>
  );
}
