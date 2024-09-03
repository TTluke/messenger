package handler

import (
	"fmt"
	"strconv"

	"github.com/TTLuke/messenger/model"
	"github.com/TTLuke/messenger/view/components"
	"github.com/labstack/echo/v4"
)

type ContactHandler struct{}

func (h ContactHandler) HandleContactShow(c echo.Context) error {
	Id, _ := strconv.Atoi(c.FormValue("id"))
	Fname := c.FormValue("fname")
	Lname := c.FormValue("lname")
	contact := model.Contact{Id: Id, FirstName: Fname, LastName: Lname}
	fmt.Printf("%d, %s, %s", Id, Fname, Lname)
	return render(c, components.Contact(contact))
}
