package handler

import (
	"github.com/TTLuke/messenger/components"
	"github.com/labstack/echo/v4"
)

type MessageHandler struct{}

func (h MessageHandler) HandleSendMessage(c echo.Context) error {
	// message := c.FormValue("input-area")

	return render(c, components.UserMesage(";akldjf;lkasdjf;laksjdf;lkajdf;lkadjf;alkdjfa;slkdjfasd;lkfj"))
}
