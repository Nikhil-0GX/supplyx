import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Product {
  'stages' : Array<ProductStage>,
  'updated_at' : bigint,
  'product_id' : string,
  'name' : string,
  'description' : string,
  'created_at' : bigint,
  'qr_code' : string,
}
export interface ProductStage {
  'handler' : string,
  'description' : string,
  'timestamp' : bigint,
  'certifications' : Array<string>,
  'stage_id' : string,
  'location' : string,
}
export interface _SERVICE {
  'add_product' : ActorMethod<[string, string], string>,
  'add_stage' : ActorMethod<
    [string, string, string, Array<string>, string],
    boolean
  >,
  'get_product' : ActorMethod<[string], [] | [Product]>,
  'get_product_history' : ActorMethod<[string], Array<ProductStage>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
