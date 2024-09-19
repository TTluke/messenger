package handler

import (
	"fmt"

	"github.com/TTLuke/messenger/model"
	"github.com/TTLuke/messenger/view/layout"
	"github.com/labstack/echo/v4"
)

type LoginHandler struct{}

var db = openDBConn()

func (h LoginHandler) HandleShowLogin(c echo.Context) error {
	return render(c, layout.Login())
}

func (h LoginHandler) HandleLogin(c echo.Context) error {
	ParseData(c)
	PrintData()
	return render(c, layout.Login())
}

func newUser(name, email, password string) {
	addUserToDB(db, name, email, password)
}

func ParseData(c echo.Context) {
	name := c.FormValue("name")
	email := c.FormValue("email")
	password := c.FormValue("password")
	newUser(name, email, password)
}

func PrintData() {
	defer db.Close()
	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	// Iterate through the results
	user := model.User{}
	for rows.Next() {
		if err := rows.Scan(&user.Id, &user.Name, &user.Email, &user.Password); err != nil {
			panic(err)
		}
		fmt.Printf("ID: %d, Name: %s, Email: %s, Password: %s\n", user.Id, user.Name, user.Email, user.Password)
	}
}
