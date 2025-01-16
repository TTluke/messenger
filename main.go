package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/TTLuke/messenger/database"
	"github.com/TTLuke/messenger/handlers"
	"github.com/TTLuke/messenger/ws"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
)

type dbConnection struct {
	DB *database.Queries
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbURL := os.Getenv("DB_URL")
	if dbURL == "" {
		log.Fatal("DB_URL is not found in the environment")
	}

	conn, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal("Error - failed to connect to DB")
	}

	hub := ws.NewHub()

	renderHandler := handlers.NewRenderHandler(database.New(conn))
	wsHandler := handlers.NewWSHandler(hub)
	go hub.Run()

	app := echo.New()
	app.Static("/static", "static")

	app.GET("/", renderHandler.HandleServeMain)
	app.GET("/open-modal", renderHandler.HandleServeModal)
	app.GET("/login", renderHandler.HandleServeLogin)
	app.GET("/register", renderHandler.HandleServeRegister)
	app.GET("/ws/join-room/:room-id", wsHandler.JoinRoom)
	app.GET("/ws/get-rooms", wsHandler.GetRooms)
	app.GET("/ws/get-clients/:room-id", wsHandler.GetClients)

	app.POST("/ws/create-room", wsHandler.CreateRoom)
	app.POST("/send", renderHandler.HandleServeMessage)

	app.DELETE("/delete", func(c echo.Context) error { return c.NoContent(http.StatusOK) })

	app.Start(":8080")
}
