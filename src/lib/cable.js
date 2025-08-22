import * as ActionCable from "@rails/actioncable";

let singletonConsumer = null;

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3NTU4NzkzOTJ9.QGgZhttrBGvb0WFqODRLk3kkAxnwhFygJTdHe0EtA0g';

export const getActionCableConsumer = () => {
  if (singletonConsumer) return singletonConsumer;

  // Adjust to wss:// in production if needed
  const WEBSOCKET_URL = "ws://10.0.8.130:3000/cable?token=" + token;
  singletonConsumer = ActionCable.createConsumer(WEBSOCKET_URL);
  return singletonConsumer;
}; 