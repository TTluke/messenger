package handler

import (
	"github.com/TTLuke/messenger/model"
	"github.com/a-h/templ"
	"github.com/labstack/echo/v4"
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
