package main

import (
	// "database/sql"
	"log"
	"net/http"
	// "net/http"
	// "os"

	"github.com/TTLuke/messenger/database"
	"github.com/TTLuke/messenger/handlers"
	"github.com/TTLuke/messenger/ws"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
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

	//TODO: Database access

	// dbURL := os.Getenv("DB_URL")
	// if dbURL == "" {
	// 	log.Fatal("DB_URL is not found in the environment")
	// }
	// conn, err := sql.Open("postgres", dbURL)
	// if err != nil {
	// 	log.Fatal("Error - failed to connect to DB")
	// }

	hub := ws.NewHub()

	wsHandler := handlers.NewWSHandler(hub)
	go hub.Run()

	app := echo.New()
	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowCredentials: true,
	}))
	// CORS middleware configuration
	app.Static("/static", "static")

	app.GET("/ws/join-room/:room-id", wsHandler.JoinRoom)
	app.GET("/ws/get-rooms", wsHandler.GetRooms)
	app.GET("/ws/get-clients/:room-id", wsHandler.GetClients)

	app.POST("/ws/create-room", wsHandler.CreateRoom)

	app.Start(":8080")
}
