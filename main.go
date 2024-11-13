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

	app.GET("/", homeHandler.HandleHomeShow)
	app.Start(":8080")

}
