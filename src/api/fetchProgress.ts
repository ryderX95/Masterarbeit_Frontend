const API_BASE_URL = "http://localhost:8000"; // ✅ Ensure correct backend URL

export const fetchProgress = async (userId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/challenges/progress`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching progress:", error);
        return { error: "Failed to fetch progress." };
    }
};

export const submitAnswer = async (userId: string, taskId: string, answer: string) => {
    const trimmedAnswer = answer.trim(); // ✅ Ensure no leading/trailing spaces

    console.log("📤 Sending answer:", trimmedAnswer); // ✅ Debugging Log

    try {
        const response = await fetch("http://localhost:8000/challenges/progress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ user_id: userId, task_id: taskId, answer: trimmedAnswer }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        console.log("📥 Server Response:", result); // ✅ Log backend response
        return result;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return { correct: false, message: "Error communicating with the server." };
    }
};
