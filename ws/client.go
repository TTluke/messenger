package ws

import (
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type Message struct {
	Username string
	Content  string
	RoomID   uuid.UUID
}

type Client struct {
	Conn     *websocket.Conn
	Message  chan *Message
	ID       uuid.UUID `json:"id"`
	RoomID   uuid.UUID `json:"roomId"`
	Username string    `json:"username"`
}
