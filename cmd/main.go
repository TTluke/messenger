package main

import (
	"github.com/TTLuke/messenger/handler"
	"github.com/labstack/echo/v4"
)

func main() {
	app := echo.New()
	//homeHandler := handler.HomeHandler{}
	countHandler := handler.CounterHandler{}
	contactHandler := handler.ContactHandler{}
	loginHandler := handler.LoginHandler{}

	//app.GET("/", homeHandler.HandleHomeShow)
	app.GET("/", loginHandler.HandleShowLogin)
	app.POST("/login", loginHandler.HandleLogin)
	app.PUT("/add", countHandler.HandleCounterShow)
	app.POST("/contact", contactHandler.HandleAddContact)
	app.DELETE("/delete/:id", contactHandler.HandleDeleteContact)
	app.Start(":8080")

}
