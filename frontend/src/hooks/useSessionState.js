import { useState, useEffect } from "react";

// Hook para armazenar estado no sessionStorage
function useSessionState(key, defaultValue) {
	const [state, setState] = useState(() => {
		try {
			const stored = sessionStorage.getItem(key);
			return stored ? JSON.parse(stored) : defaultValue;
		} catch (e) {
			console.error("Failed to parse sessionStorage value:", e);
			return defaultValue;
		}
	});

	useEffect(() => {
		sessionStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);

	return [state, setState];
}


export default useSessionState;
