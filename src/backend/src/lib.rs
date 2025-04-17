use candid::{CandidType, Deserialize};
use ic_cdk_macros::*;
use serde::Serialize;
use std::collections::HashMap;
use std::cell::RefCell;

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct ProductStage {
    stage_id: String,
    timestamp: u64,
    location: String,
    description: String,
    certifications: Vec<String>,
    handler: String,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Product {
    product_id: String,
    name: String,
    description: String,
    stages: Vec<ProductStage>,
    qr_code: String,
    created_at: u64,
    updated_at: u64,
}

thread_local! {
    static PRODUCTS: RefCell<HashMap<String, Product>> = RefCell::new(HashMap::new());
}

#[update]
fn add_product(name: String, description: String) -> String {
    let product_id = generate_product_id(&name);
    let timestamp = ic_cdk::api::time();
    let qr_code = generate_qr_code(&product_id);
    
    let product = Product {
        product_id: product_id.clone(),
        name,
        description,
        stages: Vec::new(),
        qr_code,
        created_at: timestamp,
        updated_at: timestamp,
    };

    PRODUCTS.with(|products| {
        products.borrow_mut().insert(product_id.clone(), product);
    });

    product_id
}

#[update]
fn add_stage(product_id: String, location: String, description: String, certifications: Vec<String>, handler: String) -> bool {
    let timestamp = ic_cdk::api::time();
    let stage_id = format!("{}_{}", product_id, timestamp);
    
    let stage = ProductStage {
        stage_id,
        timestamp,
        location,
        description,
        certifications,
        handler,
    };

    PRODUCTS.with(|products| {
        if let Some(product) = products.borrow_mut().get_mut(&product_id) {
            product.stages.push(stage);
            product.updated_at = timestamp;
            true
        } else {
            false
        }
    })
}

#[query]
fn get_product(product_id: String) -> Option<Product> {
    PRODUCTS.with(|products| {
        products.borrow().get(&product_id).cloned()
    })
}

#[query]
fn get_product_history(product_id: String) -> Vec<ProductStage> {
    PRODUCTS.with(|products| {
        products
            .borrow()
            .get(&product_id)
            .map(|p| p.stages.clone())
            .unwrap_or_default()
    })
}

fn generate_product_id(name: &str) -> String {
    use sha2::{Sha256, Digest};
    let timestamp = ic_cdk::api::time().to_string();
    let mut hasher = Sha256::new();
    hasher.update(name.as_bytes());
    hasher.update(timestamp.as_bytes());
    hex::encode(&hasher.finalize()[..8])
}

fn generate_qr_code(product_id: &str) -> String {
    format!("https://app-domain.icp/product/{}", product_id)
} 