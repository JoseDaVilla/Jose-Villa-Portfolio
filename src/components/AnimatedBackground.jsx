import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';


function generatePoints(count = 5000, radius = 20) {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const primaryColor = new THREE.Color('#f2f2f2');
    const secondaryColor = new THREE.Color('#f2f2f2');

    for (let i = 0; i < count; i++) {
        
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const distance = Math.random() * radius;

        const x = distance * Math.sin(phi) * Math.cos(theta);
        const y = distance * Math.sin(phi) * Math.sin(theta);
        const z = distance * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        
        const colorBlend = Math.random();
        const color = new THREE.Color().lerpColors(primaryColor, secondaryColor, colorBlend);

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
}


function ParticleField({ count = 5000, mousePosition }) {
    const pointsRef = useRef();
    const { camera } = useThree();

    
    const { positions, colors } = generatePoints(count);

    
    const originalPositionsRef = useRef(positions.slice());

    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        
        pointsRef.current.rotation.x += delta * 0.03;
        pointsRef.current.rotation.y += delta * 0.04;

        
        if (mousePosition) {
            
            const rotX = (mousePosition.y - 0.5) * 0.2;
            const rotY = (mousePosition.x - 0.5) * 0.2;

            
            pointsRef.current.rotation.x = THREE.MathUtils.lerp(
                pointsRef.current.rotation.x,
                pointsRef.current.rotation.x + rotX,
                0.1
            );
            pointsRef.current.rotation.y = THREE.MathUtils.lerp(
                pointsRef.current.rotation.y,
                pointsRef.current.rotation.y + rotY,
                0.1
            );
        }

        
        try {
            const positionAttribute = pointsRef.current.geometry.attributes.position;
            if (positionAttribute && positionAttribute.array && originalPositionsRef.current) {
                const positions = positionAttribute.array;
                const originalPositions = originalPositionsRef.current;

                const time = state.clock.getElapsedTime();
                for (let i = 0; i < positions.length; i += 3) {
                    
                    if (i < originalPositions.length - 2) {
                        const x = originalPositions[i];
                        const y = originalPositions[i + 1];
                        const z = originalPositions[i + 2];

                        
                        positions[i] = x + Math.sin(time * 0.7 + x * 0.2) * 0.1;
                        positions[i + 1] = y + Math.sin(time * 0.8 + y * 0.2) * 0.1;
                        positions[i + 2] = z;
                    }
                }

                positionAttribute.needsUpdate = true;
            }
        } catch (error) {
            console.log("Animation error:", error);
            
        }
    });

    
    useFrame((state) => {
        if (mousePosition) {
            
            camera.position.x = THREE.MathUtils.lerp(
                camera.position.x,
                (mousePosition.x - 0.5) * 3 + Math.sin(state.clock.getElapsedTime() * 0.1) * 15,
                0.01
            );
            camera.position.z = THREE.MathUtils.lerp(
                camera.position.z,
                (mousePosition.y - 0.5) * 3 + Math.cos(state.clock.getElapsedTime() * 0.1) * 15,
                0.01
            );
            camera.lookAt(0, 0, 0);
        } else {
            
            camera.position.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 15;
            camera.position.z = Math.cos(state.clock.getElapsedTime() * 0.1) * 15;
            camera.lookAt(0, 0, 0);
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} colors={colors}>
            <PointMaterial
                transparent
                vertexColors
                size={0.15}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}


function SceneLoader({ onLoaded }) {
    const { gl } = useThree();

    useEffect(() => {
        if (!gl) return;

        
        const timeout = setTimeout(() => {
            if (onLoaded) onLoaded();
        }, 100);

        return () => {
            clearTimeout(timeout);
        };
    }, [gl, onLoaded]);

    return null;
}


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        if (this.props.onError) {
            this.props.onError(error);
        }
        console.error("WebGL error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}


function FallbackContent() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-6">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-lg font-medium mb-2">Background Animation Unavailable</p>
                <p className="text-sm">Your browser may not support WebGL</p>
            </div>
        </div>
    );
}

export default function AnimatedBackground({ onLoaded, mousePosition }) {
    const [hasError, setHasError] = useState(false);

    
    const handleError = (error) => {
        console.error("WebGL error:", error);
        setHasError(true);
    };

    if (hasError) {
        return <FallbackContent />;
    }

    return (
        <div className="w-full h-full">
            <ErrorBoundary onError={handleError} fallback={<FallbackContent />}>
                <Canvas
                    camera={{ position: [0, 0, 15], fov: 75 }}
                    dpr={[0.5, 1]}
                    gl={{
                        powerPreference: "low-power",
                        antialias: false,
                        alpha: true,
                        stencil: false,
                        depth: true
                    }}
                    style={{
                        outline: 'none',
                        background: 'transparent'
                    }}
                >
                    <SceneLoader onLoaded={onLoaded} />
                    <ambientLight intensity={0.5} />
                    <ParticleField mousePosition={mousePosition} />
                </Canvas>
            </ErrorBoundary>
        </div>
    );
}
