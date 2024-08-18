package main

import (
	"github.com/TTLuke/messenger/handler"
	"github.com/labstack/echo/v4"
)

func main() {
	app := echo.New()
	homeHandler := handler.HomeHandler{}
	app.GET("/", homeHandler.HandleHomeShow)
	app.Start(":8080")
}
