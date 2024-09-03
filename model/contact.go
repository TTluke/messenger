package model

type Contact struct {
	Id        int    `form:"id" query:"id"`
	FirstName string `form:"fname"`
	LastName  string `form:"lname"`
}
