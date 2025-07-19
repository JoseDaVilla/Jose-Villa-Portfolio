import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function TechBorderCorners() {
    const borderLength = '15rem', borderThickness = '0.22rem', blur = '20px', glowColor = 'rgba(96,165,250)';
    return (
        <>
            {/* Top Left */}
            <div className="absolute top-0 left-0 z-5 "><div style={{width: borderLength, height: borderThickness, background: 'linear-gradient(90deg, #60a5fa 60%, transparent 100%)', borderRadius: '1rem 0 0 0', filter: `blur(${blur}) drop-shadow(0 0 8px ${glowColor})`, marginBottom: '-0.1rem'}} className="animate-pulse" /><div style={{width: borderThickness, height: borderLength, background: 'linear-gradient(180deg, #60a5fa 60%, transparent 100%)', borderRadius: '0 0 0 1rem', filter: `blur(${blur}) drop-shadow(0 0 8px ${glowColor})`, marginTop: '-0.1rem'}} className="animate-pulse" /></div>
            {/* Top Right */}
            <div className="absolute top-0 right-0 z-5 flex flex-col items-end"><div style={{width: borderLength, height: borderThickness, background: 'linear-gradient(270deg, #60a5fa 60%, transparent 100%)', borderRadius: '0 1rem 0 0', filter: `blur(${blur}) drop-shadow(0 0 8px ${glowColor})`, marginBottom: '-0.1rem'}} className="animate-pulse" /><div style={{width: borderThickness, height: borderLength, background: 'linear-gradient(180deg, #60a5fa 60%, transparent 100%)', borderRadius: '0 0 1rem 0', filter: `blur(${blur}) drop-shadow(0 0 8px ${glowColor})`, marginTop: '-0.1rem'}} className="animate-pulse" /></div>
            {/* Bottom Left */}
            <div className="absolute bottom-0 left-0 z-5 flex flex-col"><div style={{width: borderThickness, height: borderLength, background: 'linear-gradient(0deg, #60a5fa 60%, transparent 100%)', borderRadius: '0 0 0 1rem', filter: `blur(${blur}) drop-shadow(0 0 8px ${glowColor})`, marginBottom: '-0.1rem'}} className="animate-pulse" /><div style={{width: borderLength, height: borderThickness, background: 'linear-gradient(90deg, #60a5fa 60%, transparent 100%)', borderRadius: '0 0 0 1rem', filter: `blur(${blur}) drop-shadow(0 0 8px ${glowColor})`, marginTop: '-0.1rem'}} className="animate-pulse" /></div>
            {/* Bottom Right */}
            <div className="absolute bottom-0 right-0 z-5 flex flex-col items-end"><div style={{width: borderThickness, height: borderLength, background: 'linear-gradient(0deg, #60a5fa 60%, transparent 100%)', borderRadius: '0 0 1rem 0', filter: `blur(${blur}) drop-shadow(0 0 8px ${glowColor})`, marginBottom: '-0.1rem'}} className="animate-pulse" /><div style={{width: borderLength, height: borderThickness, background: 'linear-gradient(270deg, #60a5fa 60%, transparent 100%)', borderRadius: '0 0 1rem 0', filter: `blur(${blur}) drop-shadow(0 0 8px ${glowColor})`, marginTop: '-0.1rem'}} className="animate-pulse" /></div>
        </>
    );
}


function Particles({ radius, color, position }) {
    const pointsRef = useRef();
    // Responsive particle count based on screen size
    const getParticleCount = () => {
        const w = window.innerWidth;
        if (w < 768) return 90;
        if (w < 1280) return 140;
        return 180;
    };
    const [particleCount, setParticleCount] = useState(getParticleCount());

    useEffect(() => {
        const handleResize = () => setParticleCount(getParticleCount());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const positions = useMemo(() => {
        const arr = [];
        // Responsive gap based on radius and screen size
        const w = window.innerWidth;
        let gapBase = 0.35, gapRand = 2;
        if (w < 768) { gapBase = 0.18; gapRand = 1.1; }
        else if (w < 1280) { gapBase = 0.28; gapRand = 1.5; }
        for (let i = 0; i < particleCount; i++) {
            const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
            const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
            const r = radius + gapBase + Math.random() * gapRand;
            arr.push(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            );
        }
        return new Float32Array(arr);
    }, [radius, particleCount]);

    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.getElapsedTime() * 0.18;
            pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.12) * 0.2;
            pointsRef.current.position.copy(position);
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={radius * 0.025}
                color={color}
                transparent
                opacity={0.7}
                sizeAttenuation
            />
        </points>
    );
}

export default function SectionSphere({ activeSection, mouse }) {
    const meshRef = useRef();
    const materialRef = useRef();
    const [radius, setRadius] = useState(getResponsiveRadius());

    // Responsive radius calculation
    function getResponsiveRadius() {
        const w = window.innerWidth;
        if (w < 768) return 1.5;
        if (w < 1280) return 2.3;
        return 3.2;
    }

    useEffect(() => {
        const handleResize = () => setRadius(getResponsiveRadius());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- Define positions, colors, and target rotations for each section ---
    const sectionProps = useMemo(() => {
        const w = window.innerWidth;
        // Responsive positions for sections
        const offset = w < 768 ? 1.8 : w < 1280 ? 2.6 : 3.5;
        return {
            hero:       { pos: new THREE.Vector3(0, 0, 0), color: new THREE.Color('#60a5fa'), rot: new THREE.Euler(0, 0, 0) },
            experience: { pos: new THREE.Vector3(offset, -0.7, 0), color: new THREE.Color('#a855f7'), rot: new THREE.Euler(0.2, 0.8, 0.1) },
            projects:   { pos: new THREE.Vector3(-offset, 0, 0), color: new THREE.Color('#22d3ee'), rot: new THREE.Euler(-0.3, -0.7, 0.2) },
            skills:     { pos: new THREE.Vector3(0, 0, 0), color: new THREE.Color('#f59e42'), rot: new THREE.Euler(0.5, 0.2, -0.2) },
            aboutme:    { pos: new THREE.Vector3(offset, 0, 0), color: new THREE.Color('#10b981'), rot: new THREE.Euler(-0.2, 0.5, 0.3) },
            contact:    { pos: new THREE.Vector3(0, -0.7, 0), color: new THREE.Color('#ef4444'), rot: new THREE.Euler(0.7, -0.3, 0.5) },
        };
    }, []);

    // --- Animation loop ---
    useFrame((state, delta) => {
        const { clock, camera } = state;
        const targetProps = sectionProps[activeSection] || sectionProps.hero;

        // Animate position smoothly
        meshRef.current.position.lerp(targetProps.pos, 0.03);

        // Animate color smoothly
        materialRef.current.uniforms.u_color.value.lerp(targetProps.color, 0.03);
        materialRef.current.uniforms.u_glow_color.value.lerp(targetProps.color, 0.03);
        materialRef.current.uniforms.u_highlight_color.value.lerp(targetProps.color, 0.03);

        // Animate rotation smoothly between sections
        if (activeSection === 'hero') {
            const targetRotationY = mouse.x * Math.PI * 0.2;
            const targetRotationX = mouse.y * Math.PI * 0.2;
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.05);
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05);
        } else {
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetProps.rot.x, 0.05);
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetProps.rot.y, 0.05);
            meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetProps.rot.z, 0.05);
        }

        // Update shader uniforms
        materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
        materialRef.current.uniforms.u_cameraPosition.value.copy(camera.position);
        if(activeSection === 'hero') {
            materialRef.current.uniforms.u_mouse.value.x = (mouse.x + 1) / 4;
            materialRef.current.uniforms.u_mouse.value.y = (mouse.y + 1) / 4;
        }
    });

    const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 0 },
            u_color: { value: new THREE.Color('#60a5fa') },
            u_glow_color: { value: new THREE.Color('#60a5fa') },
            u_highlight_color: { value: new THREE.Color('#60a5fa') },
            u_cameraPosition: { value: new THREE.Vector3() },
            u_mouse: { value: new THREE.Vector2(0.5, 0.5) }
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vWorldPosition;
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float u_time;
            uniform vec3 u_color;
            uniform vec3 u_glow_color;
            uniform vec3 u_highlight_color;
            uniform vec3 u_cameraPosition;
            uniform vec2 u_mouse;
            varying vec3 vWorldPosition;
            varying vec2 vUv;
            varying vec3 vNormal;

            float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }

            void main() {
                float glitch = smoothstep(0.95, 1.0, sin(vUv.y * 20.0 + u_time * 2.0));
                vec2 distortedUv = vUv;
                distortedUv.x += (random(vec2(u_time, vUv.y)) - 0.5) * 0.1 * glitch;

                float mouse_dist = distance(vUv, u_mouse);
                float mouse_highlight = smoothstep(0.3, 0.0, mouse_dist) * 2.0;

                float grid = 0.0;
                vec2 grid_uv = fract(distortedUv * 10.0);
                grid = max(smoothstep(0.05, 0.0, grid_uv.x), smoothstep(0.95, 1.0, grid_uv.x));
                grid = max(grid, smoothstep(0.05, 0.0, grid_uv.y));
                grid = max(grid, smoothstep(0.95, 1.0, grid_uv.y));
                
                vec3 final_color = u_color * grid * 0.5;

                float grid2 = 0.0;
                vec2 grid2_uv = fract(distortedUv * 7.0 + u_time * 0.1);
                grid2 = max(smoothstep(0.02, 0.0, grid2_uv.x), smoothstep(0.98, 1.0, grid2_uv.x));
                grid2 = max(grid2, smoothstep(0.02, 0.0, grid2_uv.y));
                grid2 = max(grid2, smoothstep(0.98, 1.0, grid2_uv.y));
                final_color += u_color * grid2 * 0.5;

                float alpha = max(grid * 0.5, grid2 * 0.3);
                vec3 viewDirection = normalize(u_cameraPosition - vWorldPosition);
                float fresnel = 1.0 - dot(viewDirection, normalize(vNormal));
                fresnel = pow(fresnel, 2.0);
                alpha = max(alpha, fresnel * 0.4);

                final_color += u_highlight_color * mouse_highlight * 0.4;
                alpha += mouse_highlight * 0.2;

                gl_FragColor = vec4(final_color, alpha);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    }), []);

    // Get current color for particles
    const particleColor = sectionProps[activeSection]?.color || sectionProps.hero.color;

    // Get sphere position for particles
    const spherePosition = meshRef.current?.position || new THREE.Vector3(0, 0, 0);

    return (
        <>
            <mesh ref={meshRef}>
                <sphereGeometry args={[radius, 128, 128]} />
                <primitive object={shaderMaterial} ref={materialRef} attach="material" />
            </mesh>
            <Particles radius={radius} color={particleColor} position={spherePosition} />
        </>
    );
}