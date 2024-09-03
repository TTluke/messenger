package main

import (
	"github.com/TTLuke/messenger/handler"
	"github.com/labstack/echo/v4"
)

func main() {
	app := echo.New()
	homeHandler := handler.HomeHandler{}
	countHandler := handler.CounterHandler{}
	contactHandler := handler.ContactHandler{}

	app.GET("/", homeHandler.HandleHomeShow)
	app.PUT("/add", countHandler.HandleCounterShow)
	app.POST("/contact", contactHandler.HandleContactShow)
	app.Start(":8080")
}
