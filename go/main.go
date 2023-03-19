package main

import (
	"fmt"

	"github.com/agbad/ecm-g/controller"
	"github.com/agbad/ecm-g/database"
	"github.com/agbad/ecm-g/model"
	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func ping(c *fiber.Ctx) {
	resp := fiber.Map{
		"status":  "success",
		"message": "Connected!",
	}
	c.Status(200).JSON(resp)
}

func initDB() {
	var error error
	database.DBConn, error = gorm.Open("sqlite3", "ecom.db")
	if error != nil {
		panic("Failed to connect to database")
	}
	fmt.Println("Database connected successfully!")

	database.DBConn.AutoMigrate(&model.Product{}, &model.Merchant{},
		&model.User{})
	fmt.Println("Database Migrations successful.")
}

func setRoutes(app *fiber.App) {
	// Ping
	app.Get("/", ping)

	// Auth

	// Product
	app.Delete("/product/:id", controller.DeleteProduct)
	app.Get("/product/:id", controller.GetProduct)
	app.Post("/product", controller.CreateProduct)
	app.Get("/products", controller.GetAllProducts)
	app.Patch("/product/:id", controller.UpdateProduct)

}

func main() {
	app := fiber.New()

	initDB()
	defer database.DBConn.Close()

	setRoutes(app)
	app.Listen(3000)
}
