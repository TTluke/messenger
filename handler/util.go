package handler

import (
	"database/sql"

	"github.com/TTLuke/messenger/model"
	"github.com/a-h/templ"
	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
)

func render(c echo.Context, component templ.Component) error {
	return component.Render(c.Request().Context(), c.Response())
}

func delete_contact(slice []model.Contact, Id int) []model.Contact {
	for ind, Contact := range slice {
		if Contact.Id == Id {
			return append(slice[:ind], slice[ind+1:]...)
		}
	}
	return nil
}

func openDBConn() *sql.DB {
	// Connect to the PostgreSQL database
	connStr := "user=normal dbname=LinkUp password=2006 sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	return db
}

func addUserToDB(db *sql.DB, name, email, password string) {
	_, err := db.Exec("INSERT INTO users (name, mail, password) VALUES ($1, $2, $3)", name, email, password)
	if err != nil {
		panic(err)
	}
}

func checkUserInDB(db *sql.DB, name string) bool {
	err := db.QueryRow("SELECT name FROM users WHERE name=$1", name).Scan(&name)
	if err != nil {
		return true
	}
	return false
}
