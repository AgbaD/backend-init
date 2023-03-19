package model

import "github.com/jinzhu/gorm"

type Product struct {
	gorm.Model
	Name  string `json:"name" validate:"required"`
	Des   string `json:"des" validate:"required"`
	Price string `json:"price" validate:"required"`
}
