package handler

import (
	"github.com/TTLuke/messenger/components"
	"github.com/labstack/echo/v4"
)

type HomeHandler struct{}

func (h HomeHandler) HandleHomeShow(c echo.Context) error {
	return render(c, components.Layout(components.Main()))
}

func (h HomeHandler) HandleSettingsShow(c echo.Context) error {
	return render(c, components.SettingsModal())
}

func (h HomeHandler) HandleLoginShow(c echo.Context) error {
	return render(c, components.Layout(components.Login()))
}

func (h HomeHandler) HandleRegisterShow(c echo.Context) error {
	return render(c, components.Layout(components.Register()))
}
