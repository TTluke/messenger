package handlers

import (
	"fmt"
	"net/http"

	"github.com/TTLuke/messenger/ws"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

type WSHandler struct {
	Hub *ws.Hub
}

func NewWSHandler(h *ws.Hub) *WSHandler {
	return &WSHandler{
		Hub: h,
	}
}

type CreateRoomReq struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
}

func (h *WSHandler) CreateRoom(c echo.Context) error {
	fmt.Println("endpoint hit")
	var req CreateRoomReq
	if err := c.Bind(&req); err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}

	h.Hub.Rooms[req.ID] = &ws.Room{
		ID:      req.ID,
		Name:    req.Name,
		Clients: make(map[uuid.UUID]*ws.Client),
	}
	return c.JSON(http.StatusOK, req)
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (h *WSHandler) JoinRoom(c echo.Context) error {
	conn, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	// ws/join-room/:roomID?userID=uuid&username=username
	roomID, _ := uuid.Parse(c.Param("room-id"))
	userID, _ := uuid.Parse(c.QueryParam("userId"))
	userName := c.QueryParam("username")

	client := &ws.Client{
		Conn:     conn,
		Message:  make(chan *ws.Message, 10),
		ID:       userID,
		RoomID:   roomID,
		Username: userName,
	}
	// register client into room
	h.Hub.Register <- client

	go client.WriteMessage()
	client.ReadMessage(h.Hub)

	return c.NoContent(http.StatusOK)
}

type RoomRes struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
}

func (h *WSHandler) GetRooms(c echo.Context) error {
	rooms := make([]RoomRes, 0)
	for _, room := range h.Hub.Rooms {
		rooms = append(rooms, RoomRes{
			ID:   room.ID,
			Name: room.Name,
		})
	}
	return c.JSON(http.StatusOK, rooms)
}

type ClientRes struct {
	ID       uuid.UUID `json:"id"`
	Username string    `json:"username"`
}

func (h *WSHandler) GetClients(c echo.Context) error {
	var clients []ClientRes
	roomID, _ := uuid.Parse(c.Param("room-id"))

	if _, ok := h.Hub.Rooms[roomID]; !ok {
		clients = make([]ClientRes, 0)
		return c.JSON(http.StatusOK, clients)
	}
	for _, client := range h.Hub.Rooms[roomID].Clients {
		clients = append(clients, ClientRes{
			ID:       client.ID,
			Username: client.Username,
		})
	}
	fmt.Printf("%v", clients)
	return c.JSON(http.StatusOK, clients)
}
