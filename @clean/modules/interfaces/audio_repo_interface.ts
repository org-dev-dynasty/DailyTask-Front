import { TranscribeAudioResponse } from "@/@clean/shared/domain/types/audio_responses";

export interface IAudioRepository {
    transcribeAudio(audioFile: Buffer): Promise<TranscribeAudioResponse>;
}