package main

import (
	"database/sql"
	"github.com/TTLuke/messenger/handler"
	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
)

func main() {
	// Connect to the PostgreSQL database
	connStr := "user=normal dbname=LinkUp password=2006 sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	app := echo.New()
	//homeHandler := handler.HomeHandler{}
	countHandler := handler.CounterHandler{}
	contactHandler := handler.ContactHandler{}
	loginHandler := handler.LoginHandler{}

	//app.GET("/", homeHandler.HandleHomeShow)
	app.GET("/", loginHandler.HandleShowLogin)
	app.PUT("/add", countHandler.HandleCounterShow)
	app.POST("/contact", contactHandler.HandleAddContact)
	app.DELETE("/delete/:id", contactHandler.HandleDeleteContact)
	app.Start(":8080")

}
