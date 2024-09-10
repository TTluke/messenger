package handler

import (
	"github.com/TTLuke/messenger/model"
	"github.com/a-h/templ"
	"github.com/labstack/echo/v4"
)

func render(c echo.Context, component templ.Component) error {
	return component.Render(c.Request().Context(), c.Response())
}

func delete_contact(slice []model.Contact, index int) []model.Contact {
	return append(slice[:index], slice[index+1:]...)
}
