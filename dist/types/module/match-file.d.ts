export default class MatchFilePath {
    static matchFile(sourcePattern: string, cb: (error: Error, result: string[]) => void, excludePattern?: RegExp): Promise<void>;
}
export declare const matchFile: typeof MatchFilePath.matchFile;
