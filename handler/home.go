package handler

import (
	"github.com/TTLuke/messenger/model"
	"github.com/TTLuke/messenger/view/layout"
	"github.com/labstack/echo/v4"
)

type HomeHandler struct{}

var count model.Count

func (h HomeHandler) HandleHomeShow(c echo.Context) error {
	count.Count++
	user := model.Contact{Id: 1, FirstName: "Bar", LastName: "Foo"}
	return render(c, layout.Base(count.Count, user))
}
