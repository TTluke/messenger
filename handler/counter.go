package handler

import (
	"github.com/TTLuke/messenger/model"
	"github.com/TTLuke/messenger/view/components"
	"github.com/labstack/echo/v4"
)

type CounterHandler struct{}

var count model.Count

func (h CounterHandler) HandleCounterShow(c echo.Context) error {
	count.Count++
	return render(c, components.Counter(count.Count))
}
