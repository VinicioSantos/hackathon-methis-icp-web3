use ic_cdk_macros::{init, query, update};
use std::cell::RefCell;
use candid::{CandidType, Principal};
use std::collections::HashMap;
use serde::{Deserialize, Serialize};

use ic_stable_structures::{StableBTreeMap, Storable};
use ic_stable_structures::memory_manager::{MemoryManager, VirtualMemory};



type Message = (String, String); // (sender, message)
type UserId = Principal;

#[derive(CandidType, Deserialize, Serialize, Clone)]
struct File {
    id: String,
    owner: UserId,
    recipient: UserId,
    content: Vec<u8>,
    metadata: String,
}

thread_local! {
    static MESSAGES: RefCell<Vec<Message>> = RefCell::new(Vec::new());
    static USERS: RefCell<HashMap<UserId, String>> = RefCell::new(HashMap::new());
    static FILES: RefCell<HashMap<String, File>> = RefCell::new(HashMap::new());
}

#[init]
fn init() {
    // Inicialização do canister
}

#[query]
fn whoami() -> Principal {
    ic_cdk::caller()
}

#[query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[update]
fn send_message(sender: String, message: String) {
    MESSAGES.with(|messages| {
        messages.borrow_mut().push((sender, message));
    });
}

#[query]
fn get_messages() -> Vec<Message> {
    MESSAGES.with(|messages| {
        messages.borrow().clone()
    })
}

#[update]
fn register_user(user_id: Principal, user_name: String) {
    USERS.with(|users| {
        users.borrow_mut().insert(user_id, user_name);
    });
}

#[update]
fn send_file(file_id: String, sender: Principal, recipient: Principal, content: Vec<u8>, metadata: String) {
    let file = File {
        id: file_id.clone(),
        owner: sender,
        recipient,
        content,
        metadata
    };

    FILES.with(|files| {
        files.borrow_mut().insert(file_id, file);
    });
}

#[query]
fn get_file(file_id: String) -> Option<Vec<u8>> {
    let caller = ic_cdk::caller();

    FILES.with(|files| {
        files.borrow().get(&file_id).and_then(|file| {
            if file.owner == caller || file.recipient == caller {
                Some(file.content.clone())
            } else {
                None
            }
        })
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use candid::Principal;

    #[test]
    fn test_register_user() {
        // Simula o chamador
        let user_id = Principal::anonymous();
        println!("user_id: {:?}", user_id);
        let user_name = "test_user".to_string();
        println!("user_name: {:?}", user_name);

        // Registra o usuário
        USERS.with(|users| {
            users.borrow_mut().insert(user_id.clone(), user_name.clone());
        });

        // Verifica se o usuário foi registrado corretamente
        USERS.with(|users| {
            let users = users.borrow();
            assert_eq!(users.get(&user_id), Some(&user_name));
        });
    }
}