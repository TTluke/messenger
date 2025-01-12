package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/TTLuke/messenger/database"
	"github.com/TTLuke/messenger/handlers"
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

	dbConn := dbConnection{
		DB: database.New(conn),
	}

	app := echo.New()
	app.Static("/static", "static")

	homeHandler := handlers.HomeHandler{}
	messageHandler := handlers.MessageHandler{}
	dbHandler := handlers.DbHandler{}

	app.GET("/", homeHandler.handleHomeShow)
	app.GET("/open-modal", homeHandler.HandleModalShow)
	app.GET("/login", homeHandler.HandleLoginShow)
	app.DELETE("/delete", func(c echo.Context) error { return c.NoContent(http.StatusOK) })
	app.GET("/register", homeHandler.HandleRegisterShow)
	app.POST("/send", messageHandler.HandleSendMessage)
	app.POST("/test", dbHandler.TestDbConn)

	app.Start(":8080")
}
