import { TranscribeAudioResponse } from "@/@clean/shared/domain/types/audio_responses";
import { httpUser } from "@/@clean/shared/infra/http";
import { AudioRepositoryHttp } from "@/@clean/shared/infra/repositories/audio_repository_http";
import { createContext } from "react";

type AudioContextType = {
    transcribe: (audioFile: Buffer) => Promise<TranscribeAudioResponse>;
}

const defaultAudioContext: AudioContextType = {
    transcribe: async (audioFile: Buffer) => {
        return { audio_transcribed: '' };
    }
}

export const AudioContext = createContext<AudioContextType>(defaultAudioContext);

export function AudioContextProvider({ children }: { children: React.ReactNode }) {
    const audioRepository = new AudioRepositoryHttp(httpUser);
    
    async function transcribe(audioFile: Buffer): Promise<TranscribeAudioResponse> {
        try {
            const result = await audioRepository.transcribeAudio(audioFile);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return (
        <AudioContext.Provider value={{ transcribe }}>
            {children}
        </AudioContext.Provider>
    );
}