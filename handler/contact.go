package handler

import (
	"github.com/TTLuke/messenger/model"
	"github.com/TTLuke/messenger/view/components"
	"github.com/labstack/echo/v4"
)

type ContactHandler struct{}

func (h ContactHandler) HandleContactShow(c echo.Context) error {
	contact := model.Contact{Id: 1, FirstName: "test", LastName: "FOO"}
	return render(c, components.Contact(contact))
}
