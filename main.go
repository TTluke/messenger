package main

import (
	"github.com/TTLuke/messenger/handler"
	"github.com/labstack/echo/v4"
)

//go:generate npx tailwindcss build -i ../view/style/style.css -o ../view/style/output.css -m

func main() {
	app := echo.New()
	homeHandler := handler.HomeHandler{}
	contactHandler := handler.ContactHandler{}
	loginHandler := handler.LoginHandler{}

	app.GET("/", homeHandler.HandleHomeShow)
	// app.GET("/", loginHandler.HandleShowLogin)
	app.POST("/login", loginHandler.HandleLogin)
	app.POST("/contact", contactHandler.HandleAddContact)
	app.DELETE("/delete/:id", contactHandler.HandleDeleteContact)
	app.Start(":8080")

}
