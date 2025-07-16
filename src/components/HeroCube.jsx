import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Cube({ position, size = 2 }) {
    const mesh = useRef();
    const [hovered, setHovered] = useState(false);

    // Enhanced rotation for centered layout
    useFrame((state, delta) => {
        if (!hovered && mesh.current) {
            mesh.current.rotation.x += delta * 0.3;
            mesh.current.rotation.y += delta * 0.4;
            mesh.current.rotation.z += delta * 0.1;
        }
    });

    return (
        <group position={position}>
            <mesh
                ref={mesh}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={hovered ? 1.05 : 1}
            >
                <boxGeometry args={[size, size, size]} />
                {[...Array(6)].map((_, index) => (
                    <meshBasicMaterial
                        key={index}
                        attach={`material-${index}`}
                        color={index % 2 === 0 ? '#C44AD4' : '#CBFF9D'}
                    />
                ))}
            </mesh>
        </group>
    );
}

// Modified to be simpler and faster to load
function SceneLoader({ onLoaded }) {
    const { gl } = useThree();

    useEffect(() => {
        if (!gl) return;

        // Signal that scene is ready
        const timeout = setTimeout(() => {
            if (onLoaded) onLoaded();
        }, 100);

        return () => {
            clearTimeout(timeout);
        };
    }, [gl, onLoaded]);

    return null;
}

export default function HeroCube({ onLoaded }) {
    const [hasError, setHasError] = useState(false);

    // Custom error handler
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
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    dpr={[0.5, 1]}
                    gl={{
                        powerPreference: "low-power",
                        antialias: false,
                        alpha: true, // Enable transparency
                        stencil: false,
                        depth: true
                    }}
                    style={{ 
                        outline: 'none',
                        background: 'transparent' // Ensure no background color
                    }}
                >
                    <SceneLoader onLoaded={onLoaded} />
                    <ambientLight intensity={0.7} />

                    <Cube position={[0, 0, 0]} />

                    <OrbitControls
                        enablePan={false}
                        enableZoom={false}
                        minPolarAngle={Math.PI / 6}
                        maxPolarAngle={Math.PI - Math.PI / 6}
                        autoRotate={true}
                        autoRotateSpeed={0.5}
                    />
                </Canvas>
            </ErrorBoundary>
        </div>
    );
}

// Error boundary component
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

// Fallback content if WebGL fails
function FallbackContent() {
    return (
        <div className="w-full h-full flex items-center justify-center ">
            <div className="text-center p-6">
                <div className="text-6xl mb-4">👨‍💻</div>
                <p className="text-lg font-medium mb-2">3D Experience Unavailable</p>
                <p className="text-sm">Your browser may not support WebGL</p>
            </div>
        </div>
    );
}
