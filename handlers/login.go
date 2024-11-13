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
	return render(c, layout.Login(true))
}

func (h LoginHandler) HandleLogin(c echo.Context) error {
	user := ParseData(c)
	userInDB := checkUserInDB(db, user.Name)
	fmt.Printf("Name: %v, New: %v\n", user.Name, userInDB)
	if userInDB == true {
		addUserToDB(db, user.Name, user.Email, user.Password)
	}
	return render(c, layout.Login(userInDB))
}

func newUser(name, email, password string) model.User {
	return model.User{Name: name, Email: email, Password: password}
}

func ParseData(c echo.Context) model.User {
	name := c.FormValue("name")
	email := c.FormValue("email")
	password := c.FormValue("password")
	return newUser(name, email, password)
}
