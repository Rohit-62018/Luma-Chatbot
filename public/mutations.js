import { gql } from "@apollo/client";

const StartChat = gql`
  mutation StartChat($title: String!) {
    insert_chats_one(object: { title: $title }) {
      id
      title
      created_at
    }
  }
`;


// mutation StartChat($user_id: uuid) {
//   insert_chats_one(object: { user_id: $user_id }) {
//     id
//   }
// }

const MyChats = gql`
query MyChats {
  chats(order_by: { created_at: desc }) {
    id
    title
    created_at
  }
}`

const SendUserMessage = gql`
mutation SendUserMessage($chatId: uuid!, $content: String!) {
  insert_messages_one(object: { chat_id: $chatId, sender: "user", content: $content }) {
    id
    chat_id
    sender
    content
  }
}`

const SendMessage = gql`
mutation SendMessage($chat_id: uuid!, $message: String!) {
  sendMessage(chat_id: $chat_id, message: $message)
}`


const OnMessages = gql`
subscription OnMessages($chatId: uuid!) {
  messages(
    where: { chat_id: { _eq: $chatId } }
    order_by: { created_at: asc }
  ) {
    id
    sender
    content
  }
}`

const DeleteChat = gql`
mutation DeleteChat($chatId: uuid!) {
  delete_chats_by_pk(id: $chatId) {
    id
  }
}`


const RenameChat = gql`
mutation RenameChat($chatId: uuid!, $newTitle: String!) {
  update_chats_by_pk(pk_columns: { id: $chatId }, _set: { title: $newTitle }) {
    id
    title
    updated_at
  }
}

`

const GetMessages = gql`
  query GetMessages($chatId: uuid!) {
    messages(where: { chat_id: { _eq: $chatId } }, order_by: { created_at: asc }) {
      id
      content
      sender
      created_at
    }
  }
`;

export { MyChats, StartChat, SendMessage, SendUserMessage, OnMessages, GetMessages };

