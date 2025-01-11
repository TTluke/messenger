package handler

import (
	"fmt"
	"net/http"

	"github.com/TTLuke/messenger/components"
	"github.com/labstack/echo/v4"
)

type HomeHandler struct{}

func (h HomeHandler) HandleHomeShow(c echo.Context) error {
	return render(c, components.Layout(components.Main()))
}

func (h HomeHandler) HandleModalShow(c echo.Context) error {
	content := c.QueryParam("content")
	fmt.Printf("%v", content)

	if content == "settings" {
		return render(c, components.Modal(components.SettingsContent()))
	}
	if content == "contacts" {
		return render(c, components.Modal(components.ContactsContent()))
	}
	return c.NoContent(http.StatusBadRequest)
}

func (h HomeHandler) HandleLoginShow(c echo.Context) error {
	return render(c, components.Layout(components.Login()))
}

func (h HomeHandler) HandleRegisterShow(c echo.Context) error {
	return render(c, components.Layout(components.Register()))
}
