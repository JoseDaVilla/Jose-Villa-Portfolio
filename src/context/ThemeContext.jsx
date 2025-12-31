import { createContext, useContext, useEffect, useMemo } from 'react';

const ThemeContext = createContext({ theme: 'dark' });

export function ThemeProvider({ children }) {
    useEffect(() => {
        // Always set dark mode
        if (typeof document !== 'undefined') {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const value = useMemo(() => ({ theme: 'dark' }), []);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export default ThemeContext;
