import { IAudioRepository } from "@/@clean/modules/interfaces/audio_repo_interface";
import { AxiosInstance } from "axios";
import { TranscribeAudioResponse } from "../../domain/types/audio_responses";

export class AudioRepositoryHttp implements IAudioRepository {
    constructor(private readonly httpAudio: AxiosInstance) {}

    async transcribeAudio(audioFile: Buffer): Promise<TranscribeAudioResponse> {
        try {
            const response = await this.httpAudio.post('/transcribe-audio', audioFile, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data.audio_transcribed;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}