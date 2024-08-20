import { Readable } from "stream";
import * as fs from "fs";
import { MerkleTree } from "merkletreejs";

export interface DataIntegrityTreeOptions {
    storeDir?: string;
    storageMode?: "local" | "unified";
    disableInitialize?: boolean;
}

export declare class DataIntegrityTree {
    private storeId: string;
    private storeBaseDir: string;
    private storeDir: string;
    private dataDir: string;
    public files: Map<string, { hash: string; sha256: string }>;
    private tree: MerkleTree;

    constructor(storeId: string, options?: DataIntegrityTreeOptions);

    private _loadManifest(): string[];
    private _loadLatestTree(): MerkleTree;
    private _createWriteStream(sha256: string): fs.WriteStream;
    private _streamFile(src: string, dest: string): Promise<void>;
    private _rebuildTree(): void;

    public upsertKey(readStream: Readable, key: string): Promise<void>;
    public deleteKey(key: string): void;
    public listKeys(rootHash?: string | null): string[];
    public getRoot(): string;
    public serialize(rootHash?: string | null): object;
    public deserializeTree(rootHash: string): MerkleTree;
    public commit(): string;
    public clearPendingRoot(): void;
    public getValueStream(hexKey: string, rootHash?: string | null): Readable;
    public deleteAllLeaves(): void;
    public getProof(hexKey: string, sha256: string, rootHash?: string | null): string;
    public verifyProof(proofObjectHex: string, sha256: string): boolean;
    public getRootDiff(rootHash1: string, rootHash2: string): { added: Map<string, string>; deleted: Map<string, string> };
    public verifyKeyIntegrity(sha256: string, rootHash: string): Promise<boolean>;
}

export function toHex(str: string): string;
export function removeEmptyDirectories(dir: string): void;
export function isHexString(str: string): boolean;
