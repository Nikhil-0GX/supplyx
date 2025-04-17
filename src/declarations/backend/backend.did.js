export const idlFactory = ({ IDL }) => {
  const ProductStage = IDL.Record({
    'handler' : IDL.Text,
    'description' : IDL.Text,
    'timestamp' : IDL.Nat64,
    'certifications' : IDL.Vec(IDL.Text),
    'stage_id' : IDL.Text,
    'location' : IDL.Text,
  });
  const Product = IDL.Record({
    'stages' : IDL.Vec(ProductStage),
    'updated_at' : IDL.Nat64,
    'product_id' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'created_at' : IDL.Nat64,
    'qr_code' : IDL.Text,
  });
  return IDL.Service({
    'add_product' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'add_stage' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Vec(IDL.Text), IDL.Text],
        [IDL.Bool],
        [],
      ),
    'get_product' : IDL.Func([IDL.Text], [IDL.Opt(Product)], ['query']),
    'get_product_history' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(ProductStage)],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
