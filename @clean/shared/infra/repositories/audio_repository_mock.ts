import { IAudioRepository } from "@/@clean/modules/interfaces/audio_repo_interface";

export class AudioRepositoryMock implements IAudioRepository {
    transcribeAudio(audioFile: Buffer): Promise<string> {
        throw new Error("Method not implemented.");
    }
}