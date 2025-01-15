package handlers

import (
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
	conn, err := upgrader.Upgrade(c.Response().Writer, c.Request(), nil)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	// ws/join-room/:roomID?userID=uuid&userName=username
	roomID, _ := uuid.Parse(c.Param("roomID"))
	userID, _ := uuid.Parse(c.Param("userID"))
	userName := c.QueryParam("userName")

	client := &ws.Client{
		Conn:     conn,
		Message:  make(chan *ws.Message, 10),
		ID:       userID,
		RoomID:   roomID,
		Username: userName,
	}

	// register client into room
	h.Hub.Register
}
