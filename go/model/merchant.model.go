package model

import "github.com/jinzhu/gorm"

type Merchant struct {
	gorm.Model
	Name      string `json:"name"`
	Email     string `json:"email"`
	Storename string `json:"storeName"`
	Password  string `json:"password"`
}
