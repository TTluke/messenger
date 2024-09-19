package handler

import (
	"fmt"

	"github.com/TTLuke/messenger/model"
	"github.com/TTLuke/messenger/view/layout"
	"github.com/labstack/echo/v4"
)

type LoginHandler struct{}

func (h LoginHandler) HandleShowLogin(c echo.Context) error {
	user := GetLoginDetail(c)
	fmt.Printf("%s\n%s", user.Email, user.Password)
	return render(c, layout.Login())
}

func newUser(email, password string) model.User {
	db := openDbConn()
	defer db.Close()

	_, err := db.Exec("INSERT INTO users (name, mail, password) VALUES ($1, $2, $3)", "prod", email, password)
	if err != nil {
		fmt.Println("BAD EXEC")
		panic(err)
	}
	return model.User{Email: email, Password: password}
}

func GetLoginDetail(c echo.Context) model.User {
	// Perform a sample query
	db := openDbConn()
	defer db.Close()

	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	// Iterate through the results
	for rows.Next() {
		var id int
		var name string
		var email string
		var password string
		if err := rows.Scan(&id, &name, &email, &password); err != nil {
			panic(err)
		}
		fmt.Printf("ID: %d, Name: %s\n", id, name)
	}

	email := c.FormValue("email")
	password := c.FormValue("password")
	return newUser(email, password)
}
