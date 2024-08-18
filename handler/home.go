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
	return render(c, layout.Base(count.Count))
}
