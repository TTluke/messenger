package main

import (
	"github.com/TTLuke/messenger/handler"
	"github.com/labstack/echo/v4"
)

func main() {
	// test
	app := echo.New()
	homeHandler := handler.HomeHandler{}
	countHandler := handler.CounterHandler{}
	app.GET("/", homeHandler.HandleHomeShow)
	app.PUT("/add", countHandler.HandleCounterShow)
	app.Start(":8080")
}
