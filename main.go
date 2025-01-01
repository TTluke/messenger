package main

import (
	"github.com/TTLuke/messenger/handlers"
	"github.com/labstack/echo/v4"
)

//go:generate npx tailwindcss build -i ./static/css/style.css -o ./static/css/tailwind.css

func main() {
	app := echo.New()
	app.Static("/static", "static")

	homeHandler := handler.HomeHandler{}
	messageHandler := handler.MessageHandler{}

	app.GET("/", homeHandler.HandleHomeShow)
	app.GET("/login", homeHandler.HandleLoginShow)
	app.POST("/send", messageHandler.HandleSendMessage)
	app.Start(":8080")
}
