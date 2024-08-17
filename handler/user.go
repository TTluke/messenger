package handler

import (
	"github.com/TTLuke/messenger/model"
	"github.com/TTLuke/messenger/view/user"
	"github.com/labstack/echo/v4"
)

type UserHandler struct{}

func (h UserHandler) HandleUserShow(c echo.Context) error {
	u := model.User{
		Email: "test@test.com",
	}
	return render(c, user.Show(u))
}
