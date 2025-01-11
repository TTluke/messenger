package main

import (
	"net/http"

	"github.com/TTLuke/messenger/handlers"
	"github.com/labstack/echo/v4"
)

func main() {
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
