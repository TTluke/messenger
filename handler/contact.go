package handler

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/TTLuke/messenger/model"
	"github.com/TTLuke/messenger/view/components"
	"github.com/labstack/echo/v4"
)

type ContactHandler struct{}

var contacts []model.Contact

func (h ContactHandler) HandleAddContact(c echo.Context) error {
	Id, err := strconv.Atoi(c.FormValue("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "ID must be integer")
	}
	Fname := c.FormValue("fname")
	Lname := c.FormValue("lname")
	contact := model.Contact{Id: Id, FirstName: Fname, LastName: Lname}

	contacts = append(contacts, contact)

	for _, x := range contacts {
		fmt.Printf("%d, %s, %s\n", x.Id, x.FirstName, x.LastName)
	}

	return render(c, components.Contact(contacts))
}

func (h ContactHandler) HandleDeleteContact(c echo.Context) error {
	delete_contact(contacts, 0)
	return nil
}
