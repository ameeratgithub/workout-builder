import { GoogleGenAI } from '@google/genai';
import { Week } from '@/features/workout-generator/types';
import 'server-only';

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_STUDIO_API_KEY });

const workoutSchema = {
    type: 'ARRAY',
    items: {
        type: 'OBJECT',
        properties: {
            id: { type: 'NUMBER', description: 'Week number (1, 2, etc)' },
            days: {
                type: 'ARRAY',
                items: {
                    type: 'OBJECT',
                    properties: {
                        title: {
                            type: 'STRING',
                            description: "e.g., 'Upper Body Power'",
                        },
                        shouldRest: { type: 'BOOLEAN' },
                        exercises: {
                            type: 'ARRAY',
                            items: {
                                type: 'OBJECT',
                                properties: {
                                    id: {
                                        type: 'STRING',
                                        description: 'Unique string ID',
                                    },
                                    circuit: {
                                        type: 'STRING',
                                        description:
                                            "Group tag like 'A', 'B' or 'Warmup'",
                                    },
                                    name: { type: 'STRING' },
                                    sets: { type: 'NUMBER' },
                                    reps: {
                                        type: 'ARRAY',
                                        items: { type: 'NUMBER' },
                                        description:
                                            'Array of reps per set, e.g., [10, 10, 10]',
                                    },
                                    notes: { type: 'STRING', nullable: true },
                                },
                                required: [
                                    'id',
                                    'circuit',
                                    'name',
                                    'sets',
                                    'reps',
                                    'notes',
                                ],
                            },
                        },
                    },
                    required: ['title', 'shouldRest', 'exercises'],
                },
            },
        },
        required: ['id', 'days'],
    },
};

export const getWorkoutPlan = async (prompt: string): Promise<Week[]> => {
    try {
        const response = await genAI.models.generateContent({
            // "gemini-3-pro-preview"
            model: 'gemini-2.5-flash',
            config: {
                responseMimeType: 'application/json',
                responseSchema: workoutSchema,
            },
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: `
                You are an expert strength and conditioning coach.
                Create a workout plan based on the user's request.

                Rules:
                1. Group exercises into circuits (e.g., "Warmup", "A", "B", "C") where logical.
                2. Ensure rest days are placed strategically for recovery.
                3. For 'reps', provide an array of numbers matching the number of 'sets'.
                4. 'notes' should be short cues (e.g., "Explosive concentric", "Slow negative").
                5. Generate unique string IDs for every exercise.

                User Request: ${prompt}
              `,
                        },
                    ],
                },
            ],
        });

        const responseText = response.text;

        if (!responseText) {
            throw new Error('AI returned empty response');
        }

        const data = JSON.parse(responseText);

        return data as Week[];
    } catch (error) {
        console.error('AI Generation Error:', error);
        throw new Error('Failed to generate workout plan');
    }
};
