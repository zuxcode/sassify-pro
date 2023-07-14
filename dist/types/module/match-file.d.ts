export default class MatchFilePath {
    static matchFile(sourcePattern: string, cb: (error: Error | null, result: string[] | null) => void, excludePattern?: RegExp): Promise<void>;
}
export declare const matchFile: typeof MatchFilePath.matchFile;
