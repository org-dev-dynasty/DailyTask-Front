import { TranscribeAudioResponse } from "@/@clean/shared/domain/types/audio_responses";
import { IAudioRepository } from "../interfaces/audio_repo_interface";

export class TranscribeAudioUseCase {
    constructor(private readonly audio_repo: IAudioRepository) {}

    async execute(audioFile: Buffer): Promise<TranscribeAudioResponse> {
        return await this.audio_repo.transcribeAudio(audioFile);
    }
}