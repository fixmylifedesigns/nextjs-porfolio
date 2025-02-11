import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Create a dynamic import for the Background component
const Background = dynamic(() => Promise.resolve(() => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Import Three.js only on client side
    const THREE = require('three');
    let scene, camera, renderer;
    let uniforms;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      
      renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
          vec2 st = gl_FragCoord.xy/resolution.xy;
          float noise = random(st + time * 0.1);
          gl_FragColor = vec4(vec3(noise * 0.1), 1.0);
        }
      `;

      uniforms = {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      if (uniforms) {
        uniforms.time.value += 0.01;
      }
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    init();
    animate();

    const handleResize = () => {
      if (renderer && uniforms) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 bg-black" />;
}), {
  ssr: false // This is important - disable server-side rendering for this component
});

export default Background;