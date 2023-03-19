package model

import "github.com/jinzhu/gorm"

type User struct {
	gorm.Model
	Name  string `json:"name"`
	Des   string `json:"des"`
	Email string `json:"email"`
}
