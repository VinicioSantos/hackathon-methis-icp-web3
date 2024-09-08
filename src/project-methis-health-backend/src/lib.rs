use ic_cdk_macros::{init, query, update};
use std::cell::RefCell;

type Message = (String, String); // (sender, recipient, message)
thread_local! {
    static MESSAGES: RefCell<Vec<Message>> = RefCell::new(Vec::new());
}

#[init]
fn init() {
    // Inicialização do canister
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