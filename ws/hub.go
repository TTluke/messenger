package ws

import "github.com/google/uuid"

type Room struct {
	ID      uuid.UUID             `json:"id"`
	Name    string                `json:"name"`
	Clients map[uuid.UUID]*Client `json:"clients"`
}

type Hub struct {
	Rooms      map[uuid.UUID]*Room
	Register   chan *Client
	Unregister chan *Client
	Broadcast  chan *Message
}

func NewHub() *Hub {
	return &Hub{
		Rooms:      make(map[uuid.UUID]*Room),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Broadcast:  make(chan *Message, 5),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.Register:
			if _, ok := h.Rooms[client.RoomID]; ok {
				room := h.Rooms[client.RoomID]
				if _, ok := room.Clients[client.ID]; !ok {
					room.Clients[client.ID] = client
				}
			}
		case client := <-h.Unregister:
			if _, ok := h.Rooms[client.RoomID]; ok {
				if _, ok := h.Rooms[client.RoomID].Clients[client.ID]; ok {
					if len(h.Rooms[client.RoomID].Clients) != 0 {
						h.Broadcast <- &Message{
							Content:  "user left",
							RoomID:   client.RoomID,
							Username: client.Username,
						}
					}
					delete(h.Rooms[client.RoomID].Clients, client.ID)
					close(client.Message)
				}
			}
		case message := <-h.Broadcast:
			if _, ok := h.Rooms[message.RoomID]; ok {
				for _, client := range h.Rooms[message.RoomID].Clients {
					client.Message <- message
				}
			}
		}
	}
}
