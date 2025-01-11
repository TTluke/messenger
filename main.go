package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/TTLuke/messenger/database"
	handler "github.com/TTLuke/messenger/handlers"
	"github.com/labstack/echo/v4"
)

type dbConnection struct {
	DB *database.Queries
}

func main() {
	dbURL := os.Getenv("DB_URL")
	if dbURL == "" {
		log.Fatal("DB_URL is not found in the environment")
	}

	conn, err := sql.Open("postgres", dbURL)

	app := echo.New()
	app.Static("/static", "static")

	homeHandler := handler.HomeHandler{}
	messageHandler := handler.MessageHandler{}

	app.GET("/", homeHandler.HandleHomeShow)
	app.GET("/open-modal", homeHandler.HandleModalShow)
	app.GET("/login", homeHandler.HandleLoginShow)
	app.DELETE("/delete", func(c echo.Context) error { return c.NoContent(http.StatusOK) })
	app.GET("/register", homeHandler.HandleRegisterShow)
	app.POST("/send", messageHandler.HandleSendMessage)

	app.Start(":8080")
}
