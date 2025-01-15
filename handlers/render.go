package handlers

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/TTLuke/messenger/components"
	"github.com/TTLuke/messenger/database"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type RenderHandler struct {
	DB *database.Queries
}

func NewRenderHandler(db *database.Queries) *RenderHandler {
	return &RenderHandler{
		DB: db,
	}
}

func (h *RenderHandler) HandleServeMain(c echo.Context) error {
	return render(c, components.Layout(components.Main()))
}

func (h *RenderHandler) HandleServeModal(c echo.Context) error {
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

func (h *RenderHandler) HandleServeLogin(c echo.Context) error {
	return render(c, components.Layout(components.Login()))
}

func (h *RenderHandler) HandleServeRegister(c echo.Context) error {
	return render(c, components.Layout(components.Register()))
}

func (h *RenderHandler) HandleServeMessage(c echo.Context) error {
	message := c.FormValue("input-area")
	return render(c, components.UserMesage(message))
}

func (h *RenderHandler) TestDB(c echo.Context) error {
	user, err := h.DB.CreateUser(c.Request().Context(), database.CreateUserParams{
		ID:        uuid.New(),
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
		Name:      "test",
	})
	if err != nil {
		log.Fatalf("Could not create user: %v", err)
	}

	fmt.Printf("User: %v", user)
	return c.NoContent(http.StatusOK)
}
