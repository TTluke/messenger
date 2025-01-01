package handler

import (
	"github.com/TTLuke/messenger/components"
	"github.com/labstack/echo/v4"
)

type HomeHandler struct{}

func (h HomeHandler) HandleHomeShow(c echo.Context) error {
	//user := model.Contact{Id: 1, FirstName: "Bar", LastName: "Foo"}
	return render(c, components.Layout(components.Index(components.Main())))
}

func (h HomeHandler) HandleLoginShow(c echo.Context) error {
	return render(c, components.Layout(components.Index(components.Login())))
}
