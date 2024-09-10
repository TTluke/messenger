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

func NewContact(Id int, FName, LName string) model.Contact {
	return model.Contact{Id: Id, FirstName: FName, LastName: LName}
}

func (h ContactHandler) HandleAddContact(c echo.Context) error {
	Id, err := strconv.Atoi(c.FormValue("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "ID must be integer")
	}
	FName := c.FormValue("fname")
	LName := c.FormValue("lname")
	contacts = append(contacts, NewContact(Id, FName, LName))

	fmt.Printf("Contacts: %d\n", len(contacts))

	return render(c, components.Contact(contacts))
}

func (h ContactHandler) HandleDeleteContact(c echo.Context) error {
	Id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Bad ID")
	}
	contacts = delete_contact(contacts, Id)
	fmt.Printf("Deleted %d, contacts=%d\n", Id, len(contacts))
	return nil
}
