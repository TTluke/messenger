package handler

import (
	"github.com/TTLuke/messenger/components"
	"github.com/labstack/echo/v4"
)

type MessageHandler struct{}

func (h MessageHandler) HandleSendMessage(c echo.Context) error {
	//user := model.Contact{Id: 1, FirstName: "Bar", LastName: "Foo"}
	return render(c, components.UserMesage(""))
}
